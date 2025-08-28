import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../src/components/Layout';
import { fetchArchives, fetchPosts } from '../../src/lib/wordpress';

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

interface Archive {
  date: string;
  count: number;
}

interface ArchivePageProps {
  archive: Archive;
  posts: Post[];
}

export default function ArchivePage({ archive, posts }: ArchivePageProps) {
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const formatPostDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const displayDate = formatDate(archive.date);

  return (
    <Layout
      title={`${displayDate} - Blog Archive`}
      description={`All blog posts from ${displayDate}`}
    >
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Archive
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {displayDate}
            </h1>
            <p className="text-gray-500">
              {posts.length} post{posts.length !== 1 ? 's' : ''} published in {displayDate}
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
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No posts found for this period
              </h2>
              <p className="text-gray-600 mb-8">
                There are no posts published in {displayDate}.
              </p>
              <Link
                href="/news"
                className="btn btn-primary"
              >
                View All Posts
              </Link>
            </div>
          )}

          {/* Back to Archives */}
          <div className="mt-12 text-center">
            <Link
              href="/archives"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Archives
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const archives = await fetchArchives();
    const paths = archives.map((archive: Archive) => ({
      params: { date: archive.date },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating archive paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const date = params?.date as string;
    const archives = await fetchArchives();
    const archive = archives.find((a: Archive) => a.date === date);

    if (!archive) {
      return {
        notFound: true,
      };
    }

    // Get posts for this specific month
    const [year, month] = date.split('-');
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;
    
    // For now, we'll get all posts and filter by date on the client side
    // In a real implementation, you'd want to modify the API to support date filtering
    const allPosts = await fetchPosts(1, 100);
    const posts = allPosts.filter((post: Post) => {
      const postDate = new Date(post.date);
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth() + 1;
      return postYear === parseInt(year) && postMonth === parseInt(month);
    });

    return {
      props: {
        archive,
        posts,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching archive:', error);
    return {
      notFound: true,
    };
  }
};

