import type { NextApiRequest, NextApiResponse } from 'next';

const GET_PAGE_BY_SLUG_QUERY = `
  query GetPageBySlug($slug: String!) {
    pages(first: 1, where: { name: $slug }) {
      nodes {
        id
        title
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
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

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(`${wpUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_PAGE_BY_SLUG_QUERY,
        variables: {
          slug: slug,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL error');
    }

    if (!result.data?.pages?.nodes?.[0]) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');

    res.status(200).json({
      page: result.data.pages.nodes[0],
    });
  } catch (error) {
    console.error('Error fetching page:', error);

    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch page',
    });
  }
}
