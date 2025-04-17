import { MetadataRoute } from 'next'

// IMPORTANT: Replace with your actual production domain
const baseUrl = 'https://your-ghiblio-ai-domain.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(), // Or a specific date for the homepage
      changeFrequency: 'monthly', // How often the content might change
      priority: 1.0, // Priority relative to other URLs (1.0 is highest)
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(), // Or the date the policy was last updated
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(), // Or the date the terms were last updated
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // Add other important public pages here if needed
  ]
} 