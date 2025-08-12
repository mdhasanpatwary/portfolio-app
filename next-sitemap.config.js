module.exports = {
  siteUrl: 'https://patwary.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  transform: async (config, url) => {
    const priorityMap = {
      '/': 1.0,
      '/about': 0.9,
      '/projects': 0.9,
      '/blog': 0.8,
      '/contact': 0.8,
      '/css-tips': 0.7,
    };
    return {
      loc: url,
      changefreq: 'weekly',
      priority: priorityMap[url] ?? 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};