import type { NextApiRequest, NextApiResponse } from 'next';

const GET_FOOTER_MENU_QUERY = `
  query GetFooterMenu {
    menus {
      nodes {
        id
        name
        locations
        menuItems {
          nodes {
            id
            label
            url
            path
            parentId
            childItems {
              nodes {
                id
                label
                url
                path
                parentId
              }
            }
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

  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:10013';

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${wpUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_FOOTER_MENU_QUERY,
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

    // Find the menu assigned to FOOTER_BOTTOM location
    const footerMenu = result.data?.menus?.nodes?.find(
      (menu: any) => menu.locations && menu.locations.includes('FOOTER_BOTTOM')
    );
    
    if (footerMenu) {
      console.log(`Found footer menu: ${footerMenu.name}`);
      res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');
      return res.status(200).json({
        menu: {
          id: footerMenu.id,
          name: footerMenu.name,
          menuItems: footerMenu.menuItems
        }
      });
    }

    // If no footer menu found, return empty structure
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');
    return res.status(200).json({
      menu: {
        id: null,
        name: 'Footer Menu',
        menuItems: {
          nodes: []
        }
      }
    });
  } catch (error) {
    console.error('Error fetching footer menu:', error);

    // Return empty menu structure on error
    res.status(200).json({
      menu: {
        id: null,
        name: 'Footer Menu',
        menuItems: {
          nodes: []
        }
      }
    });
  }
}
