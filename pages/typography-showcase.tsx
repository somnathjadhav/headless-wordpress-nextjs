import React from 'react';
import Layout from '../src/components/Layout';

export default function TypographyShowcase() {
  return (
    <Layout title="Typography Showcase" description="Default Typography Demo">
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Default Typography System
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Clean and simple typography system using default fonts
              </p>
            </div>
          </div>
        </section>

        {/* Typography Overview */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Typography Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4">Font Family</h3>
                  <p>
                    Default system fonts
                  </p>
                </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">Implementation</h3>
                <p>
                  Simple CSS-based typography system
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">Performance</h3>
                <p>
                  Fast loading with Google Fonts CDN
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Examples */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Typography Examples
            </h2>

            {/* Headings */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">Headings</h3>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">Heading 1 - Main Title</h1>
                <h2 className="text-3xl md:text-4xl font-bold">Heading 2 - Section Title</h2>
                <h3 className="text-2xl md:text-3xl font-semibold">Heading 3 - Subsection Title</h3>
                <h4 className="text-xl md:text-2xl font-semibold">Heading 4 - Sub-subsection</h4>
                <h5 className="text-lg md:text-xl font-medium">Heading 5 - Small Section</h5>
                <h6 className="text-base md:text-lg font-medium">Heading 6 - Tiny Section</h6>
              </div>
            </div>

            {/* Body Text */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">Body Text</h3>
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  This is a paragraph of body text using default fonts. It demonstrates how the typography system applies 
                  font family, size, line height, and other properties consistently across the site.
                </p>
                <p className="text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                  nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is smaller text for captions, footnotes, or secondary information.
                </p>
              </div>
            </div>

            {/* Links and Buttons */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">Interactive Elements</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-base leading-relaxed mb-2">
                    This is a <a href="#" className="text-blue-600 hover:text-blue-800 underline">styled link</a> that 
                    demonstrates link typography with default fonts.
                  </p>
                </div>
                <div className="space-x-4">
                  <button className="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Primary Button
                  </button>
                  <button className="px-6 py-3 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors">
                    Secondary Button
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Elements */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">Custom Elements</h3>
              <div className="space-y-4">
                <span className="text-lg font-medium text-blue-600">
                  Custom span with default typography
                </span>
                <div className="text-sm text-gray-500 italic">
                  Custom div with default styling
                </div>
                                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                    Code elements use monospace font
                  </code>
              </div>
            </div>
          </div>
        </section>

        {/* Font Information */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Font Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Font Details */}
                              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4">Default Fonts</h3>
                  <div className="space-y-2">
                    <p><strong>Font Family:</strong> System fonts</p>
                    <p><strong>Source:</strong> Operating system</p>
                    <p><strong>Weights:</strong> Normal, bold</p>
                    <p><strong>Style:</strong> Sans-serif</p>
                    <p><strong>Loading:</strong> Native</p>
                  </div>
                </div>

              {/* Implementation Details */}
                              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4">Implementation</h3>
                  <div className="space-y-2">
                    <p><strong>Method:</strong> System defaults</p>
                    <p><strong>Scope:</strong> All text elements</p>
                    <p><strong>Priority:</strong> Browser defaults</p>
                    <p><strong>Fallback:</strong> System fonts</p>
                    <p><strong>Performance:</strong> Instant loading</p>
                  </div>
                </div>
            </div>

            {/* CSS Code Example */}
            <div className="mt-8">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">CSS Implementation</h3>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <pre className="text-sm overflow-x-auto">
{`/* No custom font imports needed */

:root {
  /* Using system default fonts */
}

/* Browser applies default font-family automatically */`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
