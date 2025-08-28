# 🏠 **Complete Setup Instructions**

## **What We're Building:**
A content-rich homepage with multiple sections that you can manage from WordPress admin.

## **Step 1: Install ACF Free Plugin**

1. Go to WordPress admin: `http://localhost:10010/wp-admin/`
2. Navigate to **Plugins > Add New**
3. Search for "Advanced Custom Fields"
4. Install and activate the **FREE** version

## **Step 2: Create the Homepage**

1. In WordPress admin, go to **Pages > Add New**
2. Set the title as "Homepage"
3. In the **Page Attributes** section (on the right), select "Homepage Template" from the Template dropdown
4. Click **Publish**

## **Step 3: Add Homepage Content**

After publishing, you'll see new sections on the page editor:

### **Hero Section:**
- **Hero Title**: "Welcome to Our Company"
- **Hero Subtitle**: "We create amazing digital experiences"
- **CTA Button Text**: "Get Started"
- **CTA Button Link**: "/contact"
- **Background Image**: Upload a hero image

### **Services Section:**
- **Section Title**: "Our Services"
- **Section Subtitle**: "What we can do for you"

### **About Us Section:**
- **Section Title**: "About Us"
- **About Content**: Write your company description
- **About Image**: Upload a company image
- **Statistics**: Add 4 statistics (e.g., "500+ Projects", "50+ Clients", etc.)

### **Testimonials Section:**
- **Section Title**: "What Our Clients Say"

### **Client Logos Section:**
- **Section Title**: "Our Clients"

## **Step 4: Create Custom Post Types**

### **Create Services:**
1. Go to **Services > Add New** (new menu item)
2. Create a service:
   - **Title**: "Web Development"
   - **Content**: "Custom websites and applications"
   - **Icon**: "fas fa-code"
   - **Link**: "/services/web-development"
3. Repeat for other services

### **Create Testimonials:**
1. Go to **Testimonials > Add New**
2. Create a testimonial:
   - **Title**: "John Smith"
   - **Content**: "Amazing work and great service!"
   - **Author**: "John Smith"
   - **Position**: "CEO"
   - **Company**: "TechCorp"
   - **Rating**: 5
3. Repeat for other testimonials

### **Create Client Logos:**
1. Go to **Client Logos > Add New**
2. Create a client:
   - **Title**: "Company Name"
   - **Logo**: Upload company logo
   - **Link**: "https://company-website.com"
3. Repeat for other clients

## **Step 5: View Your Frontend**

1. Your Next.js frontend is running on: `http://localhost:3001`
2. Visit this URL to see your homepage with all the content
3. The frontend will automatically fetch and display all the content from WordPress

## **How It Works:**

- **WordPress Admin**: Where you manage content (like a CMS)
- **Next.js Frontend**: Where visitors see your website
- **ACF Fields**: Store structured content (hero, about, etc.)
- **Custom Post Types**: Store repeatable content (services, testimonials, clients)

## **Need Help?**

If you can't access WordPress admin, try:
- `http://127.0.0.1:10010/wp-admin/`
- Use Local by Flywheel app
- Try a different browser
