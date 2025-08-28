import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  target: string;
  classes: string[];
  menu_item_parent: string;
  order: number;
  children?: MenuItem[];
}

interface MenuData {
  items: MenuItem[];
  menu_id: number;
  menu_name: string;
}

interface WordPressMenuProps {
  className?: string;
  isMobile?: boolean;
}

// Direct API call function
async function fetchPrimaryMenu(): Promise<MenuData> {
  try {
    const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:10013';
    const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/primary-menu`, {
      signal: AbortSignal.timeout(1000)
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    // Use default menu items if fetch fails
  }

  // Return default menu items if fetch fails
  return {
    items: [
      {
        id: 1,
        title: 'Home',
        url: '/',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 1,
      },
      {
        id: 2,
        title: 'Company',
        url: '/company',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 2,
      },
      {
        id: 3,
        title: 'Services',
        url: '/services',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 3,
        children: [
          {
            id: 4,
            title: 'Corporate Finance',
            url: '/services#corporate-finance',
            target: '',
            classes: [],
            menu_item_parent: '3',
            order: 1,
          },
          {
            id: 5,
            title: 'Financial Services',
            url: '/services#financial-services',
            target: '',
            classes: [],
            menu_item_parent: '3',
            order: 2,
          },
        ],
      },
      {
        id: 6,
        title: 'Process',
        url: '/process',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 4,
      },
      {
        id: 7,
        title: 'News',
        url: '/news',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 5,
      },
      {
        id: 8,
        title: 'Contact Us',
        url: '/contact',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 6,
      },
    ],
    menu_id: 0,
    menu_name: 'Default Menu',
  };
}

export default function WordPressMenu({ className = '', isMobile = false }: WordPressMenuProps) {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchPrimaryMenu();
        setMenuData(data);
      } catch (error) {
        console.error('Error loading menu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  if (loading) {
    return (
      <div className={`flex space-x-8 ${className}`}>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-16 rounded"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-20 rounded"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-16 rounded"></div>
      </div>
    );
  }

  if (!menuData) {
    return null;
  }

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div
        key={item.id}
        className="relative"
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <Link
          href={item.url}
          target={item.target}
          className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${
            isMobile
              ? 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
              : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
          }`}
        >
          {item.title}
          {hasChildren && (
            <svg
              className="ml-1 inline-block w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </Link>

        {/* Dropdown Menu */}
        {hasChildren && hoveredItem === item.id && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu">
              {item.children!.map((child) => (
                <Link
                  key={child.id}
                  href={child.url}
                  target={child.target}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  role="menuitem"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="space-y-1">
        {menuData.items.map((item) => (
          <div key={item.id}>
            <Link
              href={item.url}
              target={item.target}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
            >
              {item.title}
            </Link>
            {item.children && item.children.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.url}
                    target={child.target}
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <nav className={`flex space-x-8 ${className}`}>
      {menuData.items.map(renderMenuItem)}
    </nav>
  );
}
