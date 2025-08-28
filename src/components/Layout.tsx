import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { fetchHeaderSettings } from '../lib/wordpress';


interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const defaultTitle = 'Crafto - Professional Accounting Services';
  const defaultDescription = 'We are dedicated to providing amazing business accounting services and client service.';

  // Get favicon from header settings
  const [favicon, setFavicon] = React.useState<string>('');

  React.useEffect(() => {
    const getFavicon = async () => {
      try {
        const headerSettings = await fetchHeaderSettings();
        if (headerSettings?.favicon) {
          setFavicon(headerSettings.favicon);
        }
      } catch (error) {
        console.error('Error loading favicon:', error);
      }
    };

    getFavicon();
  }, []);

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        {favicon ? (
          <link rel="icon" href={favicon} />
        ) : (
          <link rel="icon" href="/favicon.ico" />
        )}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/" />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://localhost:3000/" />
        <meta property="twitter:title" content={title || defaultTitle} />
        <meta property="twitter:description" content={description || defaultDescription} />
        <meta property="twitter:image" content="/og-image.jpg" />
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
