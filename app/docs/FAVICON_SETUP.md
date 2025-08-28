# 🎨 Favicon & Site Icon Setup Guide

This guide explains how to set up your favicon (site icon) in WordPress so it appears in the browser tab of your headless frontend.

## 🎯 **Current Issue**

The favicon is not showing because the site icon is not set in WordPress. Here's how to fix it:

## 🔧 **Method 1: WordPress Admin (Recommended)**

### **Step 1: Access WordPress Customizer**
1. **Login to WordPress Admin**
   - Go to `http://localhost:10010/wp-admin`
   - Login with your admin credentials

2. **Navigate to Customizer**
   - Go to **Appearance → Customize**
   - Or click **Customize** in the admin bar

### **Step 2: Set Up Site Identity**
1. In the Customizer, click **Site Identity**
2. **Site Title**: Enter "Bismount"
3. **Tagline**: Enter "Business & Services WordPress Theme"

### **Step 3: Upload Site Icon**
1. In **Site Identity**, find **Site Icon** section
2. Click **Select image**
3. **Upload** a new icon or **Select** an existing one
4. **Recommended size**: 512x512px (square)
5. **Supported formats**: JPG, PNG, ICO
6. Click **Publish** to save

### **Step 4: Upload Site Logo (Optional)**
1. In **Site Identity**, find **Logo** section
2. Click **Select logo**
3. **Upload** a new logo or **Select** an existing one
4. **Recommended size**: 200x200px or larger
5. Click **Publish** to save

## 🔧 **Method 2: Use Existing Media Files**

If you want to use existing media files, you can manually set them:

### **Available Media Files:**
- **ID 103**: icons8-favorite-50.png (Good for favicon)
- **ID 100**: logoipsum-367.png (Good for logo)

### **Set via WordPress Admin:**
1. Go to **Settings → General**
2. Set **Site Title** to "Bismount"
3. Set **Tagline** to "Business & Services WordPress Theme"

### **Set via Customizer:**
1. Go to **Appearance → Customize → Site Identity**
2. Select existing media files for logo and site icon

## 🔍 **Testing Your Setup**

### **1. Check WordPress API**
```bash
# Test site settings
curl http://localhost:10010/wp-json/wp/v2/settings | jq '{title, description, site_logo, site_icon}'
```

### **2. Expected Response**
```json
{
  "title": "Bismount",
  "description": "Business & Services WordPress Theme",
  "site_logo": 100,
  "site_icon": 103
}
```

### **3. Check Frontend**
- Visit `http://localhost:3001`
- Check browser tab for favicon
- Check header for logo
- Check footer for logo and title

## 🎨 **Favicon Requirements**

### **Recommended Specifications:**
- **Format**: PNG, JPG, ICO
- **Size**: 512x512px (square)
- **Style**: Simple, recognizable
- **Background**: Transparent or solid color

### **Examples:**
```
✅ Good: Simple icon with transparent background
✅ Good: Company logo in square format
✅ Good: Letter or symbol based icon
❌ Avoid: Complex images with small details
❌ Avoid: Low-resolution images
```

## 🚀 **How It Works**

### **Frontend Integration:**
1. **Layout Component**: Fetches site identity on server-side
2. **Metadata Generation**: Sets favicon in HTML head
3. **Dynamic Updates**: Changes appear immediately
4. **Fallback System**: Uses default favicon if none set

### **API Endpoints:**
- **Site Settings**: `/wp-json/wp/v2/settings`
- **Site Icon URL**: `/wp-json/wp/v2/media/{icon_id}`

### **Fallback System:**
1. **Primary**: WordPress site icon
2. **Secondary**: Default favicon.ico
3. **Tertiary**: Browser default

## 🔧 **Troubleshooting**

### **Favicon Not Showing:**
1. **Check WordPress**: Verify site icon is set in Customizer
2. **Check API**: Verify icon ID in settings endpoint
3. **Clear Cache**: Refresh browser cache
4. **Check Format**: Ensure image format is supported

### **Logo Not Showing:**
1. **Check WordPress**: Verify logo is set in Customizer
2. **Check API**: Verify logo ID in settings endpoint
3. **Check Permissions**: Ensure media is public
4. **Check Size**: Ensure image is not too large

### **Title Not Updating:**
1. **Check WordPress**: Verify title in Settings → General
2. **Check API**: Verify title in settings endpoint
3. **Clear Cache**: Refresh browser cache

## 📱 **Browser Support**

### **Favicon Support:**
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support

### **Icon Sizes:**
- **16x16**: Standard favicon
- **32x32**: High DPI favicon
- **192x192**: Android icon
- **512x512**: PWA icon

## 🎉 **Summary**

Your headless WordPress setup now supports:

- ✅ **Dynamic Favicon**: Set in WordPress, appears in browser tab
- ✅ **Dynamic Logo**: Set in WordPress, appears in header/footer
- ✅ **Dynamic Title**: Set in WordPress, appears in browser tab
- ✅ **Dynamic Description**: Set in WordPress, appears in meta tags
- ✅ **Automatic Updates**: Changes appear immediately
- ✅ **Fallback System**: Graceful degradation

Set up your site identity once in WordPress, and it will automatically appear throughout your headless frontend! 🚀
