import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
}

export default function Layout({ children, title, description, ogImage }: LayoutProps) {
  const defaultTitle = 'Faust.js WordPress - Modern Headless CMS';
  const defaultDescription = 'A modern headless WordPress site built with Faust.js, Next.js, and GraphQL';
  const [faviconUrl, setFaviconUrl] = useState('/favicon.ico');

  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const response = await fetch('/api/favicon');
        if (response.ok) {
          const data = await response.json();
          if (data.faviconUrl && data.faviconUrl !== '/favicon.ico') {
            setFaviconUrl(data.faviconUrl);
            // Update the favicon link in the DOM
            const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
            faviconLinks.forEach(link => {
              if (link instanceof HTMLLinkElement) {
                link.href = data.faviconUrl;
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fetching favicon:', error);
      }
    };

    fetchFavicon();
  }, []);

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Google Fonts - Wix Madefor Display */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
        
        {/* Favicon */}
        <link rel="icon" href={faviconUrl} />
        <link rel="shortcut icon" href={faviconUrl} />
        <link rel="apple-touch-icon" href={faviconUrl} />
        {faviconUrl !== '/favicon.ico' && (
          <>
            <link rel="icon" type="image/png" href={faviconUrl} />
            <link rel="icon" type="image/x-icon" href={faviconUrl} />
          </>
        )}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/" />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={ogImage || "/og-image.jpg"} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://localhost:3000/" />
        <meta property="twitter:title" content={title || defaultTitle} />
        <meta property="twitter:description" content={description || defaultDescription} />
        <meta property="twitter:image" content={ogImage || "/og-image.jpg"} />
      </Head>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="flex-grow bg-white dark:bg-gray-900 transition-colors duration-300">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
