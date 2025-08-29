<?php
/**
 * GeneratePress child theme functions and definitions.
 *
 * Add your custom PHP in this file.
 * Only edit this file if you have direct access to it on your server (to fix errors if they happen).
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Fix GeneratePress Plugin Conflicts
 * Handle plugin errors and disable problematic features for headless setup
 */

// Disable GeneratePress content width plugin for headless
function disable_generatepress_content_width() {
    if (class_exists('GeneratePress_Pro')) {
        remove_action('wp_enqueue_scripts', 'generatepress_pro_content_width_css');
        remove_action('wp_head', 'generatepress_pro_content_width_css');
    }
}
add_action('init', 'disable_generatepress_content_width', 20);

// Disable GeneratePress elements that might cause conflicts
function disable_generatepress_elements() {
    // Remove GeneratePress Elements
    if (class_exists('GeneratePress_Elements')) {
        remove_action('wp_enqueue_scripts', 'generatepress_elements_css');
        remove_action('wp_head', 'generatepress_elements_css');
    }
    
    // Remove GeneratePress Pro features
    if (class_exists('GeneratePress_Pro')) {
        remove_action('wp_enqueue_scripts', 'generatepress_pro_css');
        remove_action('wp_head', 'generatepress_pro_css');
    }
}
add_action('init', 'disable_generatepress_elements', 20);

// Disable GeneratePress hooks that might cause errors
function disable_generatepress_hooks() {
    // Remove all GeneratePress hooks that might conflict
    remove_all_actions('generate_before_header');
    remove_all_actions('generate_after_header');
    remove_all_actions('generate_before_footer');
    remove_all_actions('generate_after_footer');
    remove_all_actions('generate_inside_header');
    remove_all_actions('generate_inside_footer');
}
add_action('init', 'disable_generatepress_hooks', 30);

/**
 * Header & Footer Customizer Settings
 * Add header and footer options to WordPress theme customizer
 */

function add_header_footer_customizer_settings($wp_customize) {
    // Header Section
    $wp_customize->add_section('header_settings', array(
        'title' => __('Header Settings', 'generatepress-child'),
        'priority' => 30,
    ));

    // Dark Logo Upload
    $wp_customize->add_setting('dark_logo', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'dark_logo', array(
        'label' => __('Dark Mode Logo', 'generatepress-child'),
        'description' => __('Upload a white/light version of your logo for dark mode', 'generatepress-child'),
        'section' => 'header_settings',
        'settings' => 'dark_logo',
        'priority' => 10,
    )));

    // Light Logo Upload
    $wp_customize->add_setting('header_logo', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'header_logo', array(
        'label' => __('Light Mode Logo', 'generatepress-child'),
        'description' => __('Upload a logo for light mode (dark version)', 'generatepress-child'),
        'section' => 'header_settings',
        'settings' => 'header_logo',
        'priority' => 11,
    )));

    // Separator after logo settings
    $wp_customize->add_setting('header_logo_separator', array(
        'default' => '',
        'sanitize_callback' => '__return_empty_string',
    ));

    $wp_customize->add_control('header_logo_separator', array(
        'label' => '',
        'section' => 'header_settings',
        'type' => 'hidden',
        'priority' => 12,
    ));

    // CTA Button Text
    $wp_customize->add_setting('header_cta_text', array(
        'default' => 'Free consultation',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('header_cta_text', array(
        'label' => __('CTA Button Text', 'generatepress-child'),
        'section' => 'header_settings',
        'type' => 'text',
        'priority' => 20,
    ));

    // CTA Button Link
    $wp_customize->add_setting('header_cta_link', array(
        'default' => '/contact',
        'sanitize_callback' => 'esc_url_raw',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('header_cta_link', array(
        'label' => __('CTA Button Link', 'generatepress-child'),
        'section' => 'header_settings',
        'type' => 'url',
    ));

    // Phone Number
    $wp_customize->add_setting('header_phone', array(
        'default' => '+1 234 567 8910',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('header_phone', array(
        'label' => __('Phone Number', 'generatepress-child'),
        'section' => 'header_settings',
        'type' => 'text',
    ));

    // Top Bar Text
    $wp_customize->add_setting('top_bar_text', array(
        'default' => 'Our accounting experts waiting for you! Contact now',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('top_bar_text', array(
        'label' => __('Top Bar Text', 'generatepress-child'),
        'section' => 'header_settings',
        'type' => 'text',
    ));

    // Address
    $wp_customize->add_setting('header_address', array(
        'default' => 'Broadway, 24th Floor, San Francisco',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('header_address', array(
        'label' => __('Address', 'generatepress-child'),
        'section' => 'header_settings',
        'type' => 'text',
    ));

    // Footer Section
    $wp_customize->add_section('footer_settings', array(
        'title' => __('Footer Settings', 'generatepress-child'),
        'priority' => 31,
    ));

    // Footer Logo
    $wp_customize->add_setting('footer_logo', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'footer_logo', array(
        'label' => __('Footer Logo', 'generatepress-child'),
        'section' => 'footer_settings',
        'settings' => 'footer_logo',
    )));

    // Footer Description
    $wp_customize->add_setting('footer_description', array(
        'default' => 'We are dedicated to providing amazing business accounting services and client service.',
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('footer_description', array(
        'label' => __('Footer Description', 'generatepress-child'),
        'section' => 'footer_settings',
        'type' => 'textarea',
    ));

    // Social Links
    $social_platforms = array(
        'facebook' => 'Facebook',
        'twitter' => 'Twitter',
        'linkedin' => 'LinkedIn',
        'instagram' => 'Instagram',
        'youtube' => 'YouTube',
    );

    foreach ($social_platforms as $platform => $label) {
        $wp_customize->add_setting("social_{$platform}", array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
            'transport' => 'postMessage',
        ));

        $wp_customize->add_control("social_{$platform}", array(
            'label' => __("{$label} URL", 'generatepress-child'),
            'section' => 'footer_settings',
            'type' => 'url',
        ));
    }

    // Copyright Text
    $wp_customize->add_setting('copyright_text', array(
        'default' => '© 2024 Accounto. All rights reserved.',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('copyright_text', array(
        'label' => __('Copyright Text', 'generatepress-child'),
        'section' => 'footer_settings',
        'type' => 'text',
    ));

    // Upper Footer Content
    $wp_customize->add_setting('upper_footer_content', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('upper_footer_content', array(
        'label' => __('Upper Footer Content', 'generatepress-child'),
        'section' => 'footer_settings',
        'type' => 'textarea',
        'description' => __('HTML allowed. Use for announcements, highlights, or widgets.', 'generatepress-child'),
    ));
}
add_action('customize_register', 'add_header_footer_customizer_settings');

// Add REST API endpoints for header and footer settings
function register_header_footer_rest_api() {
    register_rest_route('wp/v2', '/header-settings', array(
        'methods' => 'GET',
        'callback' => 'get_header_settings',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('wp/v2', '/footer-settings', array(
        'methods' => 'GET',
        'callback' => 'get_footer_settings',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'register_header_footer_rest_api');

function get_header_settings() {
    return array(
        'logo' => get_theme_mod('header_logo', ''),
        'logo_dark' => get_theme_mod('dark_logo', ''),
        'site_title' => get_bloginfo('name'),
        'cta_text' => get_theme_mod('header_cta_text', 'Free consultation'),
        'cta_link' => get_theme_mod('header_cta_link', '/contact'),
        'phone' => get_theme_mod('header_phone', '+1 234 567 8910'),
        'top_bar_text' => get_theme_mod('top_bar_text', 'Our accounting experts waiting for you! Contact now'),
        'address' => get_theme_mod('header_address', 'Broadway, 24th Floor, San Francisco'),
    );
}

function get_footer_settings() {
    $social_links = array();
    $social_platforms = array('facebook', 'twitter', 'linkedin', 'instagram', 'youtube');
    
    foreach ($social_platforms as $platform) {
        $url = get_theme_mod("social_{$platform}", '');
        if (!empty($url)) {
            $social_links[$platform] = $url;
        }
    }

    return array(
        'logo' => get_theme_mod('footer_logo', ''),
        'description' => get_theme_mod('footer_description', 'We are dedicated to providing amazing business accounting services and client service.'),
        'social_links' => $social_links,
        'copyright_text' => get_theme_mod('copyright_text', '© 2024 Accounto. All rights reserved.'),
        'upper_footer_content' => get_theme_mod('upper_footer_content', ''),
    );
}

/**
 * Convert WordPress URLs to Next.js Frontend URLs
 * Replace WordPress domain with Next.js frontend domain
 */
function convert_to_frontend_url($url) {
    // Get WordPress site URL
    $wp_site_url = get_site_url();
    
    // Define frontend URL (Next.js)
    $frontend_url = 'http://localhost:3000';
    
    // If the URL is a WordPress URL, convert it to frontend URL
    if (strpos($url, $wp_site_url) === 0) {
        // Remove WordPress domain and get the path
        $path = str_replace($wp_site_url, '', $url);
        
        // Handle different URL patterns
        if (empty($path) || $path === '/') {
            return $frontend_url . '/';
        }
        
        // Handle WordPress pages
        if (strpos($path, '/page/') === 0) {
            // Convert /page/about to /about
            $path = str_replace('/page/', '/', $path);
        }
        
        // Handle WordPress posts
        if (strpos($path, '/?p=') === 0) {
            // Convert /?p=123 to /posts/123
            $post_id = str_replace('/?p=', '', $path);
            return $frontend_url . '/posts/' . $post_id;
        }
        
        // Handle WordPress post URLs
        if (preg_match('/\/(\d{4})\/(\d{2})\/(\d{2})\/([^\/]+)\/?$/', $path, $matches)) {
            // Convert /2024/01/15/post-slug to /posts/post-slug
            $slug = $matches[4];
            return $frontend_url . '/posts/' . $slug;
        }
        
        // Handle category and tag URLs
        if (strpos($path, '/category/') === 0) {
            // Convert /category/news to /category/news
            return $frontend_url . $path;
        }
        
        if (strpos($path, '/tag/') === 0) {
            // Convert /tag/accounting to /tag/accounting
            return $frontend_url . $path;
        }
        
        // For other pages, just append the path
        return $frontend_url . $path;
    }
    
    // If it's already an external URL or frontend URL, return as is
    if (strpos($url, 'http') === 0 && strpos($url, $wp_site_url) !== 0) {
        return $url;
    }
    
    // If it's a relative URL, make it absolute to frontend
    if (strpos($url, '/') === 0) {
        return $frontend_url . $url;
    }
    
    // For any other case, return the original URL
    return $url;
}

// Add REST API endpoint for primary menu
function register_primary_menu_rest_api() {
    register_rest_route('wp/v2', '/primary-menu', array(
        'methods' => 'GET',
        'callback' => 'get_primary_menu',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'register_primary_menu_rest_api');

function get_primary_menu() {
    $menu_locations = get_nav_menu_locations();
    $primary_menu_id = $menu_locations['primary'] ?? null;
    
    if (!$primary_menu_id) {
        return array(
            'items' => array(),
            'message' => 'No primary menu found'
        );
    }
    
    $menu_items = wp_get_nav_menu_items($primary_menu_id);
    
    if (!$menu_items) {
        return array(
            'items' => array(),
            'message' => 'Menu items not found'
        );
    }
    
    $formatted_items = array();
    
    foreach ($menu_items as $item) {
        // Convert WordPress URLs to Next.js frontend URLs
        $frontend_url = convert_to_frontend_url($item->url);
        
        $menu_item = array(
            'id' => $item->ID,
            'title' => $item->title,
            'url' => $frontend_url,
            'target' => $item->target,
            'classes' => $item->classes,
            'menu_item_parent' => $item->menu_item_parent,
            'order' => $item->menu_order,
        );
        
        // Check if this item has children
        $children = array();
        foreach ($menu_items as $child_item) {
            if ($child_item->menu_item_parent == $item->ID) {
                // Convert WordPress URLs to Next.js frontend URLs for children too
                $child_frontend_url = convert_to_frontend_url($child_item->url);
                
                $children[] = array(
                    'id' => $child_item->ID,
                    'title' => $child_item->title,
                    'url' => $child_frontend_url,
                    'target' => $child_item->target,
                    'classes' => $child_item->classes,
                    'order' => $child_item->menu_order,
                );
            }
        }
        
        if (!empty($children)) {
            $menu_item['children'] = $children;
        }
        
        $formatted_items[] = $menu_item;
    }
    
    return array(
        'items' => $formatted_items,
        'menu_id' => $primary_menu_id,
        'menu_name' => wp_get_nav_menu_object($primary_menu_id)->name ?? 'Primary Menu'
    );
}

// Add REST API endpoint for footer menus
function register_footer_menus_rest_api() {
    register_rest_route('wp/v2', '/footer-menus', array(
        'methods' => 'GET',
        'callback' => 'get_footer_menus',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'register_footer_menus_rest_api');

function get_footer_menus() {
    $menu_locations = get_nav_menu_locations();
    $footer_menus = array();
    
    // Get footer menu locations (footer-1, footer-2, footer-3, footer-bottom)
    $footer_locations = array('footer-1', 'footer-2', 'footer-3', 'footer-bottom');
    
    foreach ($footer_locations as $location) {
        $menu_id = $menu_locations[$location] ?? null;
        
        if ($menu_id) {
            $menu_items = wp_get_nav_menu_items($menu_id);
            $formatted_items = array();
            
            if ($menu_items) {
                foreach ($menu_items as $item) {
                    // Convert WordPress URLs to Next.js frontend URLs
                    $frontend_url = convert_to_frontend_url($item->url);
                    
                    $formatted_items[] = array(
                        'id' => $item->ID,
                        'title' => $item->title,
                        'url' => $frontend_url,
                        'target' => $item->target,
                        'classes' => $item->classes,
                        'order' => $item->menu_order,
                    );
                }
            }
            
            $footer_menus[$location] = array(
                'items' => $formatted_items,
                'menu_id' => $menu_id,
                'menu_name' => wp_get_nav_menu_object($menu_id)->name ?? ucfirst(str_replace('-', ' ', $location))
            );
        } else {
            $footer_menus[$location] = array(
                'items' => array(),
                'menu_id' => null,
                'menu_name' => ucfirst(str_replace('-', ' ', $location))
            );
        }
    }
    
    return $footer_menus;
}

/**
 * Register Footer Menu Locations
 * Add footer menu locations to WordPress - Including Footer Bottom
 */
function register_footer_menu_locations() {
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'generatepress-child'),
        'footer-1' => __('Footer Menu 1 (Company)', 'generatepress-child'),
        'footer-2' => __('Footer Menu 2 (Services)', 'generatepress-child'),
        'footer-3' => __('Footer Menu 3 (Support)', 'generatepress-child'),
        'footer-bottom' => __('Footer Bottom', 'generatepress-child'),
    ));
}
add_action('after_setup_theme', 'register_footer_menu_locations');

/**
 * Remove old "Footer" menu location
 * Unregister any existing "Footer" location that might be registered by parent theme
 */
function remove_old_footer_menu_location() {
    // Get all registered menu locations
    $locations = get_nav_menu_locations();
    
    // If there's an old "Footer" location, unregister it
    if (isset($locations['footer'])) {
        unset($locations['footer']);
        set_theme_mod('nav_menu_locations', $locations);
    }
}
add_action('after_setup_theme', 'remove_old_footer_menu_location', 15);

/**
 * Filter menu locations to remove old "Footer" option
 */
function filter_menu_locations($locations) {
    // Remove any "Footer" location from the locations array
    if (isset($locations['footer'])) {
        unset($locations['footer']);
    }
    return $locations;
}
add_filter('wp_get_nav_menus', 'filter_menu_locations');

/**
 * SVG Support Functions
 * Enable SVG uploads in WordPress
 */

// Allow SVG uploads
function allow_svg_upload($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_upload');

// Sanitize SVG uploads
function sanitize_svg($file) {
    if ($file['type'] === 'image/svg+xml') {
        if (!function_exists('simplexml_load_file')) {
            return $file;
        }
        
        // Check if file is actually an SVG
        $file_content = file_get_contents($file['tmp_name']);
        if (strpos($file_content, '<svg') === false) {
            return new WP_Error('invalid_svg', 'The uploaded file is not a valid SVG.');
        }
        
        // Basic SVG sanitization
        $file_content = preg_replace('/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/mi', '', $file_content);
        $file_content = preg_replace('/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/mi', '', $file_content);
        $file_content = preg_replace('/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/mi', '', $file_content);
        $file_content = preg_replace('/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/mi', '', $file_content);
        
        // Write sanitized content back to file
        file_put_contents($file['tmp_name'], $file_content);
    }
    
    return $file;
}
add_filter('wp_handle_upload_prefilter', 'sanitize_svg');

// Fix SVG display in media library
function fix_svg_display() {
    echo '<style>
        .attachment-266x266, .thumbnail img {
            width: 100% !important;
            height: auto !important;
        }
        .wp-admin .attachment-preview .thumbnail {
            width: 100% !important;
            height: auto !important;
        }
    </style>';
}
add_action('admin_head', 'fix_svg_display');

// Generate thumbnail for SVG files
function generate_svg_thumbnail($metadata, $attachment_id) {
    $attachment = get_post($attachment_id);
    
    if ($attachment && $attachment->post_mime_type === 'image/svg+xml') {
        $file_path = get_attached_file($attachment_id);
        
        if (file_exists($file_path)) {
            // Create a simple thumbnail representation
            $upload_dir = wp_upload_dir();
            $file_name = basename($file_path, '.svg');
            $thumbnail_path = $upload_dir['path'] . '/' . $file_name . '-thumb.png';
            
            // Generate a simple PNG thumbnail (you might want to use a more sophisticated approach)
            $svg_content = file_get_contents($file_path);
            if ($svg_content) {
                // Create a simple colored rectangle as thumbnail
                $width = 150;
                $height = 150;
                $image = imagecreatetruecolor($width, $height);
                $bg_color = imagecolorallocate($image, 240, 240, 240);
                $svg_color = imagecolorallocate($image, 100, 150, 200);
                
                imagefill($image, 0, 0, $bg_color);
                imagerectangle($image, 10, 10, $width-10, $height-10, $svg_color);
                imagestring($image, 3, $width/2-20, $height/2-5, 'SVG', $svg_color);
                
                imagepng($image, $thumbnail_path);
                imagedestroy($image);
                
                // Update metadata
                $metadata['sizes']['thumbnail'] = array(
                    'file' => $file_name . '-thumb.png',
                    'width' => $width,
                    'height' => $height,
                    'mime-type' => 'image/png'
                );
            }
        }
    }
    
    return $metadata;
}
add_filter('wp_generate_attachment_metadata', 'generate_svg_thumbnail', 10, 2);

/**
 * Headless WordPress Setup
 * Disables frontend features and optimizes for headless usage
 */

// Disable frontend features for headless setup
function headless_wordpress_setup() {
    // Remove unnecessary frontend features
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    
    // Disable XML-RPC
    add_filter('xmlrpc_enabled', '__return_false');
    
    // Remove emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Disable REST API discovery
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('template_redirect', 'rest_output_link_header', 11);
}
add_action('init', 'headless_wordpress_setup');

// Disable frontend theme features
function disable_frontend_features() {
    // Remove theme customizer
    remove_action('customize_register', 'generate_customize_register');
    
    // Disable frontend styles and scripts
    if (!is_admin()) {
        wp_dequeue_style('generate-style');
        wp_dequeue_style('generate-style-grid');
        wp_dequeue_script('generate-navigation');
    }
}
add_action('wp_enqueue_scripts', 'disable_frontend_features', 100);

// Add CORS headers for GraphQL
function add_cors_headers() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
}
add_action('init', 'add_cors_headers');

// Disable frontend redirects
function disable_frontend_redirects() {
    return false;
}
add_filter('redirect_canonical', 'disable_frontend_redirects');

// Optimize for headless usage
function headless_optimizations() {
    // Remove unnecessary meta boxes
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
    remove_meta_box('dashboard_primary', 'dashboard', 'side');
    remove_meta_box('dashboard_secondary', 'dashboard', 'side');
}
add_action('admin_init', 'headless_optimizations');

// Add custom image sizes for headless frontend
function add_headless_image_sizes() {
    add_image_size('headless-thumbnail', 400, 300, true);
    add_image_size('headless-medium', 800, 600, true);
    add_image_size('headless-large', 1200, 800, true);
}
add_action('after_setup_theme', 'add_headless_image_sizes');

// Disable frontend theme features
function disable_theme_features() {
    // Remove theme support for features not needed in headless
    remove_theme_support('custom-background');
    remove_theme_support('custom-header');
    remove_theme_support('custom-logo');
    remove_theme_support('post-formats');
}
add_action('after_setup_theme', 'disable_theme_features', 20);

// Add support for dark logo in header settings
function add_dark_logo_support() {
    // Add customizer section for dark logo
    add_action('customize_register', function($wp_customize) {
        // Add section for header settings
        $wp_customize->add_section('header_settings', array(
            'title' => 'Header Settings',
            'priority' => 30,
        ));

        // Add setting for dark logo
        $wp_customize->add_setting('dark_logo', array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));

        // Add control for dark logo
        $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'dark_logo', array(
            'label' => 'Dark Mode Logo',
            'description' => 'Upload a logo for dark mode (white/light version)',
            'section' => 'header_settings',
            'settings' => 'dark_logo',
        )));
    });
}
add_action('after_setup_theme', 'add_dark_logo_support');

// Add dark logo to REST API
function add_dark_logo_to_api() {
    register_rest_field('header-settings', 'logo_dark', array(
        'get_callback' => function() {
            return get_theme_mod('dark_logo', '');
        },
        'schema' => array(
            'description' => 'Dark mode logo URL',
            'type' => 'string',
        ),
    ));
}
add_action('rest_api_init', 'add_dark_logo_to_api');

/**
 * Contact Form API Endpoints
 * Handle contact form submissions and data
 */

// Add REST API endpoint for contact data
function register_contact_data_rest_api() {
    register_rest_route('wp/v2', '/contact-data', array(
        'methods' => 'GET',
        'callback' => 'get_contact_data',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'register_contact_data_rest_api');

function get_contact_data() {
    return array(
        'title' => get_theme_mod('contact_title', 'Contact Us'),
        'subtitle' => get_theme_mod('contact_subtitle', 'Have questions, suggestions, or want to contribute? We\'d love to hear from you!'),
        'description' => get_theme_mod('contact_description', "We're here to help you with any questions about our blog content or if you'd like to contribute."),
        'address' => get_theme_mod('contact_address', 'Digital World'),
        'phone' => get_theme_mod('contact_phone', '+1 234 567 8910'),
        'email' => get_theme_mod('contact_email', 'hello@blog.com'),
        'business_hours' => get_theme_mod('contact_business_hours', 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM'),
        'map_embed' => get_theme_mod('contact_map_embed', ''),
        'form_title' => get_theme_mod('contact_form_title', 'Send us a Message'),
        'form_description' => get_theme_mod('contact_form_description', 'Fill out the form below and we\'ll get back to you as soon as possible.'),
        'office_locations' => get_theme_mod('contact_office_locations', array(
            array(
                'name' => 'Main Office',
                'address' => 'Digital World',
                'phone' => '+1 234 567 8910',
                'email' => 'hello@blog.com'
            )
        ))
    );
}

// Add REST API endpoint for contact form submissions
function register_contact_submission_rest_api() {
    register_rest_route('wp/v2', '/contact-submission', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_submission',
        'permission_callback' => '__return_true',
        'args' => array(
            'firstName' => array(
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'lastName' => array(
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'email' => array(
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_email',
            ),
            'phone' => array(
                'required' => false,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'company' => array(
                'required' => false,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'service' => array(
                'required' => false,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'message' => array(
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_textarea_field',
            ),
        ),
    ));
}
add_action('rest_api_init', 'register_contact_submission_rest_api');

function handle_contact_submission($request) {
    $params = $request->get_params();
    
    // Validate required fields
    if (empty($params['firstName']) || empty($params['lastName']) || empty($params['email']) || empty($params['message'])) {
        return new WP_Error('missing_fields', 'Required fields are missing', array('status' => 400));
    }
    
    // Validate email
    if (!is_email($params['email'])) {
        return new WP_Error('invalid_email', 'Invalid email address', array('status' => 400));
    }
    
    // Create post data for contact submission
    $post_data = array(
        'post_title' => 'Contact Form Submission - ' . $params['firstName'] . ' ' . $params['lastName'],
        'post_content' => sprintf(
            "Name: %s %s\nEmail: %s\nPhone: %s\nCompany: %s\nService: %s\nMessage: %s",
            $params['firstName'],
            $params['lastName'],
            $params['email'],
            $params['phone'] ?? 'Not provided',
            $params['company'] ?? 'Not provided',
            $params['service'] ?? 'Not specified',
            $params['message']
        ),
        'post_status' => 'private',
        'post_type' => 'contact_submission',
        'meta_input' => array(
            'contact_first_name' => $params['firstName'],
            'contact_last_name' => $params['lastName'],
            'contact_email' => $params['email'],
            'contact_phone' => $params['phone'] ?? '',
            'contact_company' => $params['company'] ?? '',
            'contact_service' => $params['service'] ?? '',
            'contact_message' => $params['message'],
            'contact_date' => current_time('mysql'),
            'contact_ip' => $_SERVER['REMOTE_ADDR'] ?? '',
        )
    );
    
    // Insert the post
    $post_id = wp_insert_post($post_data);
    
    if (is_wp_error($post_id)) {
        return new WP_Error('submission_failed', 'Failed to save contact submission', array('status' => 500));
    }
    
    // Send email notification (optional)
    $admin_email = get_option('admin_email');
    $site_name = get_bloginfo('name');
    
    $email_subject = sprintf('[%s] New Contact Form Submission', $site_name);
    $email_body = sprintf(
        "A new contact form submission has been received:\n\n" .
        "Name: %s %s\n" .
        "Email: %s\n" .
        "Phone: %s\n" .
        "Company: %s\n" .
        "Service: %s\n" .
        "Message: %s\n\n" .
        "Submitted on: %s\n" .
        "IP Address: %s",
        $params['firstName'],
        $params['lastName'],
        $params['email'],
        $params['phone'] ?? 'Not provided',
        $params['company'] ?? 'Not provided',
        $params['service'] ?? 'Not specified',
        $params['message'],
        current_time('mysql'),
        $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
    );
    
    wp_mail($admin_email, $email_subject, $email_body);
    
    return array(
        'success' => true,
        'message' => 'Thank you for your message. We will get back to you soon!',
        'submission_id' => $post_id
    );
}

// Register custom post type for contact submissions
function register_contact_submission_post_type() {
    $labels = array(
        'name' => 'Contact Submissions',
        'singular_name' => 'Contact Submission',
        'menu_name' => 'Contact Submissions',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Submission',
        'edit_item' => 'Edit Submission',
        'new_item' => 'New Submission',
        'view_item' => 'View Submission',
        'search_items' => 'Search Submissions',
        'not_found' => 'No submissions found',
        'not_found_in_trash' => 'No submissions found in trash',
    );
    
    $args = array(
        'labels' => $labels,
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'rewrite' => false,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-email-alt',
        'show_in_rest' => false,
    );
    
    register_post_type('contact_submission', $args);
}
add_action('init', 'register_contact_submission_post_type');

// Add customizer settings for contact page
function add_contact_customizer_settings($wp_customize) {
    // Contact Section
    $wp_customize->add_section('contact_settings', array(
        'title' => __('Contact Settings', 'generatepress-child'),
        'priority' => 32,
    ));

    // Contact Title
    $wp_customize->add_setting('contact_title', array(
        'default' => 'Contact Us',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_title', array(
        'label' => __('Contact Page Title', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'text',
    ));

    // Contact Subtitle
    $wp_customize->add_setting('contact_subtitle', array(
        'default' => 'Have questions, suggestions, or want to contribute? We\'d love to hear from you!',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_subtitle', array(
        'label' => __('Contact Page Subtitle', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'text',
    ));

    // Contact Description
    $wp_customize->add_setting('contact_description', array(
        'default' => "We're here to help you with any questions about our blog content or if you'd like to contribute.",
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_description', array(
        'label' => __('Contact Description', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'textarea',
    ));

    // Contact Address
    $wp_customize->add_setting('contact_address', array(
        'default' => 'Digital World',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_address', array(
        'label' => __('Contact Address', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'text',
    ));

    // Contact Phone
    $wp_customize->add_setting('contact_phone', array(
        'default' => '+1 234 567 8910',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_phone', array(
        'label' => __('Contact Phone', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'text',
    ));

    // Contact Email
    $wp_customize->add_setting('contact_email', array(
        'default' => 'hello@blog.com',
        'sanitize_callback' => 'sanitize_email',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_email', array(
        'label' => __('Contact Email', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'email',
    ));

    // Business Hours
    $wp_customize->add_setting('contact_business_hours', array(
        'default' => 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM',
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_business_hours', array(
        'label' => __('Business Hours', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'textarea',
    ));

    // Form Title
    $wp_customize->add_setting('contact_form_title', array(
        'default' => 'Send us a Message',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_form_title', array(
        'label' => __('Form Title', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'text',
    ));

    // Form Description
    $wp_customize->add_setting('contact_form_description', array(
        'default' => 'Fill out the form below and we\'ll get back to you as soon as possible.',
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_control('contact_form_description', array(
        'label' => __('Form Description', 'generatepress-child'),
        'section' => 'contact_settings',
        'type' => 'textarea',
    ));
}
add_action('customize_register', 'add_contact_customizer_settings');


