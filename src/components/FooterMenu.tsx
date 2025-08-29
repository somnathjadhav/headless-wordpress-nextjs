import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  childItems?: {
    nodes: MenuItem[];
  };
}

interface MenuData {
  menu: {
    id: string;
    name: string;
    menuItems: {
      nodes: MenuItem[];
    };
  };
}

interface FooterMenuProps {
  className?: string;
}

export default function FooterMenu({ className = '' }: FooterMenuProps) {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterMenu = async () => {
      try {
        setLoading(true);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('/api/footer-menu', {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setMenuData(result);
      } catch (err) {
        console.error('Error fetching footer menu:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch menu');
      } finally {
        setLoading(false);
      }
    };

    fetchFooterMenu();
  }, []);

  const renderMenuItem = (item: MenuItem) => {
    // Convert WordPress URL to Next.js path
    const getPath = (url: string) => {
      if (!url) return '/';
      
      try {
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        
        // Handle WordPress URLs and convert to Next.js paths
        if (path === '' || path === '/') {
          return '/';
        }
        
        // Remove trailing slash for consistency
        return path.endsWith('/') ? path.slice(0, -1) : path;
      } catch {
        return '/';
      }
    };

    const path = getPath(item.url);

    return (
      <li key={item.id} className="mb-2">
        <Link
          href={path}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          {item.label}
        </Link>
      </li>
    );
  };

  if (loading) {
    return (
      <div className={className}>
        <h3 className="text-white font-semibold mb-4">Footer Links</h3>
        <ul className="space-y-2">
          <li className="text-gray-400 text-sm">Loading...</li>
        </ul>
      </div>
    );
  }

  if (error || !menuData?.menu?.menuItems?.nodes) {
    return (
      <div className={className}>
        <h3 className="text-white font-semibold mb-4">Footer Links</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors text-sm">
              Sitemap
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="text-white font-semibold mb-4">{menuData.menu.name}</h3>
      <ul className="space-y-2">
        {menuData.menu.menuItems.nodes.map(renderMenuItem)}
      </ul>
    </div>
  );
}
