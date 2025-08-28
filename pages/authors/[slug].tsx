import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../src/components/Layout';
import { fetchAuthor, fetchAuthors, fetchPosts } from '../../src/lib/wordpress';

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

interface Author {
  id: number;
  name: string;
  slug: string;
  avatar_urls: { [key: string]: string };
  description: string;
}

interface AuthorPageProps {
  author: Author;
  posts: Post[];
}

export default function AuthorPage({ author, posts }: AuthorPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const avatarUrl = author.avatar_urls?.['96'] || '';

  return (
    <Layout
      title={`${author.name} - Author Posts`}
      description={author.description || `All posts by ${author.name}`}
    >
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Author
            </div>
            <div className="flex items-center justify-center mb-6">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={author.name}
                  className="w-20 h-20 rounded-full mr-4"
                />
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {author.name}
              </h1>
            </div>
            {author.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                {author.description}
              </p>
            )}
            <p className="text-gray-500">
              {posts.length} post{posts.length !== 1 ? 's' : ''} by {author.name}
            </p>
          </header>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
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
                      <div className="text-sm text-gray-500">
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
                No posts found by this author
              </h2>
              <p className="text-gray-600 mb-8">
                {author.name} hasn't published any posts yet.
              </p>
              <Link
                href="/news"
                className="btn btn-primary"
              >
                View All Posts
              </Link>
            </div>
          )}

          {/* Back to Authors */}
          <div className="mt-12 text-center">
            <Link
              href="/authors"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Authors
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const authors = await fetchAuthors();
    const paths = authors.map((author: Author) => ({
      params: { slug: author.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating author paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const author = await fetchAuthor(slug);
    const posts = await fetchPosts(1, 100, '', '', author.id.toString());

    if (!author) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        author,
        posts,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching author:', error);
    return {
      notFound: true,
    };
  }
};

