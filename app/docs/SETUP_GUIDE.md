# 🚀 Headless WordPress Starter - Setup Guide

A comprehensive guide to set up and deploy your headless WordPress starter package.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **PHP 8.0+** - [Download here](https://php.net/)
- **MySQL 8.0+** - [Download here](https://dev.mysql.com/)
- **Local by Flywheel** (Recommended) - [Download here](https://localwp.com/)

## 🏗️ Installation Steps

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd headless-wp-starter
```

### Step 2: Backend Setup (WordPress)

#### Option A: Using Local by Flywheel (Recommended)

1. **Create a new site in Local by Flywheel**
   - Open Local by Flywheel
   - Click "Create a new site"
   - Choose "Custom" setup
   - Set site name: `headless-wp-starter`
   - Choose PHP 8.0+ and MySQL 8.0+
   - Set admin username/password

2. **Replace WordPress files**
   - Stop the site in Local
   - Navigate to the site directory
   - Replace the `app/public` folder with your `public` folder
   - Copy `wp-config-sample.php` to `wp-config.php`
   - Update database settings in `wp-config.php`

3. **Start the site**
   - Start the site in Local
   - Access WordPress admin: `http://headless-wp-starter.local/wp-admin`

#### Option B: Manual Setup

1. **Set up local server**
   - Configure your local server (XAMPP, MAMP, etc.)
   - Point to the `public` directory

2. **Configure database**
   - Create a new MySQL database
   - Copy `wp-config-sample.php` to `wp-config.php`
   - Update database settings

3. **Install WordPress**
   - Visit: `http://localhost/wp-admin/install.php`
   - Follow the installation wizard

### Step 3: WordPress Configuration

1. **Access WordPress Admin**
   - Go to: `http://localhost/wp-admin`
   - Login with your credentials

2. **Configure Permalinks**
   - Go to: Settings → Permalinks
   - Select: "Post name" (/%postname%/)
   - Save changes

3. **Configure Reading Settings**
   - Go to: Settings → Reading
   - Set: "Your homepage displays" to "A static page"
   - Choose a page for homepage (create one if needed)

4. **Disable Comments**
   - Go to: Settings → Discussion
   - Uncheck: "Allow people to post comments on new articles"

### Step 4: Activate Plugins

1. **Go to Plugins page**
   - Navigate to: Plugins → Installed Plugins

2. **Activate these plugins in order:**
   - ✅ **Advanced Custom Fields** (ACF)
   - ✅ **Headless ACF Setup**
   - ✅ **Headless Contact Form Handler**
   - ✅ **Headless WordPress Optimizer**

3. **Verify plugin activation**
   - All plugins should show "Active" status
   - Check for any error messages

### Step 5: Frontend Setup (Next.js)

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.example .env.local
   ```

4. **Update environment variables**
   Edit `.env.local` and update:
   ```env
   NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost/wp-json/wp/v2
   NEXT_PUBLIC_SITE_NAME="Your Site Name"
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Verify frontend**
   - Open: `http://localhost:3000`
   - Should see your homepage

## 🧪 Testing Your Setup

### Test WordPress Backend

1. **Test REST API**
   ```bash
   curl http://localhost/wp-json/wp/v2/posts
   ```

2. **Test Custom Endpoints**
   ```bash
   curl http://localhost/wp-json/headless/v1/testimonials
   ```

3. **Test Contact Form**
   ```bash
   curl -X POST http://localhost/wp-json/headless/v1/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

### Test Frontend

1. **Check homepage**: `http://localhost:3000`
2. **Check About page**: `http://localhost:3000/about`
3. **Check Contact page**: `http://localhost:3000/contact`
4. **Check Testimonials**: `http://localhost:3000/testimonials`

## 📝 Content Setup

### Create Sample Content

1. **Create Homepage**
   - Go to: Pages → Add New
   - Title: "Homepage"
   - Template: "Homepage"
   - Publish

2. **Create About Page**
   - Go to: Pages → Add New
   - Title: "About Us"
   - Template: "About Us"
   - Fill in ACF fields
   - Publish

3. **Create Services Page**
   - Go to: Pages → Add New
   - Title: "Services"
   - Template: "Services"
   - Fill in ACF fields
   - Publish

4. **Create Contact Page**
   - Go to: Pages → Add New
   - Title: "Contact"
   - Template: "Contact"
   - Fill in ACF fields
   - Publish

5. **Add Testimonials**
   - Go to: Testimonials → Add New
   - Create 3-4 sample testimonials
   - Fill in ACF fields (Author, Position, Company, Rating)

### Configure Navigation

1. **Create Menu**
   - Go to: Appearance → Menus
   - Create new menu: "Primary Navigation"
   - Add pages: Home, About, Services, Contact
   - Set location: "Primary Menu"

## 🔧 Customization

### Adding New Pages

1. **Create ACF Field Group**
   - Go to: Custom Fields → Add New
   - Create fields for your page
   - Set location rules

2. **Create Page Template**
   - Add template file in `public/wp-content/themes/headless-wp-theme/`
   - Template name: `page-yourpage.php`

3. **Add Frontend Page**
   - Create page in `frontend/src/app/yourpage/page.tsx`
   - Add API function in `frontend/src/lib/wordpress.ts`

### Adding New Custom Post Types

1. **Register CPT in Plugin**
   - Edit: `public/wp-content/plugins/headless-acf-setup/headless-acf-setup.php`
   - Add to `register_custom_post_types()` function

2. **Add ACF Fields**
   - Create field group for new CPT
   - Set location rules

3. **Add REST API Endpoint**
   - Add endpoint in plugin
   - Create frontend function

## 🚀 Deployment

### Backend Deployment

1. **Choose Hosting**
   - WordPress-compatible hosting (SiteGround, Bluehost, etc.)
   - Or VPS with PHP/MySQL

2. **Upload Files**
   - Upload `public` folder to web root
   - Update `wp-config.php` with production settings

3. **Configure Domain**
   - Point domain to hosting
   - Set up SSL certificate

### Frontend Deployment

1. **Build for Production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Platform**
   - **Vercel**: Connect GitHub repo, set environment variables
   - **Netlify**: Upload build folder, set environment variables
   - **AWS/GCP**: Deploy to cloud platform

3. **Update Environment Variables**
   - Set production WordPress URL
   - Configure analytics and other services

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS headers in `headless-optimizer` plugin
   - Verify frontend URL is allowed

2. **API Connection Issues**
   - Check WordPress URL in environment variables
   - Verify WordPress is running
   - Check REST API is enabled

3. **ACF Fields Not Showing**
   - Verify ACF plugin is activated
   - Check field group location rules
   - Clear ACF cache

4. **Build Errors**
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Check environment variables

### Debug Mode

Enable WordPress debug mode:
```php
// In wp-config.php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
```

## 📚 Next Steps

1. **Customize Design** - Update colors, fonts, layout
2. **Add Content** - Create pages, posts, testimonials
3. **Configure SEO** - Add meta tags, sitemap
4. **Set up Analytics** - Google Analytics, Search Console
5. **Add Features** - Blog, portfolio, e-commerce

## 🆘 Support

- Check the main README.md
- Review WordPress and Next.js documentation
- Create an issue in the repository

---

**Happy coding! 🎉**




