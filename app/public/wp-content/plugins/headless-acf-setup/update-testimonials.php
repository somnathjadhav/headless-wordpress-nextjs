<?php
/**
 * Update Testimonials with ACF Fields
 * 
 * This script updates existing testimonials with proper ACF field data.
 * Run this script once to populate the testimonials with author information.
 */

// Ensure this is being run in WordPress context
if (!defined('ABSPATH')) {
    require_once('../../../wp-load.php');
}

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
    
    echo "Updated testimonial ID: $post_id\n";
}

echo "All testimonials updated successfully!\n";
?>


