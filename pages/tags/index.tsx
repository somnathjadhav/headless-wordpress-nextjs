import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../src/components/Layout';
import { fetchTags } from '../../src/lib/wordpress';

interface Tag {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

interface TagsPageProps {
  tags: Tag[];
}

export default function TagsPage({ tags }: TagsPageProps) {
  return (
    <Layout
      title="Blog Tags"
      description="Browse all blog tags and find posts that interest you"
    >
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog Tags
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our blog posts by tag to find content that's most relevant to you.
            </p>
          </header>

          {/* Tags Grid */}
          {tags.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tags.map((tag) => (
                <div key={tag.id} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Tag
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                      <Link 
                        href={`/tags/${tag.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {tag.name}
                      </Link>
                    </h2>
                    {tag.description && (
                      <p className="text-gray-600 mb-4">
                        {tag.description}
                      </p>
                    )}
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-3xl font-bold text-blue-600">
                        {tag.count}
                      </span>
                      <span className="text-gray-500">
                        post{tag.count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <Link
                      href={`/tags/${tag.slug}`}
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
                No tags found
              </h2>
              <p className="text-gray-600 mb-8">
                There are currently no blog tags available.
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
    const tags = await fetchTags();

    return {
      props: {
        tags,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching tags:', error);
    return {
      props: {
        tags: [],
      },
      revalidate: 60,
    };
  }
};

