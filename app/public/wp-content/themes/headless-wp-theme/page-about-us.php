<?php
/**
 * Template Name: About Us Page
 * 
 * This is a custom template for the About Us page.
 * It will only show ACF fields when this template is selected.
 */

get_header(); ?>

<div class="about-us-template">
    <div class="container">
        <h1><?php the_title(); ?></h1>
        
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <div class="page-content">
                <?php the_content(); ?>
            </div>
        <?php endwhile; endif; ?>
        
        <!-- About Us specific content will be managed through ACF fields -->
        <div class="about-us-content">
            <p>This page uses the "About Us Page" template. The content is managed through Advanced Custom Fields below.</p>
        </div>
    </div>
</div>

<?php get_footer(); ?>




