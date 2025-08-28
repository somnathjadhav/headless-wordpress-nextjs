import { getPost } from '@/lib/wordpress';
import { formatDate, parseHtml } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-gray-600">
                Headless WordPress Blog
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-gray-600">
                Home
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Posts
          </Link>
        </nav>

        {/* Post Content */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            {/* Post Header */}
            <header className="mb-8">
              <div className="text-sm text-gray-500 mb-4">
                {formatDate(post.date)}
              </div>
              <h1 
                className="text-4xl font-bold text-gray-900 mb-4"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              {post.excerpt.rendered && (
                <div 
                  className="text-xl text-gray-600 italic"
                  dangerouslySetInnerHTML={{ __html: parseHtml(post.excerpt.rendered) }}
                />
              )}
            </header>

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: parseHtml(post.content.rendered) }}
            />
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Posts
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 Headless WordPress Blog. Built with Next.js and WordPress.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
