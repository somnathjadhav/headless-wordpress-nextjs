import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../src/components/Layout';

import { fetchPosts, fetchCategories, fetchHeaderSettings } from '../src/lib/wordpress';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    'wp:term'?: Array<Array<{ name: string; slug: string; taxonomy: string }>>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

interface HomeProps {
  featuredPosts: Post[];
  categories: Category[];
  headerSettings: any;
}

export default function Home({ featuredPosts, categories, headerSettings }: HomeProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const truncateText = (text: string, maxLength: number) => {
    const strippedText = text.replace(/<[^>]*>?/gm, '');
    if (strippedText.length <= maxLength) return strippedText;
    return strippedText.substring(0, maxLength) + '...';
  };

  const getCategoryName = (post: Post) => {
    const categoryTerms = post._embedded?.['wp:term']?.find(term => term[0]?.taxonomy === 'category');
    return categoryTerms?.[0]?.name || 'Uncategorized';
  };

  return (
    <Layout title={`${headerSettings?.site_title || 'Blog'} - Latest Posts`} description="Discover the latest insights, tips, and stories from our blog.">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Welcome to Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover insights, tips, and stories that matter. Stay updated with our latest articles and expert perspectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/news" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Explore All Posts
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Featured Posts</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              Our most popular and latest articles that you shouldn't miss
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.slice(0, 6).map((post) => {
              const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
              
              return (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                  {featuredMedia?.source_url ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={featuredMedia.source_url}
                        alt={featuredMedia.alt_text || post.title.rendered}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {getCategoryName(post)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-colors duration-300">
                      <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                        {post.title.rendered}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 transition-colors duration-300">
                      {truncateText(post.excerpt.rendered, 120)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{formatDate(post.date)}</span>
                      <Link href={`/posts/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/news" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Browse by Category</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              Find content that interests you most by exploring our categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center group border border-gray-200 dark:border-gray-600"
              >
                <div className="text-4xl mb-4">📁</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                  {category.description || `Explore ${category.count} articles in ${category.name}`}
                </p>
                <div className="text-blue-600 dark:text-blue-400 font-medium">
                  {category.count} {category.count === 1 ? 'article' : 'articles'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Posts Preview */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Latest from Categories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              Recent posts from our most popular categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {categories.slice(0, 4).map((category) => {
              const categoryPosts = featuredPosts.filter(post => {
                const categoryTerms = post._embedded?.['wp:term']?.find(term => term[0]?.taxonomy === 'category');
                return categoryTerms?.[0]?.name === category.name;
              }).slice(0, 3);
              
              if (categoryPosts.length === 0) return null;
              
              return (
                <div key={category.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{category.name}</h3>
                    <Link href={`/categories/${category.slug}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">
                      View All →
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {categoryPosts.map((post) => (
                      <article key={post.id} className="flex items-start space-x-4">
                        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={post._embedded['wp:featuredmedia'][0].source_url}
                              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 transition-colors duration-300">
                            <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                              {post.title.rendered}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{formatDate(post.date)}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Have questions, suggestions, or want to contribute? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Contact Us
            </Link>
            <Link href="/news" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Browse All Posts
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const [posts, categories, headerSettings] = await Promise.all([
      fetchPosts(1, 20), // Get more posts for category filtering
      fetchCategories(),
      fetchHeaderSettings()
    ]);

    return {
      props: {
        featuredPosts: posts,
        categories,
        headerSettings,
      },
      revalidate: 60, // Regenerate page every 60 seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        featuredPosts: [],
        categories: [],
        headerSettings: {},
      },
      revalidate: 60,
    };
  }
};

