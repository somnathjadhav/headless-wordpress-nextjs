import React, { useState, useEffect } from 'react';
import Layout from '../src/components/Layout';

interface AboutPage {
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

export default function AboutUs() {
  const [pageData, setPageData] = useState<AboutPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        setLoading(true);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('/api/page/about-us', {
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
        console.error('Error fetching about page:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch page content');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
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
      title="About Us - Faust.js WordPress"
      description="Learn more about our company, mission, and values. Discover what makes us unique and how we can help you achieve your goals."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Discover our story, mission, and the team behind our success
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading about page content...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 mb-4">Error loading page content: {error}</p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  About Our Company
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Welcome to our company! We are passionate about delivering exceptional solutions 
                    and creating meaningful experiences for our clients.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our team consists of dedicated professionals who are committed to innovation, 
                    quality, and customer satisfaction. We believe in building lasting relationships 
                    and delivering results that exceed expectations.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    To learn more about our services and how we can help you, please visit our 
                    <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                      contact page
                    </a>.
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

      {/* Call to Action Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Get in touch with our team to discuss your project and see how we can help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/services"
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
