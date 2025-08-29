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

interface WordPressMenuProps {
  className?: string;
  onItemClick?: () => void;
}

export default function WordPressMenu({ className = '', onItemClick }: WordPressMenuProps) {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('/api/menu', {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setMenuData(result);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.childItems && item.childItems.nodes.length > 0;
    const isMobile = className.includes('flex-col');
    
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
      <li key={item.id} className={isMobile ? '' : 'relative group'}>
        <Link
          href={path}
          className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base ${
            isMobile 
              ? 'block font-medium' 
              : 'px-3 py-2 rounded-md font-medium'
          }`}
          onClick={onItemClick}
        >
          {item.label}
        </Link>
        
        {hasChildren && !isMobile && (
          <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200 dark:border-gray-700">
            {item.childItems!.nodes.map((childItem) => (
              <li key={childItem.id}>
                <Link
                  href={getPath(childItem.url)}
                  className="block px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={onItemClick}
                >
                  {childItem.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
        
        {hasChildren && isMobile && (
          <ul className="ml-4 mt-2 space-y-2">
            {item.childItems!.nodes.map((childItem) => (
              <li key={childItem.id}>
                <Link
                  href={getPath(childItem.url)}
                  className="block text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={onItemClick}
                >
                  {childItem.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  if (loading) {
    return (
      <nav className={className}>
        <ul className={className.includes('flex-col') ? 'space-y-4' : 'flex space-x-8'}>
          <li className="text-gray-400 dark:text-gray-500">Loading menu...</li>
        </ul>
      </nav>
    );
  }

  if (error || !menuData?.menu?.menuItems?.nodes) {
    return (
      <nav className={className}>
        <ul className={className.includes('flex-col') ? 'space-y-4' : 'flex space-x-8'}>
          <li>
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base">
              Home
            </Link>
          </li>
          <li>
            <Link href="/news" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base">
              News
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className={className}>
      <ul className={className.includes('flex-col') ? 'space-y-4' : 'flex space-x-8'}>
        {menuData.menu.menuItems.nodes.map(renderMenuItem)}
      </ul>
    </nav>
  );
}
