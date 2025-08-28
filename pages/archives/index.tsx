import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../src/components/Layout';
import { fetchArchives } from '../../src/lib/wordpress';

interface Archive {
  date: string;
  count: number;
}

interface ArchivesPageProps {
  archives: Archive[];
}

export default function ArchivesPage({ archives }: ArchivesPageProps) {
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <Layout
      title="Blog Archives"
      description="Browse our blog posts by month and year"
    >
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog Archives
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our blog posts by month and year to find content from specific time periods.
            </p>
          </header>

          {/* Archives Grid */}
          {archives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {archives.map((archive) => (
                <div key={archive.date} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Archive
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                      <Link 
                        href={`/archives/${archive.date}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {formatDate(archive.date)}
                      </Link>
                    </h2>
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-3xl font-bold text-purple-600">
                        {archive.count}
                      </span>
                      <span className="text-gray-500">
                        post{archive.count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <Link
                      href={`/archives/${archive.date}`}
                      className="inline-block mt-6 btn btn-primary"
                    >
                      View Posts
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No archives found
              </h2>
              <p className="text-gray-600 mb-8">
                There are currently no blog archives available.
              </p>
              <Link
                href="/news"
                className="btn btn-primary"
              >
                View All Posts
              </Link>
            </div>
          )}

          {/* Back to News */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to News
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const archives = await fetchArchives();

    return {
      props: {
        archives,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching archives:', error);
    return {
      props: {
        archives: [],
      },
      revalidate: 60,
    };
  }
};

