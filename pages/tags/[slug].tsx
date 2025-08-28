import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../src/components/Layout';
import { fetchTag, fetchTags, fetchPosts } from '../../src/lib/wordpress';

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

interface Tag {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

interface TagPageProps {
  tag: Tag;
  posts: Post[];
}

export default function TagPage({ tag, posts }: TagPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout
      title={`${tag.name} - Tagged Posts`}
      description={tag.description || `All posts tagged with ${tag.name}`}
    >
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Tag
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {tag.name}
            </h1>
            {tag.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {tag.description}
              </p>
            )}
            <p className="text-gray-500 mt-4">
              {posts.length} post{posts.length !== 1 ? 's' : ''} tagged with "{tag.name}"
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
                No posts found with this tag
              </h2>
              <p className="text-gray-600 mb-8">
                There are currently no posts tagged with "{tag.name}".
              </p>
              <Link
                href="/news"
                className="btn btn-primary"
              >
                View All Posts
              </Link>
            </div>
          )}

          {/* Back to Tags */}
          <div className="mt-12 text-center">
            <Link
              href="/tags"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Tags
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const tags = await fetchTags();
    const paths = tags.map((tag: Tag) => ({
      params: { slug: tag.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating tag paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const tag = await fetchTag(slug);
    const posts = await fetchPosts(1, 100, '', tag.id.toString());

    if (!tag) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        tag,
        posts,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching tag:', error);
    return {
      notFound: true,
    };
  }
};

