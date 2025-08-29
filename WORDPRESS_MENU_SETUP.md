# WordPress Primary Menu Setup Guide

## Overview
Your Faust.js WordPress site now has a dynamic header menu that pulls from the WordPress primary menu. This allows you to manage your site navigation directly from the WordPress admin panel.

## How It Works

### 1. Menu API Route
- **Location**: `pages/api/menu.ts`
- **Function**: Fetches the primary menu from WordPress GraphQL
- **Caching**: 30-minute cache with stale-while-revalidate
- **Fallback**: Returns default menu items if WordPress menu is not available

### 2. WordPressMenu Component
- **Location**: `src/components/WordPressMenu.tsx`
- **Features**:
  - Fetches menu data from `/api/menu`
  - Supports desktop and mobile layouts
  - Handles dropdown menus (desktop only)
  - Converts WordPress URLs to Next.js paths
  - Loading and error states
  - Responsive design

### 3. Header Integration
- **Desktop**: Horizontal menu with dropdowns
- **Mobile**: Vertical menu with collapsible items
- **Fallback**: Default menu items if WordPress menu fails

## Setting Up the Primary Menu in WordPress

### Step 1: Access WordPress Admin
1. Go to your WordPress admin panel: `http://localhost:10013/wp-admin`
2. Login with your admin credentials

### Step 2: Create/Edit the Primary Menu
1. Navigate to **Appearance** → **Menus**
2. If no menu exists, click **"create a new menu"**
3. If a menu exists, select it from the dropdown

### Step 3: Configure Menu Location
1. In the **Menu Settings** section (usually at the bottom)
2. Check the box for **"Primary Menu"** or **"Primary"**
3. Click **"Save Menu"**

### Step 4: Add Menu Items
1. **Pages**: Add existing pages from the left panel
2. **Custom Links**: Add external URLs or custom paths
3. **Categories**: Add category pages
4. **Posts**: Add individual posts

### Step 5: Organize Menu Structure
1. **Drag and Drop**: Reorder menu items
2. **Indent**: Create sub-menus by indenting items
3. **Remove**: Delete unwanted items

### Step 6: Save the Menu
1. Click **"Save Menu"** to apply changes
2. The menu will automatically appear on your frontend

## Menu Features

### Desktop Menu
- **Horizontal Layout**: Items displayed in a row
- **Dropdown Menus**: Hover to reveal sub-menus
- **Smooth Transitions**: CSS animations for better UX
- **Responsive**: Adapts to different screen sizes

### Mobile Menu
- **Vertical Layout**: Items stacked vertically
- **Collapsible**: Toggle with hamburger menu
- **Sub-menus**: Indented under parent items
- **Touch-friendly**: Larger touch targets

### URL Handling
- **WordPress URLs**: Automatically converted to Next.js paths
- **External Links**: Preserved as-is
- **Relative Paths**: Handled correctly
- **Fallback**: Default to homepage if URL is invalid

## Menu Structure Example

```json
{
  "menu": {
    "id": "primary",
    "name": "Primary Menu",
    "menuItems": {
      "nodes": [
        {
          "id": "1",
          "label": "Home",
          "url": "http://localhost:10013/",
          "path": "/",
          "parentId": null
        },
        {
          "id": "2",
          "label": "About",
          "url": "http://localhost:10013/about/",
          "path": "/about",
          "parentId": null
        },
        {
          "id": "3",
          "label": "Services",
          "url": "http://localhost:10013/services/",
          "path": "/services",
          "parentId": null,
          "childItems": {
            "nodes": [
              {
                "id": "4",
                "label": "Web Development",
                "url": "http://localhost:10013/services/web-development/",
                "path": "/services/web-development",
                "parentId": "3"
              }
            ]
          }
        }
      ]
    }
  }
}
```

## Troubleshooting

### Menu Not Appearing
1. **Check Menu Location**: Ensure "Primary Menu" is selected
2. **Verify Menu Items**: Add at least one menu item
3. **Save Menu**: Click "Save Menu" after making changes
4. **Clear Cache**: Refresh your frontend page

### Menu Items Not Working
1. **Check URLs**: Verify menu item URLs are correct
2. **Page Exists**: Ensure linked pages exist in WordPress
3. **Permissions**: Check if pages are published and public

### API Errors
1. **GraphQL Active**: Ensure WPGraphQL plugin is active
2. **Menu Permissions**: Check if menu is publicly accessible
3. **Network Issues**: Verify WordPress is running on port 10013

## Customization

### Styling
- **CSS Classes**: Add custom classes in WordPress menu items
- **Tailwind**: Use Tailwind classes for styling
- **Theme Colors**: Menu inherits theme colors automatically

### Functionality
- **Custom Hooks**: Add custom functionality to menu items
- **Conditional Display**: Show/hide menu items based on conditions
- **Dynamic Content**: Integrate with other WordPress data

## Performance

### Caching
- **API Cache**: 30-minute cache for menu data
- **Browser Cache**: Leverages browser caching
- **CDN Ready**: Compatible with CDN caching

### Optimization
- **Lazy Loading**: Menu loads only when needed
- **Minimal Requests**: Single API call for entire menu
- **Error Handling**: Graceful fallbacks for better UX

## Next Steps

1. **Set up your primary menu** in WordPress admin
2. **Add your pages and links** to the menu
3. **Test the menu** on both desktop and mobile
4. **Customize styling** if needed
5. **Add more menu locations** if required

Your dynamic WordPress menu is now ready to use! 🎉
