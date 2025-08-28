# 🚀 Headless WordPress Starter Package

A standardized, production-ready headless WordPress setup for rapid website development.

## 📋 Features

- ✅ **Headless WordPress Backend** - Clean, optimized WordPress installation
- ✅ **Next.js Frontend** - Modern React-based frontend with TypeScript
- ✅ **ACF Integration** - Advanced Custom Fields for content management
- ✅ **REST API** - Custom endpoints for headless functionality
- ✅ **Contact Form Handler** - Backend contact form processing
- ✅ **Performance Optimized** - CORS headers, disabled unnecessary features
- ✅ **TypeScript Support** - Full type safety across the stack
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **Responsive Design** - Mobile-first approach

## 🏗️ Architecture

```
headless-wp-starter/
├── public/                 # WordPress backend
│   ├── wp-content/
│   │   ├── plugins/        # Custom plugins
│   │   ├── themes/         # Headless theme
│   │   └── uploads/        # Media files
│   └── wp-config.php       # WordPress configuration
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   └── lib/          # Utilities & API functions
│   └── package.json
├── docs/                  # Documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PHP 8.0+
- MySQL 8.0+
- Local by Flywheel (recommended)

### 1. Clone & Setup
```bash
git clone <your-repo>
cd headless-wp-starter
```

### 2. Backend Setup
```bash
# Configure WordPress
cp public/wp-config-sample.php public/wp-config.php
# Edit wp-config.php with your database settings

# Install WordPress
# Visit: http://localhost:10010/wp-admin/install.php
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your WordPress URL
npm run dev
```

### 4. Activate Plugins
1. Go to WordPress Admin: `http://localhost:10010/wp-admin`
2. Activate these plugins:
   - Advanced Custom Fields
   - Headless ACF Setup
   - Headless Contact Form Handler
   - Headless WordPress Optimizer

## 📦 Included Plugins

### Core Plugins
- **Advanced Custom Fields** - Content management
- **Headless ACF Setup** - Custom post types & fields
- **Headless Contact Form** - Form processing
- **Headless Optimizer** - Performance optimization

### Custom Post Types
- **Testimonials** - Customer testimonials with ACF fields
- **Pages** - Standard pages with custom ACF field groups

## 🎨 Frontend Structure

### Pages
- `/` - Homepage
- `/about` - About Us page
- `/services` - Services page
- `/contact` - Contact page
- `/testimonials` - Testimonials page

### Components
- `Header` - Navigation & branding
- `Footer` - Site footer
- `ContactForm` - Contact form with validation
- `TestimonialCard` - Individual testimonial display

### API Integration
- `wordpress.ts` - WordPress REST API functions
- `homepage.ts` - Homepage data fetching
- Custom endpoints for testimonials & contact forms

## 🔧 Configuration

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:10010/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost:10010/graphql

# Backend (wp-config.php)
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost:10006
```

### WordPress Settings
- **Permalinks**: Post name (/%postname%/)
- **Reading**: Static page (Homepage)
- **Discussion**: Comments disabled (headless)

## 📝 Content Management

### ACF Field Groups
- **About Us Page** - Hero, content, mission, vision, values
- **Services Page** - Hero, services list
- **Contact Page** - Hero, contact information
- **Testimonials** - Author, position, company, rating

### Custom Endpoints
- `GET /wp-json/headless/v1/testimonials` - Get testimonials
- `POST /wp-json/headless/v1/contact` - Submit contact form

## 🎯 Best Practices

### Development Workflow
1. **Content First** - Set up ACF fields in WordPress
2. **API Testing** - Test endpoints with Postman/curl
3. **Frontend Development** - Build components with TypeScript
4. **Integration** - Connect frontend to WordPress API

### Performance
- Images optimized with Next.js Image component
- API responses cached where appropriate
- Static generation for better SEO
- Minimal WordPress footprint

### Security
- CORS headers configured
- Input sanitization on all forms
- WordPress security best practices
- Environment variables for sensitive data

## 🚀 Deployment

### Backend (WordPress)
- Deploy to hosting with PHP/MySQL support
- Update `wp-config.php` with production settings
- Configure domain and SSL

### Frontend (Next.js)
- Deploy to Vercel, Netlify, or similar
- Set environment variables
- Configure custom domain

## 📚 Documentation

- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Next.js Documentation](https://nextjs.org/docs)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Check the documentation
- Review WordPress and Next.js docs

---

**Built with ❤️ for rapid headless WordPress development**
