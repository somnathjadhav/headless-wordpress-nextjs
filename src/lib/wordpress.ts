// WordPress API Configuration
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:10013';

// Optimized fetch function with timeout and error logging
async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
  
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {

      return null;
    }
  } catch (error) {
    clearTimeout(timeoutId);

    return null;
  }
}

// Blog-related API functions
export async function fetchPosts(page = 1, perPage = 10, category = '', tag = '', author = '') {
  try {
    let url = `${WORDPRESS_API_URL}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`;
    
    if (category) url += `&categories=${category}`;
    if (tag) url += `&tags=${tag}`;
    if (author) url += `&author=${author}`;
    
    const data = await fetchWithTimeout(url);
    if (data) return data;
  } catch (error) {
    console.log('Error fetching posts:', (error as Error).message);
  }

  // Return default posts if fetch fails
  return [
    {
      id: 1,
      title: { rendered: 'Sample Blog Post 1' },
      excerpt: { rendered: 'This is a sample blog post about technology and innovation.' },
      content: { rendered: '<p>This is a sample blog post about technology and innovation.</p>' },
      date: '2024-01-15T10:00:00',
      modified: '2024-01-15T10:00:00',
      slug: 'sample-blog-post-1',
      author: 1,
      featured_media: 0,
      categories: [1],
      tags: [1, 2],
      _embedded: {
        author: [{ name: 'John Doe', avatar_urls: { 96: '' } }],
        'wp:featuredmedia': [{ source_url: '' }]
      }
    },
    {
      id: 2,
      title: { rendered: 'Sample Blog Post 2' },
      excerpt: { rendered: 'Another sample blog post about digital transformation and trends.' },
      content: { rendered: '<p>Another sample blog post about digital transformation and trends.</p>' },
      date: '2024-01-10T10:00:00',
      modified: '2024-01-10T10:00:00',
      slug: 'sample-blog-post-2',
      author: 1,
      featured_media: 0,
      categories: [2],
      tags: [2, 3],
      _embedded: {
        author: [{ name: 'John Doe', avatar_urls: { 96: '' } }],
        'wp:featuredmedia': [{ source_url: '' }]
      }
    }
  ];
}

export async function fetchPost(slug: string) {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`);
    if (data && data.length > 0) return data[0];
  } catch (error) {
    console.log('Error fetching post:', (error as Error).message);
  }

  // Return default post if fetch fails
  return {
    id: 1,
    title: { rendered: 'Sample Blog Post' },
    excerpt: { rendered: 'This is a sample blog post about technology and innovation.' },
    content: { rendered: '<p>This is a sample blog post about technology and innovation.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' },
    date: '2024-01-15T10:00:00',
    modified: '2024-01-15T10:00:00',
    slug: slug,
    author: 1,
    featured_media: 0,
    categories: [1],
    tags: [1, 2],
    _embedded: {
      author: [{ name: 'John Doe', avatar_urls: { 96: '' } }],
      'wp:featuredmedia': [{ source_url: '' }]
    }
  };
}

export async function fetchCategories() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/categories?per_page=100`);
    if (data) return data;
  } catch (error) {
    console.log('Error fetching categories:', (error as Error).message);
  }

  // Return default categories if fetch fails
  return [
    { id: 1, name: 'Technology', slug: 'technology', count: 5, description: 'Technology related posts' },
    { id: 2, name: 'Innovation', slug: 'innovation', count: 3, description: 'Innovation related posts' },
    { id: 3, name: 'Digital', slug: 'digital', count: 2, description: 'Digital transformation posts' },
    { id: 4, name: 'Business', slug: 'business', count: 4, description: 'Business related posts' }
  ];
}

export async function fetchCategory(slug: string) {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/categories?slug=${slug}`);
    if (data && data.length > 0) return data[0];
  } catch (error) {
    console.log('Error fetching category:', (error as Error).message);
  }

  // Return default category if fetch fails
  return {
    id: 1,
    name: 'Sample Category',
    slug: slug,
    count: 5,
    description: 'Sample category description'
  };
}

export async function fetchTags() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/tags?per_page=100`);
    if (data) return data;
  } catch (error) {
    console.log('Error fetching tags:', (error as Error).message);
  }

  // Return default tags if fetch fails
  return [
    { id: 1, name: 'Technology', slug: 'technology', count: 3, description: 'Technology related posts' },
    { id: 2, name: 'Innovation', slug: 'innovation', count: 2, description: 'Innovation related posts' },
    { id: 3, name: 'Digital', slug: 'digital', count: 4, description: 'Digital transformation posts' },
    { id: 4, name: 'Future', slug: 'future', count: 3, description: 'Future trends posts' }
  ];
}

export async function fetchTag(slug: string) {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/tags?slug=${slug}`);
    if (data && data.length > 0) return data[0];
  } catch (error) {
    console.log('Error fetching tag:', (error as Error).message);
  }

  // Return default tag if fetch fails
  return {
    id: 1,
    name: 'Sample Tag',
    slug: slug,
    count: 3,
    description: 'Sample tag description'
  };
}

export async function fetchAuthors() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/users?per_page=100`);
    if (data) return data;
  } catch (error) {
    console.log('Error fetching authors:', (error as Error).message);
  }

  // Return default authors if fetch fails
  return [
    { id: 1, name: 'John Doe', slug: 'john-doe', avatar_urls: { 96: '' }, description: 'Tech Writer' },
    { id: 2, name: 'Jane Smith', slug: 'jane-smith', avatar_urls: { 96: '' }, description: 'Digital Expert' },
    { id: 3, name: 'Mike Johnson', slug: 'mike-johnson', avatar_urls: { 96: '' }, description: 'Innovation Specialist' }
  ];
}

export async function fetchAuthor(slug: string) {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/users?slug=${slug}`);
    if (data && data.length > 0) return data[0];
  } catch (error) {
    console.log('Error fetching author:', (error as Error).message);
  }

  // Return default author if fetch fails
  return {
    id: 1,
    name: 'Sample Author',
    slug: slug,
    avatar_urls: { 96: '' },
    description: 'Sample author description'
  };
}

export async function fetchArchives() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?per_page=100`);
    if (data) {
      // Group posts by year and month
      const archives: { [key: string]: number } = {};
      data.forEach((post: any) => {
        const date = new Date(post.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month.toString().padStart(2, '0')}`;
        archives[key] = (archives[key] || 0) + 1;
      });
      return Object.entries(archives).map(([date, count]) => ({ date, count }));
    }
  } catch (error) {
    console.log('Error fetching archives:', (error as Error).message);
  }

  // Return default archives if fetch fails
  return [
    { date: '2024-01', count: 5 },
    { date: '2024-02', count: 3 },
    { date: '2024-03', count: 4 },
    { date: '2023-12', count: 2 }
  ];
}

// Header and Footer Settings
export async function fetchHeaderSettings() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/header-settings`);
    if (data) {
      // Ensure the returned data has all required properties
      return {
        logo: data.logo || '',
        logo_dark: data.logo_dark || '',
        site_title: data.site_title || 'Crafto',
        favicon: data.favicon || '',
        cta_text: data.cta_text || 'Free consultation',
        cta_link: data.cta_link || '/contact',
        phone: data.phone || '+1 234 567 8910',
        top_bar_text: data.top_bar_text || 'Our accounting experts waiting for you! Contact now',
        address: data.address || 'Broadway, 24th Floor, San Francisco',
      };
    }
  } catch (error) {
    console.log('Error fetching header settings:', (error as Error).message);
  }

  // Return default header settings if fetch fails
  return {
    logo: '',
    logo_dark: '',
    site_title: 'Crafto',
    favicon: '',
    cta_text: 'Free consultation',
    cta_link: '/contact',
    phone: '+1 234 567 8910',
    top_bar_text: 'Our accounting experts waiting for you! Contact now',
    address: 'Broadway, 24th Floor, San Francisco',
  };
}

export async function fetchFooterSettings() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/footer-settings`);
    if (data) return data;
  } catch (error) {
    console.log('Error fetching footer settings:', (error as Error).message);
  }

  // Return default footer settings if fetch fails
  return {
    logo: '',
    description: 'A blog dedicated to sharing insights, tips, and stories that matter.',
    social_links: {},
    copyright_text: '© 2024 Blog. All rights reserved.',
    upper_footer_content: '',
  };
}

export async function fetchFooterMenus() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/footer-menus`);
    if (data) return data;
  } catch (error) {
    console.log('Error fetching footer menus:', (error as Error).message);
  }

  // Return default footer menus if fetch fails
  return {
    'footer-1': {
      items: [
        { id: 1, title: 'About', url: '/about', target: '', classes: [], order: 1 },
        { id: 2, title: 'Blog', url: '/news', target: '', classes: [], order: 2 },
        { id: 3, title: 'Contact', url: '/contact', target: '', classes: [], order: 3 },
      ],
      menu_id: null,
      menu_name: 'Main Menu'
    },
    'footer-2': {
      items: [
        { id: 4, title: 'Categories', url: '/categories', target: '', classes: [], order: 1 },
        { id: 5, title: 'Authors', url: '/authors', target: '', classes: [], order: 2 },
        { id: 6, title: 'Archives', url: '/archives', target: '', classes: [], order: 3 },
      ],
      menu_id: null,
      menu_name: 'Blog Menu'
    },
    'footer-3': {
      items: [
        { id: 7, title: 'Privacy Policy', url: '/privacy', target: '', classes: [], order: 1 },
        { id: 8, title: 'Terms of Service', url: '/terms', target: '', classes: [], order: 2 },
        { id: 9, title: 'Sitemap', url: '/sitemap', target: '', classes: [], order: 3 },
      ],
      menu_id: null,
      menu_name: 'Legal Menu'
    }
  };
}



export async function fetchPrimaryMenu() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/primary-menu`);
    if (data) return data;
  } catch (error) {
    console.log('Error fetching primary menu:', (error as Error).message);
  }

  // Return default menu items if fetch fails - Blog-focused menu
  return {
    items: [
      {
        id: 1,
        title: 'Home',
        url: '/',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 1,
      },
      {
        id: 2,
        title: 'Blog',
        url: '/news',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 2,
      },
      {
        id: 3,
        title: 'Categories',
        url: '/categories',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 3,
      },
      {
        id: 4,
        title: 'Authors',
        url: '/authors',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 4,
      },
      {
        id: 5,
        title: 'Contact',
        url: '/contact',
        target: '',
        classes: [],
        menu_item_parent: '0',
        order: 5,
      },
    ],
    menu_id: 0,
    menu_name: 'Blog Menu',
  };
}

// Contact page data
export async function fetchContactData() {
  try {
    const data = await fetchWithTimeout(`${WORDPRESS_API_URL}/wp-json/wp/v2/contact-data`);
    if (data) return data;
  } catch (error) {
    console.log('Error fetching contact data:', (error as Error).message);
  }

  // Return default contact data if fetch fails
  return {
    title: 'Contact Us',
    subtitle: 'Have questions, suggestions, or want to contribute? We\'d love to hear from you!',
    description: "We're here to help you with any questions about our blog content or if you'd like to contribute.",
    address: 'Digital World',
    phone: '+1 234 567 8910',
    email: 'hello@blog.com',
    business_hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM',
    map_embed: '',
    form_title: 'Send us a Message',
    form_description: 'Fill out the form below and we\'ll get back to you as soon as possible.',
    office_locations: [
      {
        name: 'Main Office',
        address: 'Digital World',
        phone: '+1 234 567 8910',
        email: 'hello@blog.com'
      }
    ]
  };
}

// Contact form submission
export async function submitContactForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/contact-submission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Submission failed' };
    }
  } catch (error) {
    console.log('Error submitting contact form:', (error as Error).message);
    return { success: false, error: 'Network error occurred' };
  }
}
