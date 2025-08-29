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
    
    // Try to get site icon from WordPress REST API
    const response = await fetch(`${wpUrl}/wp-json/wp/v2/media?search=favicon&per_page=5`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const media = await response.json();
    
    // Look for favicon or site icon
    let faviconUrl = '/favicon.ico';
    
    if (media && media.length > 0) {
      const favicon = media.find((item: any) => 
        item.title?.rendered?.toLowerCase().includes('favicon') ||
        item.title?.rendered?.toLowerCase().includes('site') ||
        item.title?.rendered?.toLowerCase().includes('icon')
      );
      
      if (favicon && favicon.source_url) {
        faviconUrl = favicon.source_url;
      }
    }
    
    // Fallback: try to get the first logo-like image
    if (faviconUrl === '/favicon.ico') {
      try {
        const logoResponse = await fetch(`${wpUrl}/wp-json/wp/v2/media?search=logo&per_page=3`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (logoResponse.ok) {
          const logos = await logoResponse.json();
          if (logos && logos.length > 0 && logos[0].source_url) {
            faviconUrl = logos[0].source_url;
          }
        }
      } catch (logoError) {
        console.log('Could not fetch logo as fallback:', logoError);
      }
    }
    
    res.status(200).json({ faviconUrl });
  } catch (error) {
    console.error('Error fetching favicon:', error);
    // Return default favicon on error
    res.status(200).json({ faviconUrl: '/favicon.ico' });
  }
}
