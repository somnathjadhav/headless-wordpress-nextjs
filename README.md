# Headless WordPress Boilerplate

A modern, production-ready headless WordPress website built with Next.js, TypeScript, and Tailwind CSS. This boilerplate provides a clean, performant foundation for building headless WordPress applications.

## ✨ Features

### **Frontend (Next.js)**
- **Next.js 14** with Pages Router (stable and reliable)
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for utility-first styling
- **Static Site Generation (SSG)** with Incremental Static Regeneration (ISR)
- **Responsive Design** with mobile-first approach
- **SEO Optimized** with proper meta tags and structured data
- **Image Optimization** with Next.js Image component
- **Error Handling** with custom 404 and error boundaries

### **WordPress Integration**
- **GraphQL API** via WPGraphQL plugin
- **Type-safe queries** with proper TypeScript interfaces
- **Content utilities** for handling WordPress content
- **CORS headers** configured for cross-origin requests
- **Headless optimizations** in WordPress child theme

### **Pages & Components**
- **Homepage** - Displays recent posts and site settings
- **Posts Listing** - Shows all posts with pagination
- **Individual Post Pages** - Dynamic routing for posts
- **About Page** - Static content page
- **404 Page** - Custom error page
- **Reusable Components** - Layout, Header, Footer, PostCard, SEO, Loading, ErrorBoundary

### **Performance & SEO**
- **Static Generation** for fast loading
- **ISR (Incremental Static Regeneration)** for fresh content
- **SEO Component** with Open Graph and Twitter meta tags
- **Canonical URLs** for better SEO
- **Reading time calculation** for posts
- **Content excerpt generation** with fallbacks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- WordPress installation with WPGraphQL plugin
- Local by Flywheel (or similar local development environment)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:10013/graphql
   NEXT_PUBLIC_WORDPRESS_SITE_URL=http://localhost:10013
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access your website:**
   - Frontend: `http://localhost:3000`
   - WordPress Admin: `http://localhost:10013/wp-admin`

## 📁 Project Structure

```
├── pages/                    # Next.js pages (Pages Router)
│   ├── index.tsx            # Homepage with recent posts
│   ├── posts/
│   │   ├── index.tsx        # Posts listing page
│   │   └── [slug].tsx       # Individual post pages
│   ├── about.tsx            # About page
│   ├── 404.tsx              # Custom 404 page
│   ├── _app.tsx             # App wrapper
│   └── _document.tsx        # HTML document
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Header.tsx       # Site header with navigation
│   │   ├── Footer.tsx       # Site footer
│   │   ├── PostCard.tsx     # Post preview cards
│   │   ├── SEO.tsx          # SEO meta tags component
│   │   ├── Loading.tsx      # Loading spinner
│   │   └── ErrorBoundary.tsx # Error handling
│   ├── lib/                 # Utility functions
│   │   ├── wordpress.ts     # WordPress GraphQL client
│   │   ├── queries.ts       # GraphQL queries
│   │   └── content.ts       # Content utilities
│   └── types/               # TypeScript type definitions
│       └── wordpress.ts     # WordPress data types
├── styles/
│   └── globals.css          # Global styles with Tailwind
├── app/                     # WordPress installation
├── conf/                    # Local by Flywheel config
└── Configuration files
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Pages
1. Create a new file in `pages/` directory
2. Use the `Layout` component for consistent styling
3. Add `getStaticProps` for data fetching if needed

### Styling
- Global styles: `styles/globals.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles use Tailwind utility classes

### WordPress Integration
- GraphQL client: `src/lib/wordpress.ts`
- Type definitions: `src/types/wordpress.ts`
- Add new queries: `src/lib/queries.ts`

## 🔧 Configuration

### WordPress Setup
1. Install and activate WPGraphQL plugin
2. Configure CORS in your WordPress child theme
3. Create some sample posts and pages
4. Set up your site title and description

### Environment Variables
- `NEXT_PUBLIC_WORDPRESS_API_URL` - WordPress GraphQL endpoint
- `NEXT_PUBLIC_WORDPRESS_SITE_URL` - WordPress site URL for images

## 📊 Performance Features

- **Static Generation** - Pages are pre-built at build time
- **ISR** - Pages are regenerated in the background
- **Image Optimization** - Automatic image optimization
- **Code Splitting** - Automatic code splitting by pages
- **Bundle Analysis** - Built-in bundle analyzer

## 🔒 Security

- **CORS Headers** - Properly configured for GraphQL
- **Environment Variables** - Secure configuration management
- **Type Safety** - TypeScript prevents runtime errors
- **Error Boundaries** - Graceful error handling

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review WordPress and Next.js documentation
3. Open an issue on GitHub

---

**Built with ❤️ using Next.js, TypeScript, and WordPress**
