import type { NextApiRequest, NextApiResponse } from 'next';

const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:10013';
    
    const response = await fetch(`${wpUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_POST_BY_SLUG_QUERY,
        variables: { slug },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL error');
    }

    if (!result.data.post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch post' 
    });
  }
}
