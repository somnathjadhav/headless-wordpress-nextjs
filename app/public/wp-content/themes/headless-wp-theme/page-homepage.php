<?php
/**
 * Template Name: Homepage Template
 *
 * This is the template for the homepage with ACF fields
 */

get_header(); ?>

<div class="container">
    <div class="content">
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <h1 class="entry-title"><?php the_title(); ?></h1>
            </header>

            <div class="entry-content">
                <?php the_content(); ?>
            </div>

            <?php if (function_exists('get_field')) : ?>
                <div class="homepage-sections">
                    <!-- Hero Section -->
                    <?php if (get_field('hero_section')) : ?>
                        <section class="hero-section">
                            <h2>Hero Section</h2>
                            <p><strong>Title:</strong> <?php echo get_field('hero_section')['title']; ?></p>
                            <?php if (get_field('hero_section')['subtitle']) : ?>
                                <p><strong>Subtitle:</strong> <?php echo get_field('hero_section')['subtitle']; ?></p>
                            <?php endif; ?>
                        </section>
                    <?php endif; ?>

                    <!-- Services Section -->
                    <?php if (get_field('services_section')) : ?>
                        <section class="services-section">
                            <h2>Services Section</h2>
                            <p><strong>Title:</strong> <?php echo get_field('services_section')['title']; ?></p>
                            <?php if (get_field('services_section')['subtitle']) : ?>
                                <p><strong>Subtitle:</strong> <?php echo get_field('services_section')['subtitle']; ?></p>
                            <?php endif; ?>
                        </section>
                    <?php endif; ?>

                    <!-- About Section -->
                    <?php if (get_field('about_section')) : ?>
                        <section class="about-section">
                            <h2>About Section</h2>
                            <p><strong>Title:</strong> <?php echo get_field('about_section')['title']; ?></p>
                            <?php if (get_field('about_section')['content']) : ?>
                                <div><strong>Content:</strong> <?php echo get_field('about_section')['content']; ?></div>
                            <?php endif; ?>
                        </section>
                    <?php endif; ?>

                    <!-- Testimonials Section -->
                    <?php if (get_field('testimonials_section')) : ?>
                        <section class="testimonials-section">
                            <h2>Testimonials Section</h2>
                            <p><strong>Title:</strong> <?php echo get_field('testimonials_section')['title']; ?></p>
                        </section>
                    <?php endif; ?>

                    <!-- Clients Section -->
                    <?php if (get_field('clients_section')) : ?>
                        <section class="clients-section">
                            <h2>Clients Section</h2>
                            <p><strong>Title:</strong> <?php echo get_field('clients_section')['title']; ?></p>
                        </section>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </article>
    </div>
</div>

<?php get_footer(); ?>

