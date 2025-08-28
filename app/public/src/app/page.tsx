import { getPosts } from '@/lib/wordpress';
import { formatDate, truncateText, parseHtml } from '@/lib/utils';
import Link from 'next/link';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Headless WordPress Blog
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our Headless WordPress Site
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            This is a Next.js frontend consuming content from a WordPress backend via the REST API.
            The content you see below is being fetched from WordPress in real-time.
          </p>
        </div>

        {/* Posts Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Post Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-white text-4xl font-bold opacity-20">
                  {post.title.rendered.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="p-6">
                {/* Post Meta */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.date)}
                </div>
                
                {/* Post Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  <Link
                    href={`/post/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title.rendered}
                  </Link>
                </h3>
                
                {/* Post Excerpt */}
                <div
                  className="text-gray-600 mb-4 line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: truncateText(parseHtml(post.excerpt.rendered), 120)
                  }}
                />
                
                {/* Read More Button */}
                <Link
                  href={`/post/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group"
                >
                  Read more
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Posts Message */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No posts found
              </h3>
              <p className="text-gray-600 text-lg">
                It looks like there are no posts published yet. Check back soon for amazing content!
              </p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {posts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Blog Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{posts.length}</div>
                <div className="text-gray-600">Total Posts</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {posts.filter(post => new Date(post.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-gray-600">Posts This Month</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {new Date().getFullYear()}
                </div>
                <div className="text-gray-600">Current Year</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Headless WordPress Blog</h4>
              <p className="text-gray-300">
                A modern React frontend powered by WordPress content management.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Built With</h4>
              <div className="flex space-x-4">
                <div className="bg-blue-600 px-3 py-1 rounded-full text-sm">Next.js</div>
                <div className="bg-green-600 px-3 py-1 rounded-full text-sm">React</div>
                <div className="bg-purple-600 px-3 py-1 rounded-full text-sm">WordPress</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 Headless WordPress Blog. Built with Next.js and WordPress.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
