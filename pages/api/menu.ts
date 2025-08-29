import type { NextApiRequest, NextApiResponse } from 'next';

const GET_PRIMARY_MENU_QUERY = `
  query GetPrimaryMenu {
    menu(id: "primary", idType: NAME) {
      id
      name
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
`;

const GET_MENUS_QUERY = `
  query GetMenus {
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

const GET_MENU_LOCATIONS_QUERY = `
  query GetMenuLocations {
    menuLocations {
      nodes {
        id
        name
        menu {
          id
          name
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

    // First try to get the primary menu
    let response = await fetch(`${wpUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_PRIMARY_MENU_QUERY,
      }),
      signal: controller.signal,
    });

    let result = await response.json();

    // If primary menu doesn't exist, try to get all menus and find the one assigned to PRIMARY location
    if (result.errors || !result.data?.menu) {
      console.log('Primary menu not found, searching for menus with PRIMARY location...');
      
      response = await fetch(`${wpUrl}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_MENUS_QUERY,
        }),
        signal: controller.signal,
      });

      result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL error');
      }

      // Find the menu assigned to PRIMARY location
      const primaryMenu = result.data?.menus?.nodes?.find(
        (menu: any) => menu.locations && menu.locations.includes('PRIMARY')
      );
      
      if (primaryMenu) {
        console.log(`Found primary menu: ${primaryMenu.name}`);
        res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');
        return res.status(200).json({
          menu: {
            id: primaryMenu.id,
            name: primaryMenu.name,
            menuItems: primaryMenu.menuItems
          }
        });
      }

      // If no primary menu found, use the first available menu as fallback
      const firstMenu = result.data?.menus?.nodes?.[0];
      if (firstMenu) {
        console.log(`Using fallback menu: ${firstMenu.name}`);
        res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');
        return res.status(200).json({
          menu: {
            id: firstMenu.id,
            name: firstMenu.name,
            menuItems: firstMenu.menuItems
          }
        });
      }
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL error');
    }

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');

    res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching primary menu:', error);

    // Return empty menu structure on error
    res.status(200).json({
      menu: {
        id: null,
        name: 'Primary Menu',
        menuItems: {
          nodes: []
        }
      }
    });
  }
}
