<?php
/**
 * The template for displaying 404 pages (not found)
 */

get_header(); ?>

<div class="container">
    <div class="content">
        <section class="error-404 not-found">
            <header class="page-header">
                <h1 class="page-title"><?php esc_html_e('Oops! That page can&rsquo;t be found.', 'headless-wp-theme'); ?></h1>
            </header>

            <div class="page-content">
                <p><?php esc_html_e('It looks like nothing was found at this location. Maybe try a search?', 'headless-wp-theme'); ?></p>

                <?php get_search_form(); ?>

                <div class="widget-area">
                    <div class="widget">
                        <h2><?php esc_html_e('Most Used Categories', 'headless-wp-theme'); ?></h2>
                        <ul>
                            <?php
                            wp_list_categories(array(
                                'orderby'    => 'count',
                                'order'      => 'DESC',
                                'show_count' => 1,
                                'title_li'   => '',
                                'number'     => 10,
                            ));
                            ?>
                        </ul>
                    </div>

                    <div class="widget">
                        <h2><?php esc_html_e('Recent Posts', 'headless-wp-theme'); ?></h2>
                        <ul>
                            <?php
                            wp_get_archives(array(
                                'type'  => 'postbypost',
                                'limit' => 10,
                            ));
                            ?>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

<?php get_footer(); ?>

