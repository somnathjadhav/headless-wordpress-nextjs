import type { NextApiRequest, NextApiResponse } from 'next';

// Cache for homepage posts
let postsCache: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const GET_HOMEPAGE_POSTS_QUERY = `
  query GetHomepagePosts {
    posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
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
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check cache first
  const now = Date.now();
  if (postsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return res.status(200).json(postsCache);
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
        query: GET_HOMEPAGE_POSTS_QUERY,
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

    // Update cache
    postsCache = result.data;
    cacheTimestamp = now;

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');
    
    res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching homepage posts:', error);
    
    // Return cached data if available, even if stale
    if (postsCache) {
      res.setHeader('Cache-Control', 'public, s-maxage=300');
      return res.status(200).json(postsCache);
    }
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
      posts: { nodes: [] }
    });
  }
}
