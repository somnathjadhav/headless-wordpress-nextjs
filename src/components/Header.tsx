import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WordPressMenu from './WordPressMenu';
import ThemeSwitcher from './ThemeSwitcher';
import { fetchHeaderSettings } from '../lib/wordpress';
import { useTheme } from './ThemeContext';

interface HeaderSettings {
  logo: string;
  logo_dark: string;
  site_title: string;
  favicon: string;
  cta_text: string;
  cta_link: string;
  phone: string;
  top_bar_text: string;
  address: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Ensure settings is always of type HeaderSettings
  const settings: HeaderSettings = headerSettings || {
    logo: '',
    logo_dark: '',
    site_title: 'Crafto',
    favicon: '',
    cta_text: 'Free consultation',
    cta_link: '/contact',
    phone: '+1 234 567 8910',
    top_bar_text: 'Our accounting experts waiting for you! Contact now',
    address: 'Broadway, 24th Floor, San Francisco',
  };

  useEffect(() => {
    const loadHeaderSettings = async () => {
      try {
            const fetchedSettings = await fetchHeaderSettings();
        setHeaderSettings(fetchedSettings);
      } catch (error) {
        console.error('Error loading header settings:', error);
        // Use default settings if WordPress is not accessible
        setHeaderSettings({
          logo: '',
          logo_dark: '',
          site_title: 'Crafto',
          favicon: '',
          cta_text: 'Free consultation',
          cta_link: '/contact',
          phone: '+1 234 567 8910',
          top_bar_text: 'Our accounting experts waiting for you! Contact now',
          address: 'Broadway, 24th Floor, San Francisco',
        } as HeaderSettings);
      } finally {
        setLoading(false);
      }
    };

    loadHeaderSettings();
  }, []);

  if (loading) {
    return (
      <>
        {/* Top Bar Loading */}
        <div className="bg-gray-100 dark:bg-gray-800 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
              <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-64 rounded"></div>
              <div className="flex items-center space-x-6">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-24 rounded"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-48 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Loading */}
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-600 w-8 h-8 rounded-full mr-3"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-6 w-24 rounded"></div>
              </div>
              <div className="hidden md:block">
                <div className="flex space-x-8">
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-16 rounded"></div>
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-20 rounded"></div>
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-4 w-16 rounded"></div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <ThemeSwitcher />
                <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-10 w-32 rounded"></div>
              </div>
              <div className="md:hidden flex items-center space-x-2">
                <ThemeSwitcher />
                <div className="animate-pulse bg-gray-200 dark:bg-gray-600 w-6 h-6 rounded"></div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }



  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
            <div>
              {settings.top_bar_text}
            </div>
            <div className="flex items-center space-x-6">
              <span>{settings.phone}</span>
              <span>{settings.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                {(settings.logo && settings.logo.trim() !== '') || (settings.logo_dark && settings.logo_dark.trim() !== '') ? (
                  <div className="relative w-48 h-16 mr-6">
                    <Image
                      src={theme === 'dark' && settings.logo_dark && settings.logo_dark.trim() !== '' 
                        ? settings.logo_dark 
                        : settings.logo}
                      alt={settings.site_title || 'Logo'}
                      fill
                      sizes="(max-width: 768px) 100vw, 192px"
                      className="object-contain"
                      onError={(e) => {
                        console.error('Failed to load logo:', theme === 'dark' ? settings.logo_dark : settings.logo);
                        // Hide the logo container if image fails to load
                        const target = e.target as HTMLImageElement;
                        if (target.parentElement) {
                          target.parentElement.style.display = 'none';
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-blue-600 rounded-full mr-6 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                )}
                {/* Only show site title if no logo is uploaded or logo failed to load */}
                {(!settings.logo || settings.logo.trim() === '') && (!settings.logo_dark || settings.logo_dark.trim() === '') && settings.site_title && (
                  <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                    {settings.site_title}
                  </span>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <WordPressMenu className="flex space-x-8" />
            </nav>

            {/* Desktop CTA and Theme Switcher */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeSwitcher />
              {settings.cta_text && (
                <Link
                  href={settings.cta_link}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  {settings.cta_text}
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeSwitcher />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <WordPressMenu className="flex flex-col space-y-2" isMobile={true} />
                {settings.cta_text && (
                  <Link
                    href={settings.cta_link}
                    className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                  >
                    {settings.cta_text}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
