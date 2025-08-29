import React, { useState, useEffect } from 'react';
import Layout from '../src/components/Layout';

interface PrivacyPage {
  id: string;
  title: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export default function PrivacyPolicy() {
  const [pageData, setPageData] = useState<PrivacyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacyPage = async () => {
      try {
        setLoading(true);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('/api/page/privacy-policy', {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.error) {
          throw new Error(result.error);
        }

        setPageData(result.page);
      } catch (err) {
        console.error('Error fetching privacy page:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch page content');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPage();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Function to convert WordPress content to HTML
  const createMarkup = (content: string) => {
    return { __html: content };
  };

  return (
    <Layout 
      title="Privacy Policy - Faust.js WordPress"
      description="Our privacy policy explains how we collect, use, and protect your personal information. Read our commitment to your privacy and data security."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we protect your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading privacy policy content...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 mb-4">Error loading page content: {error}</p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Privacy Policy
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We are committed to protecting your privacy and ensuring the security of your personal information.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    This privacy policy explains how we collect, use, and safeguard your data when you visit our website 
                    and use our services.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    To view our complete privacy policy, please ensure the Privacy Policy page is created in your 
                    WordPress admin with the slug "privacy-policy".
                  </p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && pageData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Featured Image */}
              {pageData.featuredImage && (
                <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700">
                  <img
                    src={pageData.featuredImage.node.sourceUrl}
                    alt={pageData.featuredImage.node.altText || pageData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Page Content */}
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {pageData.title}
                </h1>

                <div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={createMarkup(pageData.content)}
                />

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {formatDate(pageData.date)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Our Privacy Policy?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            If you have any questions about our privacy practices or this policy, please don't hesitate to contact us.
          </p>
          <a
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </Layout>
  );
}
