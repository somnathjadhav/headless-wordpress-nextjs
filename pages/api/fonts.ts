import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:10013';
    
    // Try multiple approaches to get font information
    
    // 1. Try to get theme mods through REST API
    let fontInfo = null;
    
    try {
      const themeModsResponse = await fetch(`${wpUrl}/wp-json/wp/v2/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (themeModsResponse.ok) {
        const settings = await themeModsResponse.json();
        fontInfo = settings;
      }
    } catch (error) {
      console.log('Could not fetch theme settings:', error);
    }
    
    // 2. Try to get customizer data
    if (!fontInfo) {
      try {
        const customizerResponse = await fetch(`${wpUrl}/wp-json/wp/v2/global-styles/themes/generatepress_child`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (customizerResponse.ok) {
          const customizerData = await customizerResponse.json();
          fontInfo = customizerData;
        }
      } catch (error) {
        console.log('Could not fetch customizer data:', error);
      }
    }
    
    // 3. Try to get theme options
    if (!fontInfo) {
      try {
        const themeResponse = await fetch(`${wpUrl}/wp-json/wp/v2/themes/generatepress_child`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (themeResponse.ok) {
          const themeData = await themeResponse.json();
          fontInfo = themeData;
        }
      } catch (error) {
        console.log('Could not fetch theme data:', error);
      }
    }
    
    // 4. Try GraphQL approach
    if (!fontInfo) {
      try {
        const graphqlResponse = await fetch(`${wpUrl}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query GetThemeInfo {
                themes {
                  nodes {
                    name
                    description
                    author
                    themeUri
                    version
                  }
                }
                generalSettings {
                  title
                  description
                  url
                }
              }
            `,
          }),
        });
        
        if (graphqlResponse.ok) {
          const graphqlData = await graphqlResponse.json();
          fontInfo = graphqlData;
        }
      } catch (error) {
        console.log('Could not fetch GraphQL data:', error);
      }
    }
    
    if (fontInfo) {
      res.status(200).json({ 
        success: true, 
        fontInfo,
        message: 'Font information retrieved successfully'
      });
    } else {
      res.status(200).json({ 
        success: false, 
        message: 'Could not retrieve font information from WordPress customizer',
        note: 'Font settings in WordPress customizer are typically not exposed through public APIs for security reasons. You may need to manually configure fonts in your Next.js application.'
      });
    }
    
  } catch (error) {
    console.error('Error fetching font information:', error);
    res.status(500).json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch font information',
      message: 'Font settings in WordPress customizer are typically not exposed through public APIs. You may need to manually configure fonts in your Next.js application.'
    });
  }
}
