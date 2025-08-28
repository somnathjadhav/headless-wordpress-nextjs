<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '@c@6A12h*0.TOWP3d_a]kSPy_kmTA,j8+,lzg)6X{*!/ZTlVyL%B}=h{rFI;u5wN' );
define( 'SECURE_AUTH_KEY',   'GPMeV^s`B-|,<urfk~#uigVxx5VzqWc|PE}[p,mf!t{F(%&DX( cGI[Xq$g>HoI!' );
define( 'LOGGED_IN_KEY',     ',L_7w6b?DJyP@ji WROHsA,|ci~B%id(V(Cgt{WO5_%G,&=m_r^1ve&olnS+YG>}' );
define( 'NONCE_KEY',         ']}aH!6)5*^l-m<P4p(^$Y2ovcy(aHIPi^*![N6{s>9[:JBqoE0ISRk@oaHoafh_W' );
define( 'AUTH_SALT',         '{u]3Nrz5a>rVljf9OF0]`r)&@u(()gbl}:e!9LEHlt0r@ej%Oj[FR&UNsG5~%!n!' );
define( 'SECURE_AUTH_SALT',  '~C;N-58^dFz`rx]}{&pI3N{GMwHzR=TL, aevo)O=P9}%UP/(k )!-@V3-Gjr.g<' );
define( 'LOGGED_IN_SALT',    '$0yBva> iO9 hO^QI&#0&qB(8X-WM^:L]wErt:y!&$+FrcI>E0,3%|<rWX])t)t5' );
define( 'NONCE_SALT',        'z74t`xE08NJ4tB `&BLOOU~<j@Pu(a;tBAgVzCw{8un$R/>}Xw7x;5fN@=hxd( D' );
define( 'WP_CACHE_KEY_SALT', '9U64$|3j)joW89Oxn[|YTQB,ksQq<?l1^,w1`av@@cfH?iNuJ~bDY4H} :&;[H>:' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
