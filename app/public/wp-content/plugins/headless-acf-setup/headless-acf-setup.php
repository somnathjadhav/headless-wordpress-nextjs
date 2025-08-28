<?php
/**
 * Plugin Name: Headless ACF Setup
 * Description: Custom post types and ACF field groups for headless WordPress
 * Version: 1.0.0
 * Author: Headless WP
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class HeadlessACFSetup {
    
    public function __construct() {
        add_action('init', array($this, 'register_custom_post_types'));
        add_action('acf/init', array($this, 'register_acf_fields'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('rest_api_init', array($this, 'add_acf_to_rest_api'));
        add_action('wp_loaded', array($this, 'force_acf_refresh'));
        add_action('admin_notices', array($this, 'add_acf_admin_notice'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Set up default site identity if not already set
        add_action('init', array($this, 'setup_default_site_identity'));
        
        // Set up Google Maps API key
        add_action('acf/init', array($this, 'setup_google_maps_api_key'));
        
        // Set up theme customizer options
        add_action('customize_register', array($this, 'setup_theme_customizer'));
    }

    public function add_admin_menu() {
        add_submenu_page(
            'tools.php',
            'Update Testimonials',
            'Update Testimonials',
            'manage_options',
            'update-testimonials',
            array($this, 'update_testimonials_page')
        );
    }

    public function update_testimonials_page() {
        if (isset($_POST['update_testimonials'])) {
            $this->update_testimonials_data();
            echo '<div class="notice notice-success"><p>Testimonials updated successfully!</p></div>';
        }
        
        echo '<div class="wrap">';
        echo '<h1>Update Testimonials with ACF Fields</h1>';
        echo '<p>Click the button below to update existing testimonials with proper ACF field data.</p>';
        echo '<form method="post">';
        echo '<input type="submit" name="update_testimonials" class="button button-primary" value="Update Testimonials">';
        echo '</form>';
        echo '</div>';
    }

    public function update_testimonials_data() {
        // Sample testimonial data
        $testimonial_updates = array(
            98 => array(
                'author_name' => 'Somnath Jadhav',
                'position' => 'Founder',
                'company' => 'Eternitty',
                'rating' => 5,
                'content' => 'Founded with a vision to revolutionize how businesses approach digital transformation, Bismount has grown from a small startup to a trusted partner for companies worldwide.'
            ),
            38 => array(
                'author_name' => 'Sarah Johnson',
                'position' => 'Marketing Director',
                'company' => 'TechCorp',
                'rating' => 5,
                'content' => 'The level of creativity and technical expertise this team brings to the table is remarkable. They not only built us a beautiful website but also provided valuable insights that helped improve our business processes.'
            ),
            37 => array(
                'author_name' => 'Michael Chen',
                'position' => 'CEO',
                'company' => 'InnovateCo',
                'rating' => 5,
                'content' => 'From the initial consultation to the final launch, every step was handled with professionalism and expertise. They listened to our requirements and delivered exactly what we needed. Highly recommended!'
            ),
            36 => array(
                'author_name' => 'Emily Rodriguez',
                'position' => 'Founder',
                'company' => 'Eternitty',
                'rating' => 5,
                'content' => 'Professional, responsive, and incredibly talented. They transformed our outdated website into a modern, user-friendly platform that has significantly improved our online presence. The results speak for themselves!'
            ),
            35 => array(
                'author_name' => 'David Thompson',
                'position' => 'Operations Manager',
                'company' => 'Global Solutions',
                'rating' => 5,
                'content' => 'The team went above and beyond to understand our business needs and delivered a solution that perfectly matches our vision. Their expertise in modern web technologies and their collaborative approach made the entire process smooth and enjoyable.'
            ),
            34 => array(
                'author_name' => 'Lisa Wang',
                'position' => 'Project Manager',
                'company' => 'Digital Dynamics',
                'rating' => 5,
                'content' => 'Working with this team has been an absolute pleasure. They delivered our project on time and exceeded our expectations. The quality of work and attention to detail is outstanding. I would highly recommend them to anyone looking for professional web development services.'
            )
        );

        // Update each testimonial
        foreach ($testimonial_updates as $post_id => $fields) {
            // Update ACF fields
            foreach ($fields as $field_name => $value) {
                if ($field_name !== 'content') {
                    update_field($field_name, $value, $post_id);
                }
            }
            
            // Update the post content if provided
            if (isset($fields['content'])) {
                wp_update_post(array(
                    'ID' => $post_id,
                    'post_content' => $fields['content']
                ));
            }
        }
    }
    
    public function setup_default_site_identity() {
        // Set default site title and description
        update_option('blogname', 'Bismount');
        update_option('blogdescription', 'Business & Services WordPress Theme');
        
        // Try to set site icon if media exists and not already set
        if (!get_option('site_icon')) {
            $media = get_posts(array(
                'post_type' => 'attachment',
                'posts_per_page' => 1,
                'post_status' => 'inherit'
            ));
            
            if (!empty($media)) {
                update_option('site_icon', $media[0]->ID);
            }
        }
        
        // Try to set site logo if logo media exists and not already set
        if (!get_option('custom_logo')) {
            $logo_media = get_posts(array(
                'post_type' => 'attachment',
                'posts_per_page' => 1,
                'post_status' => 'inherit',
                'meta_query' => array(
                    array(
                        'key' => '_wp_attached_file',
                        'value' => 'logo',
                        'compare' => 'LIKE'
                    )
                )
            ));
            
            if (!empty($logo_media)) {
                update_option('custom_logo', $logo_media[0]->ID);
            }
        }
    }
    
    public function force_acf_refresh() {
        // Force ACF to refresh field cache
        if (function_exists('acf_get_cache')) {
            acf_get_cache('acf_get_field_groups', true);
        }
        
        // Clear any ACF transients
        delete_transient('acf_get_field_groups');
        delete_transient('acf_get_field_groups_uniqid');
        
        // Force ACF to show fields in admin
        if (function_exists('acf_get_field_groups')) {
            acf_get_field_groups();
        }
    }
    
    public function add_acf_admin_notice() {
        if (isset($_GET['page']) && $_GET['page'] === 'acf-field-groups') {
            echo '<div class="notice notice-info is-dismissible">';
            echo '<p><strong>Headless ACF Setup:</strong> Custom field groups are registered programmatically. They will appear when editing the corresponding pages and testimonials.</p>';
            echo '</div>';
        }
    }
    
    public function setup_google_maps_api_key() {
        // Set Google Maps API key for ACF
        acf_update_setting('google_api_key', 'AIzaSyB41DRUbKWJHPxaFjMAwjdWFPXbV7pRD-A');
    }
    
    public function register_custom_post_types() {
        // Register Testimonial CPT
        register_post_type('testimonial', array(
            'labels' => array(
                'name' => 'Testimonials',
                'singular_name' => 'Testimonial',
                'add_new' => 'Add New Testimonial',
                'add_new_item' => 'Add New Testimonial',
                'edit_item' => 'Edit Testimonial',
                'new_item' => 'New Testimonial',
                'view_item' => 'View Testimonial',
                'search_items' => 'Search Testimonials',
                'not_found' => 'No testimonials found',
                'not_found_in_trash' => 'No testimonials found in trash'
            ),
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'thumbnail'),
            'menu_icon' => 'dashicons-format-quote',
            'has_archive' => true,
            'rewrite' => array('slug' => 'testimonials')
        ));
    }
    
    public function register_acf_fields() {
        if (!function_exists('acf_add_local_field_group')) {
            return;
        }

        // Testimonial Fields
        acf_add_local_field_group(array(
            'key' => 'group_testimonial_fields',
            'title' => 'Testimonial Fields',
            'fields' => array(
                array(
                    'key' => 'field_testimonial_author_name',
                    'label' => 'Author Name',
                    'name' => 'author_name',
                    'type' => 'text',
                    'required' => 1,
                    'instructions' => 'Enter the name of the person giving the testimonial',
                ),
                array(
                    'key' => 'field_testimonial_position',
                    'label' => 'Position',
                    'name' => 'position',
                    'type' => 'text',
                    'required' => 1,
                    'instructions' => 'Enter the job title or position of the person',
                ),
                array(
                    'key' => 'field_testimonial_company',
                    'label' => 'Company',
                    'name' => 'company',
                    'type' => 'text',
                    'required' => 1,
                    'instructions' => 'Enter the company name',
                ),
                array(
                    'key' => 'field_testimonial_rating',
                    'label' => 'Rating',
                    'name' => 'rating',
                    'type' => 'number',
                    'required' => 1,
                    'min' => 1,
                    'max' => 5,
                    'default_value' => 5,
                    'instructions' => 'Enter a rating from 1 to 5',
                ),
                array(
                    'key' => 'field_testimonial_content',
                    'label' => 'Testimonial Content',
                    'name' => 'content',
                    'type' => 'textarea',
                    'required' => 1,
                    'instructions' => 'Enter the testimonial text',
                ),
                array(
                    'key' => 'field_testimonial_image',
                    'label' => 'Author Image',
                    'name' => 'image',
                    'type' => 'image',
                    'return_format' => 'array',
                    'preview_size' => 'thumbnail',
                    'instructions' => 'Upload an image of the person (optional)',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'testimonial',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
        ));

        // Blog Post File Attachment Field
        acf_add_local_field_group(array(
            'key' => 'group_blog_post_fields',
            'title' => 'Blog Post Fields',
            'fields' => array(
                array(
                    'key' => 'field_blog_attachment_file',
                    'label' => 'Attachment File',
                    'name' => 'attachment_file',
                    'type' => 'file',
                    'return_format' => 'array',
                    'library' => 'all',
                    'mime_types' => 'pdf,doc,docx,txt,zip,rar',
                    'instructions' => 'Upload a file to be attached to this blog post (PDF, Word, Text, or Archive files)',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'post',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'side',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
        ));

        // About Us Page Fields
        acf_add_local_field_group(array(
            'key' => 'group_about_us_fields',
            'title' => 'About Us Page Fields',
            'fields' => array(
                array(
                    'key' => 'field_about_hero_title',
                    'label' => 'Hero Title',
                    'name' => 'hero_title',
                    'type' => 'text',
                    'required' => 1,
                    'instructions' => 'Enter the main title for the About Us page',
                ),
                array(
                    'key' => 'field_about_hero_subtitle',
                    'label' => 'Hero Subtitle',
                    'name' => 'hero_subtitle',
                    'type' => 'textarea',
                    'required' => 1,
                    'instructions' => 'Enter the subtitle text for the About Us page',
                ),
                array(
                    'key' => 'field_about_content',
                    'label' => 'About Content',
                    'name' => 'about_content',
                    'type' => 'wysiwyg',
                    'required' => 1,
                    'instructions' => 'Enter the main content for the About Us page',
                ),
                array(
                    'key' => 'field_about_image',
                    'label' => 'About Image',
                    'name' => 'about_image',
                    'type' => 'image',
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'instructions' => 'Upload an image for the About Us page',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-about.php',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
        ));

        // Services Page Fields
        acf_add_local_field_group(array(
            'key' => 'group_services_fields',
            'title' => 'Services Page Fields',
            'fields' => array(
                array(
                    'key' => 'field_services_hero_title',
                    'label' => 'Hero Title',
                    'name' => 'hero_title',
                    'type' => 'text',
                    'required' => 1,
                    'instructions' => 'Enter the main title for the Services page',
                ),
                array(
                    'key' => 'field_services_hero_subtitle',
                    'label' => 'Hero Subtitle',
                    'name' => 'hero_subtitle',
                    'type' => 'textarea',
                    'required' => 1,
                    'instructions' => 'Enter the subtitle text for the Services page',
                ),
                array(
                    'key' => 'field_services_intro',
                    'label' => 'Services Introduction',
                    'name' => 'services_intro',
                    'type' => 'wysiwyg',
                    'required' => 1,
                    'instructions' => 'Enter the introduction text for the Services page',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-services.php',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
        ));

        // Contact Page Fields
        acf_add_local_field_group(array(
            'key' => 'group_contact_fields',
            'title' => 'Contact Page Fields',
            'fields' => array(
                array(
                    'key' => 'field_contact_hero_title',
                    'label' => 'Hero Title',
                    'name' => 'hero_title',
                    'type' => 'text',
                    'required' => 1,
                    'instructions' => 'Enter the main title for the Contact page',
                ),
                array(
                    'key' => 'field_contact_hero_subtitle',
                    'label' => 'Hero Subtitle',
                    'name' => 'hero_subtitle',
                    'type' => 'textarea',
                    'required' => 1,
                    'instructions' => 'Enter the subtitle text for the Contact page',
                ),
                array(
                    'key' => 'field_contact_address',
                    'label' => 'Address',
                    'name' => 'address',
                    'type' => 'textarea',
                    'required' => 1,
                    'instructions' => 'Enter the business address',
                ),
                array(
                    'key' => 'field_contact_phone',
                    'label' => 'Phone Number',
                    'name' => 'phone',
                    'type' => 'text',
                    'required' => 1,
                    'instructions' => 'Enter the phone number',
                ),
                array(
                    'key' => 'field_contact_email',
                    'label' => 'Email Address',
                    'name' => 'email',
                    'type' => 'email',
                    'required' => 1,
                    'instructions' => 'Enter the email address',
                ),
                array(
                    'key' => 'field_contact_facebook',
                    'label' => 'Facebook URL',
                    'name' => 'facebook',
                    'type' => 'url',
                    'required' => 0,
                    'instructions' => 'Enter the Facebook page URL',
                ),
                array(
                    'key' => 'field_contact_map',
                    'label' => 'Location Map',
                    'name' => 'map',
                    'type' => 'google_map',
                    'required' => 0,
                    'center_lat' => '37.7749',
                    'center_lng' => '-122.4194',
                    'zoom' => 14,
                    'height' => 400,
                    'instructions' => 'Set the location on the map for your business',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page',
                        'operator' => '==',
                        'value' => 'contact-us',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
        ));
    }
    
    public function register_rest_routes() {
        // Register custom testimonials endpoint
        register_rest_route('headless/v1', '/testimonials', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_testimonials'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('headless/v1', '/update-testimonials', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_testimonials_via_api'),
            'permission_callback' => '__return_true',
        ));
        
        // Register public site identity endpoint
        register_rest_route('headless/v1', '/site-identity', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_site_identity'),
            'permission_callback' => '__return_true',
        ));
        
        // Register footer menu endpoint
        register_rest_route('headless/v1', '/footer-menu', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_footer_menu'),
            'permission_callback' => '__return_true',
        ));
        
        // Register theme options endpoint
        register_rest_route('headless/v1', '/theme-options', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_theme_options'),
            'permission_callback' => '__return_true',
        ));
    }
    
    public function get_testimonials($request) {
        $args = array(
            'post_type' => 'testimonial',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        );
        
        $testimonials = get_posts($args);
        $testimonials_data = array();
        
        foreach ($testimonials as $testimonial) {
            $acf_fields = get_fields($testimonial->ID);
            
            $testimonials_data[] = array(
                'id' => $testimonial->ID,
                'title' => $testimonial->post_title,
                'content' => $testimonial->post_content,
                'author' => $acf_fields['author_name'] ?? '',
                'position' => $acf_fields['position'] ?? '',
                'company' => $acf_fields['company'] ?? '',
                'rating' => $acf_fields['rating'] ?? 5,
                'image' => $acf_fields['image'] ?? '',
            );
        }
        
        return $testimonials_data;
    }
    
    public function update_testimonials_via_api($request) {
        $this->update_testimonials_data();
        return array('success' => true, 'message' => 'Testimonials updated successfully');
    }
    
    public function get_site_identity($request) {
        $site_identity = array(
            'title' => get_option('blogname', 'Bismount'),
            'description' => get_option('blogdescription', 'Business & Services WordPress Theme'),
            'url' => get_option('home', 'http://localhost:10010'),
            'site_logo' => get_option('custom_logo', null),
            'site_icon' => get_option('site_icon', null),
        );
        
        return $site_identity;
    }
    
    public function get_footer_menu($request) {
        // Get the "Footer Column 1" menu
        $menu = wp_get_nav_menu_object('Footer Column 1');
        
        if (!$menu) {
            return array();
        }
        
        $menu_items = wp_get_nav_menu_items($menu->term_id);
        
        if (!$menu_items) {
            return array();
        }
        
        $menu_data = array();
        
        foreach ($menu_items as $item) {
            $menu_data[] = array(
                'ID' => $item->ID,
                'title' => $item->title,
                'url' => $item->url,
                'menu_item_parent' => $item->menu_item_parent,
                'order' => $item->menu_order,
            );
        }
        
        return $menu_data;
    }
    
    public function get_theme_options($request) {
        $theme_options = array(
            // Social Media
            'social_media' => array(
                'facebook_url' => get_theme_mod('facebook_url', ''),
                'twitter_url' => get_theme_mod('twitter_url', ''),
                'linkedin_url' => get_theme_mod('linkedin_url', ''),
                'instagram_url' => get_theme_mod('instagram_url', ''),
                'youtube_url' => get_theme_mod('youtube_url', ''),
            ),
            
            // Footer Options
            'footer' => array(
                'copyright_text' => get_theme_mod('copyright_text', '© 2025 All rights reserved.'),
                'company_name' => get_theme_mod('company_name', 'Your Company Name'),
            ),
            
            // Theme Features
            'features' => array(
                'enable_analytics' => get_theme_mod('enable_analytics', false),
                'google_analytics_id' => get_theme_mod('google_analytics_id', ''),
                'enable_comments' => get_theme_mod('enable_comments', true),
            ),
            
            // Contact Information
            'contact' => array(
                'email' => get_theme_mod('contact_email', 'info@yourcompany.com'),
                'phone' => get_theme_mod('contact_phone', '+1 (555) 123-4567'),
                'address' => get_theme_mod('business_address', '123 Business Street, City, State 12345'),
                'hours' => get_theme_mod('business_hours', 'Monday - Friday: 9:00 AM - 6:00 PM'),
            ),
        );
        
        return $theme_options;
    }
    
    public function add_acf_to_rest_api() {
        add_filter('rest_prepare_page', array($this, 'add_acf_to_page_response'), 10, 3);
        add_filter('rest_prepare_post', array($this, 'add_acf_to_post_response'), 10, 3);
    }
    
    public function add_acf_to_page_response($response, $post, $request) {
        if (function_exists('get_fields')) {
            $acf_fields = get_fields($post->ID);
            if ($acf_fields) {
                $response->data['acf'] = $acf_fields;
            }
        }
        return $response;
    }
    
    public function add_acf_to_post_response($response, $post, $request) {
        if (function_exists('get_fields')) {
            $acf_fields = get_fields($post->ID);
            if ($acf_fields) {
                $response->data['acf'] = $acf_fields;
            }
        }
        return $response;
    }
    
    public function setup_theme_customizer($wp_customize) {
        // Social Media Section
        $wp_customize->add_section('social_media', array(
            'title' => 'Social Media Profiles',
            'priority' => 30,
        ));
        
        // Facebook URL
        $wp_customize->add_setting('facebook_url', array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('facebook_url', array(
            'label' => 'Facebook URL',
            'section' => 'social_media',
            'type' => 'url',
        ));
        
        // Twitter URL
        $wp_customize->add_setting('twitter_url', array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('twitter_url', array(
            'label' => 'Twitter URL',
            'section' => 'social_media',
            'type' => 'url',
        ));
        
        // LinkedIn URL
        $wp_customize->add_setting('linkedin_url', array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('linkedin_url', array(
            'label' => 'LinkedIn URL',
            'section' => 'social_media',
            'type' => 'url',
        ));
        
        // Instagram URL
        $wp_customize->add_setting('instagram_url', array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('instagram_url', array(
            'label' => 'Instagram URL',
            'section' => 'social_media',
            'type' => 'url',
        ));
        
        // YouTube URL
        $wp_customize->add_setting('youtube_url', array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('youtube_url', array(
            'label' => 'YouTube URL',
            'section' => 'social_media',
            'type' => 'url',
        ));
        
        // Footer Section
        $wp_customize->add_section('footer_options', array(
            'title' => 'Footer Options',
            'priority' => 35,
        ));
        
        // Copyright Text
        $wp_customize->add_setting('copyright_text', array(
            'default' => '© 2025 All rights reserved.',
            'sanitize_callback' => 'sanitize_text_field',
        ));
        $wp_customize->add_control('copyright_text', array(
            'label' => 'Copyright Text',
            'section' => 'footer_options',
            'type' => 'text',
        ));
        
        // Company Name
        $wp_customize->add_setting('company_name', array(
            'default' => 'Your Company Name',
            'sanitize_callback' => 'sanitize_text_field',
        ));
        $wp_customize->add_control('company_name', array(
            'label' => 'Company Name',
            'section' => 'footer_options',
            'type' => 'text',
        ));
        
        // Theme Features Section
        $wp_customize->add_section('theme_features', array(
            'title' => 'Theme Features',
            'priority' => 40,
        ));
        
        // Enable Analytics
        $wp_customize->add_setting('enable_analytics', array(
            'default' => false,
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));
        $wp_customize->add_control('enable_analytics', array(
            'label' => 'Enable Google Analytics',
            'section' => 'theme_features',
            'type' => 'checkbox',
        ));
        
        // Google Analytics ID
        $wp_customize->add_setting('google_analytics_id', array(
            'default' => '',
            'sanitize_callback' => 'sanitize_text_field',
        ));
        $wp_customize->add_control('google_analytics_id', array(
            'label' => 'Google Analytics ID (G-XXXXXXXXXX)',
            'section' => 'theme_features',
            'type' => 'text',
            'description' => 'Enter your Google Analytics tracking ID',
        ));
        
        // Enable Comments
        $wp_customize->add_setting('enable_comments', array(
            'default' => true,
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));
        $wp_customize->add_control('enable_comments', array(
            'label' => 'Enable Comments',
            'section' => 'theme_features',
            'type' => 'checkbox',
        ));
        
        // Contact Information Section
        $wp_customize->add_section('contact_info', array(
            'title' => 'Contact Information',
            'priority' => 45,
        ));
        
        // Contact Email
        $wp_customize->add_setting('contact_email', array(
            'default' => 'info@yourcompany.com',
            'sanitize_callback' => 'sanitize_email',
        ));
        $wp_customize->add_control('contact_email', array(
            'label' => 'Contact Email',
            'section' => 'contact_info',
            'type' => 'email',
        ));
        
        // Contact Phone
        $wp_customize->add_setting('contact_phone', array(
            'default' => '+1 (555) 123-4567',
            'sanitize_callback' => 'sanitize_text_field',
        ));
        $wp_customize->add_control('contact_phone', array(
            'label' => 'Contact Phone',
            'section' => 'contact_info',
            'type' => 'text',
        ));
        
        // Business Address
        $wp_customize->add_setting('business_address', array(
            'default' => '123 Business Street, City, State 12345',
            'sanitize_callback' => 'sanitize_textarea_field',
        ));
        $wp_customize->add_control('business_address', array(
            'label' => 'Business Address',
            'section' => 'contact_info',
            'type' => 'textarea',
        ));
        
        // Business Hours
        $wp_customize->add_setting('business_hours', array(
            'default' => 'Monday - Friday: 9:00 AM - 6:00 PM',
            'sanitize_callback' => 'sanitize_textarea_field',
        ));
        $wp_customize->add_control('business_hours', array(
            'label' => 'Business Hours',
            'section' => 'contact_info',
            'type' => 'textarea',
        ));
    }
}

// Initialize the plugin
new HeadlessACFSetup();
