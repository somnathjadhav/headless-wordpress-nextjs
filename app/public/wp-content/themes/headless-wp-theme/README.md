# Headless WordPress Theme

A minimal WordPress theme designed specifically for headless CMS functionality. This theme provides the necessary templates and functionality for WordPress backend while the frontend is handled by Next.js.

## Features

- **Minimal Design**: Clean, simple design focused on content management
- **REST API Optimized**: Enhanced REST API responses for headless frontend
- **CORS Support**: Built-in CORS headers for local development
- **Custom Image Sizes**: Optimized image sizes for different use cases
- **SEO Friendly**: Proper meta tags and structured data
- **Responsive**: Mobile-friendly design
- **Admin Notices**: Helpful notices about headless setup

## File Structure

```
headless-wp-theme/
├── style.css              # Main stylesheet with theme information
├── index.php              # Main template file
├── header.php             # Header template
├── footer.php             # Footer template
├── functions.php          # Theme functions and setup
├── single.php             # Single post template
├── page.php               # Page template
├── 404.php                # 404 error page
├── searchform.php         # Search form template
└── README.md              # This file
```

## Installation

1. Upload the theme folder to `/wp-content/themes/`
2. Activate the theme in WordPress Admin → Appearance → Themes
3. Configure your headless frontend to use the WordPress REST API

## REST API Enhancements

The theme includes several REST API enhancements:

- **Featured Image URLs**: Added `featured_image_url` field to post responses
- **CORS Headers**: Allows requests from `http://localhost:3000`
- **Custom Fields**: Enhanced support for ACF fields

## Custom Image Sizes

- `headless-thumbnail`: 300x200px (cropped)
- `headless-medium`: 600x400px (cropped)
- `headless-large`: 1200x800px (cropped)

## Frontend Integration

This theme is designed to work with a Next.js frontend. The frontend should:

1. Fetch content from `/wp-json/wp/v2/` endpoints
2. Handle routing and presentation
3. Use the WordPress admin for content management

## Development

### Local Development Setup

1. **WordPress Backend**: http://localhost:10010
2. **Next.js Frontend**: http://localhost:3000
3. **WordPress Admin**: http://localhost:10010/wp-admin/

### API Endpoints

- Posts: `/wp-json/wp/v2/posts`
- Pages: `/wp-json/wp/v2/pages`
- Testimonials: `/wp-json/wp/v2/testimonial`
- Services: `/wp-json/wp/v2/service`
- Client Logos: `/wp-json/wp/v2/client_logo`

## Customization

### Adding Custom Post Types

Custom post types are handled by the `headless-acf-setup` plugin. To add new post types:

1. Edit `/wp-content/plugins/headless-acf-setup/headless-acf-setup.php`
2. Add new post type registration in `register_custom_post_types()`
3. Add ACF fields in `register_acf_fields()`
4. Add REST API modifications in `add_acf_to_rest_api()`

### Styling

The theme uses a minimal CSS approach. To customize:

1. Edit `style.css` for basic styling
2. Add custom CSS in WordPress Admin → Appearance → Customize
3. For major changes, consider creating a child theme

## Support

This theme is designed for headless WordPress setups. For questions about:

- **WordPress Backend**: Check WordPress documentation
- **Next.js Frontend**: Check Next.js documentation
- **REST API**: Check WordPress REST API documentation

## License

This theme is open source and available under the MIT License.




