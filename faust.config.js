/**
 * @type {import('@faustwp/core').FaustConfig}
 */
export default {
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:10013',
  apiClientSecret: process.env.FAUST_SECRET_KEY,
  authType: 'redirect',
  loginPagePath: '/login',
  disableLogging: false,
};
