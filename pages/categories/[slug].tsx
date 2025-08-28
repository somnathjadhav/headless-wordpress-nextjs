import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../src/components/Layout';
import { fetchCategory, fetchCategories, fetchPosts } from '../../src/lib/wordpress';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{
      name: string;
      avatar_urls: { [key: string]: string };
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

interface CategoryPageProps {
  category: Category;
  posts: Post[];
}

export default function CategoryPage({ category, posts }: CategoryPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout
      title={`${category.name} - Blog Posts`}
      description={category.description || `All posts in the ${category.name} category`}
    >
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            )}
            <p className="text-gray-500 mt-4">
              {posts.length} post{posts.length !== 1 ? 's' : ''} in this category
            </p>
          </header>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const authorName = post._embedded?.author?.[0]?.name || 'Unknown Author';
                const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

                return (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {featuredImage && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={featuredImage}
                          alt={post.title.rendered}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        <Link 
                          href={`/posts/${post.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        </Link>
                      </h2>
                      <div 
                        className="text-gray-600 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>By {authorName}</span>
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No posts found in this category
              </h2>
              <p className="text-gray-600 mb-8">
                There are currently no posts in the "{category.name}" category.
              </p>
              <Link
                href="/news"
                className="btn btn-primary"
              >
                View All Posts
              </Link>
            </div>
          )}

          {/* Back to Categories */}
          <div className="mt-12 text-center">
            <Link
              href="/categories"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Categories
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await fetchCategories();
    const paths = categories.map((category: Category) => ({
      params: { slug: category.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating category paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const category = await fetchCategory(slug);
    const posts = await fetchPosts(1, 100, category.id.toString());

    if (!category) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        category,
        posts,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return {
      notFound: true,
    };
  }
};

