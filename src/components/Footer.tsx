import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchFooterSettings, fetchFooterMenus } from '../lib/wordpress';

interface FooterSettings {
  logo: string;
  description: string;
  social_links: Record<string, string>;
  copyright_text: string;
  upper_footer_content: string;
}

interface FooterMenuItem {
  id: number;
  title: string;
  url: string;
  target: string;
  classes: string[];
  order: number;
}

interface FooterMenu {
  items: FooterMenuItem[];
  menu_id: number | null;
  menu_name: string;
}

interface FooterMenus {
  'footer-1': FooterMenu;
  'footer-2': FooterMenu;
  'footer-3': FooterMenu;
  'footer-bottom': FooterMenu;
}

export default function Footer() {
  const [footerSettings, setFooterSettings] = useState<FooterSettings | null>(null);
  const [footerMenus, setFooterMenus] = useState<FooterMenus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const [settings, menus] = await Promise.all([
          fetchFooterSettings(),
          fetchFooterMenus()
        ]);
        setFooterSettings(settings);
        setFooterMenus(menus);
      } catch (error) {
        console.error('Error loading footer data:', error);
        // Use default settings if WordPress is not accessible
        setFooterSettings({
          logo: '',
          description: 'Lorem ipsum amet adipiscing elit to eiusmod ad tempor.',
          social_links: {},
          copyright_text: '© 2024 Accounto. All rights reserved.',
          upper_footer_content: '',
        });
        setFooterMenus({
          'footer-1': {
            items: [
              { id: 1, title: 'Company', url: '/company', target: '', classes: [], order: 1 },
              { id: 2, title: 'Services', url: '/services', target: '', classes: [], order: 2 },
              { id: 3, title: 'Process', url: '/process', target: '', classes: [], order: 3 },
              { id: 4, title: 'Contact', url: '/contact', target: '', classes: [], order: 4 },
            ],
            menu_id: null,
            menu_name: 'About'
          },
          'footer-2': {
            items: [
              { id: 5, title: 'Financial', url: '/financial', target: '', classes: [], order: 1 },
              { id: 6, title: 'Investment', url: '/investment', target: '', classes: [], order: 2 },
              { id: 7, title: 'Banking', url: '/banking', target: '', classes: [], order: 3 },
              { id: 8, title: 'Consulting', url: '/consulting', target: '', classes: [], order: 4 },
            ],
            menu_id: null,
            menu_name: 'Services'
          },
          'footer-3': {
            items: [
              { id: 9, title: 'Privacy Policy', url: '/privacy', target: '', classes: [], order: 1 },
              { id: 10, title: 'Terms of Service', url: '/terms', target: '', classes: [], order: 2 },
              { id: 11, title: 'Sitemap', url: '/sitemap', target: '', classes: [], order: 3 },
            ],
            menu_id: null,
            menu_name: 'Footer Menu 3'
          },
          'footer-bottom': {
            items: [
              { id: 12, title: 'Privacy Policy', url: '/privacy', target: '', classes: [], order: 1 },
              { id: 13, title: 'Terms of Service', url: '/terms', target: '', classes: [], order: 2 },
              { id: 14, title: 'Sitemap', url: '/sitemap', target: '', classes: [], order: 3 },
            ],
            menu_id: null,
            menu_name: 'Footer Bottom'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadFooterData();
  }, []);

  if (loading) {
    return (
      <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
        <div className="animate-pulse">
          <div className="py-16 text-center">
            <div className="bg-gray-600 dark:bg-gray-700 h-8 w-64 mx-auto mb-4 rounded"></div>
            <div className="bg-gray-600 dark:bg-gray-700 h-6 w-96 mx-auto mb-8 rounded"></div>
            <div className="flex justify-center space-x-4">
              <div className="bg-gray-600 dark:bg-gray-700 h-12 w-48 rounded"></div>
              <div className="bg-gray-600 dark:bg-gray-700 h-12 w-48 rounded"></div>
            </div>
          </div>
          <div className="border-t border-gray-600 dark:border-gray-700 py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="space-y-4">
                <div className="bg-gray-600 dark:bg-gray-700 h-6 w-20 rounded"></div>
                <div className="space-y-2">
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-16 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-20 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-18 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-600 dark:bg-gray-700 h-6 w-20 rounded"></div>
                <div className="space-y-2">
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-16 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-20 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-18 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-600 dark:bg-gray-700 h-6 w-20 rounded"></div>
                <div className="space-y-2">
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-16 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-20 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-18 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-600 dark:bg-gray-700 h-6 w-20 rounded"></div>
                <div className="space-y-2">
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-16 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-20 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-18 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-600 dark:bg-gray-700 h-6 w-20 rounded"></div>
                <div className="space-y-2">
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-16 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-20 rounded"></div>
                  <div className="bg-gray-600 dark:bg-gray-700 h-4 w-18 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const settings = footerSettings || {
    logo: '',
    description: 'Lorem ipsum amet adipiscing elit to eiusmod ad tempor.',
    social_links: {},
    copyright_text: '© 2024 Accounto. All rights reserved.',
    upper_footer_content: '',
  };

  const menus = footerMenus || {
    'footer-1': { items: [], menu_id: null, menu_name: '' },
    'footer-2': { items: [], menu_id: null, menu_name: '' },
    'footer-3': { items: [], menu_id: null, menu_name: '' },
    'footer-bottom': { items: [], menu_id: null, menu_name: '' }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      {/* Upper Footer CTA */}
      {settings.upper_footer_content && (
        <div className="bg-blue-600 dark:bg-blue-700 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="text-2xl font-heading font-bold mb-4">
              {settings.upper_footer_content}
            </div>
            <Link
              href="/contact"
              className="inline-block bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                {settings.logo ? (
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src={settings.logo}
                      alt="Company Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-blue-600 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                )}
                <span className="text-2xl font-heading font-bold">Accounto</span>
              </div>
              <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
                {settings.description}
              </p>
              <div className="flex space-x-4">
                {Object.entries(settings.social_links).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="sr-only">{platform}</span>
                    {/* Add social media icons here */}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Menus */}
            <div>
              <h3 className="text-lg font-heading font-semibold mb-4 text-white">
                {menus['footer-1'].menu_name || 'Company'}
              </h3>
              <ul className="space-y-2">
                {menus['footer-1'].items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-heading font-semibold mb-4 text-white">
                {menus['footer-2'].menu_name || 'Services'}
              </h3>
              <ul className="space-y-2">
                {menus['footer-2'].items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-heading font-semibold mb-4 text-white">
                {menus['footer-3'].menu_name || 'Legal'}
              </h3>
              <ul className="space-y-2">
                {menus['footer-3'].items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              {settings.copyright_text}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {menus['footer-bottom'].items.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white text-sm transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

