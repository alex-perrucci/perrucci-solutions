import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://perruccisolutions.com/',
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: 'https://perruccisolutions.com/siti-web-parma',
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ];
}
