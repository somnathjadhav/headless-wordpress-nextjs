import React, { useState, useEffect } from 'react';
import Layout from '../src/components/Layout';

interface ProcessPage {
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

export default function Process() {
  const [pageData, setPageData] = useState<ProcessPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProcessPage = async () => {
      try {
        setLoading(true);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('/api/page/process', {
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
        console.error('Error fetching process page:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch page content');
      } finally {
        setLoading(false);
      }
    };

    fetchProcessPage();
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
      title="Our Process - Faust.js WordPress"
      description="Discover our proven process for delivering exceptional web solutions. Learn how we work with clients to create successful digital experiences."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Process
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
            A proven methodology for delivering exceptional results
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading process content...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 mb-4">Error loading page content: {error}</p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Process
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We follow a systematic approach to ensure every project is delivered on time, 
                    within budget, and exceeds expectations.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our proven process includes discovery, planning, design, development, testing, 
                    and deployment phases to create successful digital solutions.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    To learn more about our process, please ensure the Process page is created in your 
                    WordPress admin with the slug "process".
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

      {/* Process Steps Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Development Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A systematic approach to delivering exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Discovery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Understanding your needs, goals, and requirements
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating detailed project plans and architecture
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building your solution with modern technologies
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Launch</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Deploying and maintaining your solution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Let's discuss how our process can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </a>
            <a
              href="/about-us"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
