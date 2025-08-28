# 🎨 Site Identity Setup Guide

This guide explains how to set up your site identity (logo, site icon, title, and description) in WordPress, which will automatically appear in your headless frontend.

## 🎯 **What's Included**

Your headless WordPress setup now automatically uses:
- ✅ **Site Logo**: Uploaded logo from WordPress Customizer
- ✅ **Site Icon**: Favicon/site icon from WordPress Customizer  
- ✅ **Site Title**: Title from WordPress Settings
- ✅ **Site Description**: Tagline from WordPress Settings

## 🔧 **How to Set Up Site Identity**

### **1. Access WordPress Customizer**

1. **Login to WordPress Admin**
   - Go to `http://localhost:10010/wp-admin`
   - Login with your admin credentials

2. **Navigate to Customizer**
   - Go to **Appearance → Customize**
   - Or click **Customize** in the admin bar

### **2. Set Up Site Identity**

#### **A. Site Title & Tagline**
1. In the Customizer, click **Site Identity**
2. **Site Title**: Enter your company name (e.g., "Bismount")
3. **Tagline**: Enter your company description (e.g., "Business & Services WordPress Theme")
4. Click **Publish** to save

#### **B. Site Logo**
1. In **Site Identity**, find **Logo** section
2. Click **Select logo**
3. **Upload** a new logo or **Select** an existing one
4. **Recommended size**: 200x200px or larger
5. **Supported formats**: JPG, PNG, SVG
6. Click **Publish** to save

#### **C. Site Icon**
1. In **Site Identity**, find **Site Icon** section
2. Click **Select image**
3. **Upload** a new icon or **Select** an existing one
4. **Recommended size**: 512x512px (square)
5. **Supported formats**: JPG, PNG, ICO
6. Click **Publish** to save

### **3. Alternative: WordPress Settings**

You can also set these in **Settings → General**:

1. **Site Title**: Your website name
2. **Tagline**: Your website description
3. **WordPress Address (URL)**: Your WordPress URL
4. **Site Address (URL)**: Your frontend URL

## 🎨 **Logo Requirements**

### **Recommended Specifications:**
- **Format**: PNG, JPG, SVG
- **Size**: 200x200px minimum
- **Background**: Transparent or white
- **Style**: Clean, professional, readable

### **Examples:**
```
✅ Good: Clean logo with transparent background
✅ Good: Simple text-based logo
✅ Good: Icon + text combination
❌ Avoid: Complex logos with small text
❌ Avoid: Low-resolution images
```

## 🔍 **Testing Your Setup**

### **1. Check WordPress API**
```bash
# Test site identity API
curl http://localhost:10010/wp-json/wp/v2/settings | jq '{title, description, site_logo, site_icon}'
```

### **2. Check Frontend**
- Visit `http://localhost:3001`
- Check header and footer for your logo and title
- Verify site icon appears in browser tab

### **3. Expected API Response**
```json
{
  "title": "Your Company Name",
  "description": "Your company description",
  "site_logo": 123,
  "site_icon": 124,
  "url": "http://localhost:10010"
}
```

## 🚀 **How It Works**

### **Frontend Integration:**
1. **Header Component**: Fetches site identity on load
2. **Logo Display**: Shows uploaded logo, falls back to site icon, then text
3. **Title Display**: Shows site title from WordPress
4. **Footer Component**: Uses same site identity data

### **API Endpoints:**
- **Site Settings**: `/wp-json/wp/v2/settings`
- **Logo URL**: `/wp-json/wp/v2/media/{logo_id}`
- **Icon URL**: `/wp-json/wp/v2/media/{icon_id}`

### **Fallback System:**
1. **Primary**: Uploaded logo
2. **Secondary**: Site icon
3. **Tertiary**: Text logo with first letter

## 🎯 **Benefits**

### **For Content Editors:**
- ✅ **Easy Management**: Change logo/title in WordPress admin
- ✅ **No Code Required**: Visual interface in Customizer
- ✅ **Instant Updates**: Changes appear immediately
- ✅ **Consistent Branding**: Same across all pages

### **For Developers:**
- ✅ **Dynamic Content**: No hardcoded logos
- ✅ **API-Driven**: Automatic data fetching
- ✅ **Fallback System**: Graceful degradation
- ✅ **Performance Optimized**: Efficient image loading

## 🔧 **Troubleshooting**

### **Logo Not Showing:**
1. **Check API**: Verify logo ID in settings
2. **Check Permissions**: Ensure media is public
3. **Check Format**: Verify image format is supported
4. **Check Size**: Ensure image is not too large

### **Title Not Updating:**
1. **Clear Cache**: Refresh browser cache
2. **Check API**: Verify title in settings endpoint
3. **Check Permissions**: Ensure settings are readable

### **Icon Not Working:**
1. **Check Format**: Use ICO, PNG, or JPG
2. **Check Size**: Ensure 512x512px or larger
3. **Clear Browser Cache**: Icons are cached by browsers

## 📱 **Mobile Considerations**

### **Logo Display:**
- **Header**: Responsive logo sizing
- **Footer**: Consistent with header
- **Mobile**: Optimized for small screens

### **Performance:**
- **Lazy Loading**: Images load efficiently
- **Optimization**: Next.js Image component
- **Caching**: Browser and CDN caching

## 🎉 **Summary**

Your headless WordPress setup now provides:

- ✅ **Dynamic Logo Management**: Upload and change logos easily
- ✅ **Consistent Branding**: Same logo across header and footer
- ✅ **Professional Appearance**: Clean, modern logo display
- ✅ **User-Friendly**: Easy management in WordPress admin
- ✅ **Developer-Friendly**: API-driven, no hardcoded content

Set up your site identity once in WordPress, and it will automatically appear throughout your headless frontend! 🚀
