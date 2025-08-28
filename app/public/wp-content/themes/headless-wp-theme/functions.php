<?php
/**
 * Headless WordPress Theme functions and definitions
 *
 * @package Headless_WP_Theme
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function headless_wp_theme_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');

    // Add support for responsive embeds.
    add_theme_support('responsive-embeds');

    // Add support for custom logo.
    add_theme_support('custom-logo', array(
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
    ));

    // Add support for HTML5 markup.
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Add theme support for selective refresh for widgets.
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for Block Styles.
    add_theme_support('wp-block-styles');

    // Add support for full and wide align images.
    add_theme_support('align-wide');

    // Add support for custom line height controls.
    add_theme_support('custom-line-height');

    // Add support for experimental link color control.
    add_theme_support('experimental-link-color');

    // Add support for custom units.
    add_theme_support('custom-units', 'rem', 'em');

    // Add support for custom font sizes.
    add_theme_support('custom-font-sizes');

    // Add support for custom spacing.
    add_theme_support('custom-spacing');

    // Register navigation menus
    register_nav_menus(array(
        'menu-1' => esc_html__('Primary', 'headless-wp-theme'),
    ));
}
add_action('after_setup_theme', 'headless_wp_theme_setup');

/**
 * Enqueue scripts and styles.
 */
function headless_wp_theme_scripts() {
    wp_enqueue_style('headless-wp-theme-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
    
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'headless_wp_theme_scripts');

/**
 * Add custom image sizes
 */
function headless_wp_theme_image_sizes() {
    add_image_size('headless-thumbnail', 300, 200, true);
    add_image_size('headless-medium', 600, 400, true);
    add_image_size('headless-large', 1200, 800, true);
}
add_action('after_setup_theme', 'headless_wp_theme_image_sizes');

/**
 * Customize the REST API response for better headless integration
 */
function headless_wp_theme_rest_api_modifications() {
    // Add featured image URL to REST API response
    add_action('rest_api_init', function() {
        register_rest_field('post', 'featured_image_url', array(
            'get_callback' => function($post_arr) {
                if (has_post_thumbnail($post_arr['id'])) {
                    $img_id = get_post_thumbnail_id($post_arr['id']);
                    $img_url = wp_get_attachment_image_src($img_id, 'full');
                    return $img_url[0];
                }
                return false;
            },
            'schema' => array(
                'description' => 'Featured image URL',
                'type' => 'string'
            ),
        ));
    });
}
add_action('init', 'headless_wp_theme_rest_api_modifications');

/**
 * Add CORS headers for headless frontend
 */
function headless_wp_theme_cors_headers() {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
add_action('init', 'headless_wp_theme_cors_headers');

/**
 * Customize excerpt length
 */
function headless_wp_theme_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'headless_wp_theme_excerpt_length');

/**
 * Customize excerpt more
 */
function headless_wp_theme_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'headless_wp_theme_excerpt_more');

/**
 * Add custom body classes for headless theme
 */
function headless_wp_theme_body_classes($classes) {
    $classes[] = 'headless-wp-theme';
    return $classes;
}
add_filter('body_class', 'headless_wp_theme_body_classes');

/**
 * Disable frontend features that are not needed in headless setup
 */
function headless_wp_theme_disable_frontend_features() {
    // Remove emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Remove WordPress version
    remove_action('wp_head', 'wp_generator');
    
    // Remove wlwmanifest link
    remove_action('wp_head', 'wlwmanifest_link');
    
    // Remove RSD link
    remove_action('wp_head', 'rsd_link');
}
add_action('init', 'headless_wp_theme_disable_frontend_features');

/**
 * Add admin notice about headless setup
 */
function headless_wp_theme_admin_notice() {
    if (is_admin()) {
        echo '<div class="notice notice-info is-dismissible">';
        echo '<p><strong>Headless WordPress Theme:</strong> This theme is designed for headless CMS functionality. Your frontend is powered by Next.js at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'headless_wp_theme_admin_notice');

