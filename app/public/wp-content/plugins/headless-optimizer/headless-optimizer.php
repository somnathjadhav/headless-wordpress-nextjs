<?php
/**
 * Plugin Name: Headless WordPress Optimizer
 * Description: Optimizes WordPress for headless usage by disabling unnecessary features
 * Version: 1.0.0
 * Author: Headless WP
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class HeadlessOptimizer {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'disable_frontend_assets'));
        add_action('admin_enqueue_scripts', array($this, 'optimize_admin_assets'));
        add_filter('wp_headers', array($this, 'add_cors_headers'));
    }
    
    public function init() {
        // Disable emojis
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_styles', 'print_emoji_styles');
        remove_filter('the_content_feed', 'wp_staticize_emoji');
        remove_filter('comment_text_rss', 'wp_staticize_emoji');
        remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
        
        // Disable embeds
        remove_action('wp_head', 'wp_oembed_add_discovery_links');
        remove_action('wp_head', 'wp_oembed_add_host_js');
        
        // Disable XML-RPC
        add_filter('xmlrpc_enabled', '__return_false');
        
        // Remove unnecessary meta tags
        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'rsd_link');
        remove_action('wp_head', 'wp_shortlink_wp_head');
    }
    
    public function disable_frontend_assets() {
        // Only disable if not in admin
        if (!is_admin()) {
            wp_dequeue_style('wp-block-library');
            wp_dequeue_style('wp-block-library-theme');
            wp_dequeue_style('wc-block-style');
        }
    }
    
    public function optimize_admin_assets() {
        // Optimize admin assets for better performance
        wp_enqueue_script('jquery');
    }
    
    public function add_cors_headers($headers) {
        // Add CORS headers for headless frontend
        $headers['Access-Control-Allow-Origin'] = '*';
        $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        $headers['Access-Control-Allow-Headers'] = 'Content-Type';
        
        return $headers;
    }
}

// Initialize the optimizer
new HeadlessOptimizer();


