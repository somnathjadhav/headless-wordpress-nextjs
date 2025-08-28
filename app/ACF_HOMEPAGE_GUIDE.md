# 🏠 ACF Homepage Setup Guide (Free Version)

This guide will help you set up a content-rich homepage with multiple sections using ACF Free in your headless WordPress setup.

## 📋 **Prerequisites**

1. **ACF Free** installed and activated in WordPress
2. **Headless ACF Setup (Free Version)** plugin activated
3. **WordPress backend** running and accessible

## 🚀 **Step-by-Step Setup**

### **1. Install ACF Free**

1. Go to your WordPress admin: `http://localhost:10010/wp-admin`
2. Navigate to **Plugins > Add New**
3. Search for "Advanced Custom Fields"
4. Install and activate the plugin (Free version)

### **2. Create Homepage Template**

1. In WordPress admin, go to **Pages > Add New**
2. Create a new page called "Homepage"
3. In the **Page Attributes** section, set the template to "Homepage Template"
4. Publish the page

### **3. Create Custom Post Types**

The plugin automatically creates these custom post types:

- **Services**: For individual service items
- **Testimonials**: For customer testimonials
- **Client Logos**: For client company logos

You'll see these in your WordPress admin menu.

### **4. Configure ACF Fields**

The ACF fields are automatically created by our plugin. You'll see these sections in the page editor:

**Note**: Since we're using ACF Free (no repeater fields), we use Custom Post Types for repeatable content like Services, Testimonials, and Client Logos.

#### **Hero Section**
- **Hero Title** (required)
- **Hero Subtitle**
- **CTA Button Text**
- **CTA Button Link**
- **Background Image**

#### **Services Section**
- **Section Title**
- **Section Subtitle**
- **Services** (Custom Post Type)
  - Create individual "Service" posts
  - Each service has: Title, Description, Icon, Link

#### **About Us Section**
- **Section Title**
- **About Content** (WYSIWYG editor)
- **About Image**
- **Statistics** (4 individual fields)
  - Statistic 1: Number & Label
  - Statistic 2: Number & Label
  - Statistic 3: Number & Label
  - Statistic 4: Number & Label

#### **Testimonials Section**
- **Section Title**
- **Testimonials** (Custom Post Type)
  - Create individual "Testimonial" posts
  - Each testimonial has: Content, Author, Position, Company, Rating, Avatar

#### **Client Logos Section**
- **Section Title**
- **Client Logos** (Custom Post Type)
  - Create individual "Client Logo" posts
  - Each client has: Name, Logo, Website Link

### **5. Add FontAwesome Icons**

For service icons, add this to your `frontend/src/app/layout.tsx`:

```tsx
// Add this in the <head> section
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
/>
```

## 🎨 **Customizing the Design**

### **Colors and Branding**

Update the color scheme in your components:

```tsx
// In any section component, replace:
className="bg-blue-600" // Primary color
className="text-blue-600" // Primary text color
className="bg-gray-50" // Background color
```

### **Layout Adjustments**

Each section component can be customized:

- **HeroSection.tsx**: Full-screen hero with background image
- **ServicesSection.tsx**: Grid layout for services
- **AboutSection.tsx**: Two-column layout with image
- **TestimonialsSection.tsx**: Card-based testimonials
- **ClientsSection.tsx**: Logo grid

### **Responsive Design**

All components are mobile-responsive using Tailwind CSS classes:

- `md:grid-cols-2` - 2 columns on medium screens
- `lg:grid-cols-3` - 3 columns on large screens
- `text-4xl md:text-6xl` - Responsive text sizes

## 🔧 **API Endpoint**

The homepage data is available at:
```
GET /wp-json/headless/v1/homepage
```

**Response Structure:**
```json
{
  "id": 1,
  "title": "Homepage",
  "content": "Page content",
  "hero_section": {
    "title": "Hero Title",
    "subtitle": "Hero Subtitle",
    "cta_text": "Get Started",
    "cta_link": "/contact",
    "background_image": {
      "url": "http://...",
      "alt": "Hero Background",
      "width": 1920,
      "height": 1080
    }
  },
  "services_section": {
    "title": "Our Services",
    "subtitle": "What we offer",
    "services": [
      {
        "title": "Web Development",
        "description": "Custom websites",
        "icon": "fas fa-code",
        "link": "/services/web-development"
      }
    ]
  }
  // ... other sections
}
```

## 🚀 **Development Workflow**

### **1. Content Management**
1. Edit content in WordPress admin
2. Changes are immediately available via API
3. Frontend automatically reflects updates

### **2. Adding New Sections**
1. Add ACF fields in the WordPress plugin
2. Create corresponding TypeScript interfaces
3. Build React component
4. Add to homepage component

### **3. Styling Updates**
1. Modify Tailwind classes in components
2. Changes are hot-reloaded in development
3. No WordPress changes needed

## 🎯 **Example Content Setup**

### **Hero Section**
```
Title: "Transform Your Business with Our Solutions"
Subtitle: "We help businesses grow and succeed with innovative technology solutions."
CTA Text: "Get Started"
CTA Link: "/contact"
Background Image: [Upload hero background]
```

### **Services Section**
```
Title: "Our Services"
Subtitle: "We offer comprehensive solutions to help your business thrive."

Create Service Posts:
1. Go to Services > Add New
   - Title: "Web Development"
   - Content: "Custom websites and web applications"
   - Icon: "fas fa-code"
   - Link: "/services/web-development"

2. Go to Services > Add New
   - Title: "Digital Marketing"
   - Content: "Strategic marketing solutions"
   - Icon: "fas fa-chart-line"
   - Link: "/services/digital-marketing"
```

### **Testimonials Section**
```
Title: "What Our Clients Say"

Create Testimonial Posts:
1. Go to Testimonials > Add New
   - Title: "John Smith"
   - Content: "Working with this team has been amazing..."
   - Author: "John Smith"
   - Position: "CEO"
   - Company: "TechCorp"
   - Rating: 5
```

## 🔍 **Troubleshooting**

### **Common Issues**

1. **ACF fields not showing**
   - Ensure ACF Free is activated
   - Check if the page template is set correctly
   - Verify the plugin is activated

2. **Images not loading**
   - Check image URLs in WordPress media library
   - Ensure proper CORS headers
   - Verify image permissions

3. **API endpoint not working**
   - Check if the plugin is activated
   - Verify WordPress REST API is enabled
   - Check for any PHP errors

### **Debug Mode**

Enable WordPress debug mode in `wp-config.php`:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

## 📚 **Next Steps**

1. **Add more sections** (FAQ, Team, Portfolio)
2. **Implement animations** (Framer Motion, AOS)
3. **Add SEO optimization** (meta tags, structured data)
4. **Create section templates** for reusability
5. **Add content preview** in WordPress admin

## 🎉 **Benefits of This Setup**

✅ **Content Management**: Easy content updates in WordPress
✅ **Separation of Concerns**: Content in WP, presentation in Next.js
✅ **Performance**: Optimized frontend with static generation
✅ **Scalability**: Easy to add new sections and features
✅ **Developer Experience**: Type-safe with TypeScript
✅ **Design Flexibility**: Full control over styling and layout

Your content-rich homepage is now ready! 🚀
