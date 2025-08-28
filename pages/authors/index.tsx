import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../src/components/Layout';
import { fetchAuthors } from '../../src/lib/wordpress';

interface Author {
  id: number;
  name: string;
  slug: string;
  avatar_urls: { [key: string]: string };
  description: string;
}

interface AuthorsPageProps {
  authors: Author[];
}

export default function AuthorsPage({ authors }: AuthorsPageProps) {
  return (
    <Layout
      title="Blog Authors"
      description="Meet our team of expert authors and contributors"
    >
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Authors
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our team of expert authors and contributors who share their knowledge and insights.
            </p>
          </header>

          {/* Authors Grid */}
          {authors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authors.map((author) => {
                const avatarUrl = author.avatar_urls?.['96'] || '';

                return (
                  <div key={author.id} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow text-center">
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Author
                    </div>
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt={author.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                      />
                    )}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                      <Link 
                        href={`/authors/${author.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {author.name}
                      </Link>
                    </h2>
                    {author.description && (
                      <p className="text-gray-600 mb-6">
                        {author.description}
                      </p>
                    )}
                    <Link
                      href={`/authors/${author.slug}`}
                      className="btn btn-primary"
                    >
                      View Posts
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No authors found
              </h2>
              <p className="text-gray-600 mb-8">
                There are currently no authors available.
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
    const authors = await fetchAuthors();

    return {
      props: {
        authors,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching authors:', error);
    return {
      props: {
        authors: [],
      },
      revalidate: 60,
    };
  }
};

