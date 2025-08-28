<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="site-header">
        <div class="header">
            <div class="container">
                <div class="site-branding">
                    <?php if (is_front_page() && is_home()) : ?>
                        <h1 class="site-title">
                            <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                                <?php bloginfo('name'); ?>
                            </a>
                        </h1>
                    <?php else : ?>
                        <p class="site-title">
                            <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                                <?php bloginfo('name'); ?>
                            </a>
                        </p>
                    <?php endif; ?>
                    
                    <?php
                    $description = get_bloginfo('description', 'display');
                    if ($description || is_customize_preview()) :
                    ?>
                        <p class="site-description"><?php echo $description; ?></p>
                    <?php endif; ?>
                </div>

                <?php if (is_user_logged_in()) : ?>
                    <div class="admin-notice">
                        <h3>Headless WordPress Theme</h3>
                        <p>This is the WordPress backend for your headless CMS. Your frontend is powered by Next.js at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
                        <p><strong>Admin Panel:</strong> <a href="<?php echo admin_url(); ?>">WordPress Admin</a> | <strong>Frontend:</strong> <a href="http://localhost:3000" target="_blank">Next.js App</a></p>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <nav id="site-navigation" class="main-navigation">
            <div class="container">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'menu-1',
                    'menu_id'        => 'primary-menu',
                    'fallback_cb'    => false,
                ));
                ?>
            </div>
        </nav>
    </header>

    <div id="content" class="site-content">

