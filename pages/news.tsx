import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../src/components/Layout';
import { fetchPosts, fetchCategories, fetchTags, fetchAuthors, fetchArchives } from '../src/lib/wordpress';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  author: number;
  featured_media: number;
  _embedded?: {
    author?: Array<{
      name: string;
      slug: string;
      avatar_urls: { [key: string]: string };
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface Author {
  id: number;
  name: string;
  slug: string;
  avatar_urls: { [key: string]: string };
}

interface Archive {
  date: string;
  count: number;
}

interface NewsProps {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  archives: Archive[];
}

const News: React.FC<NewsProps> = ({ posts }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Layout title="News" description="Latest news and blog posts from Accounto.">
      <section className="py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold text-center mb-10 text-gray-900 dark:text-white transition-colors duration-300">
            Latest News
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const author = post._embedded?.author?.[0];
              const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
              const categories = post._embedded?.['wp:term']?.find(term => term[0]?.taxonomy === 'category') || [];

              return (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md">
                  {featuredMedia?.source_url ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={featuredMedia.source_url}
                        alt={featuredMedia.alt_text || post.title.rendered}
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 rounded-t-lg">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2 h-14 line-clamp-2 transition-colors duration-300">
                      <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                        {truncateText(post.title.rendered, 80)}
                      </Link>
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex flex-wrap gap-x-3 transition-colors duration-300">
                      {author && (
                        <Link href={`/authors/${author.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                          By {author.name}
                        </Link>
                      )}
                      {categories.length > 0 && (
                        <>
                          <span className="mx-1">|</span>
                          <Link href={`/categories/${categories[0].slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                            {categories[0].name}
                          </Link>
                        </>
                      )}
                      <span className="mx-1">|</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div
                      className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 transition-colors duration-300"
                      dangerouslySetInnerHTML={{ __html: truncateText(post.excerpt.rendered.replace(/<[^>]*>?/gm, ''), 150) }}
                    />
                    <Link href={`/posts/${post.slug}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">
                      Read More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const posts = await fetchPosts();
  const categories = await fetchCategories();
  const tags = await fetchTags();
  const authors = await fetchAuthors();
  const archives = await fetchArchives();

  return {
    props: {
      posts,
      categories,
      tags,
      authors,
      archives,
    },
    revalidate: 60, // Regenerate page every 60 seconds
  };
};

export default News;
