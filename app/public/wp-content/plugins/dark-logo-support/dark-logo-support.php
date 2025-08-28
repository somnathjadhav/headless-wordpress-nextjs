<?php
/**
 * Plugin Name: Dark Logo Support
 * Description: Adds support for dark mode logo in header settings
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class DarkLogoSupport {
    
    public function __construct() {
        add_action('customize_register', array($this, 'add_customizer_settings'));
        add_action('rest_api_init', array($this, 'add_rest_api_support'));
    }
    
    public function add_customizer_settings($wp_customize) {
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
    }
    
    public function add_rest_api_support() {
        // Add dark logo to existing header settings endpoint
        add_filter('rest_prepare_header-settings', function($response, $post, $request) {
            $response->data['logo_dark'] = get_theme_mod('dark_logo', '');
            return $response;
        }, 10, 3);
    }
}

// Initialize the plugin
new DarkLogoSupport();
