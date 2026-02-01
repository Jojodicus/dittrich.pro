import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allPosts = await getCollection('blog');
  const sortedPosts = allPosts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const SITE_TITLE = 'dittrich.pro';
  const SITE_DESCRIPTION =
    'Personal portfolio website of Johannes Dittrich - Developer, tinkerer, and occasional writer.';

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site || 'https://dittrich.pro',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      content: post.body.substring(0, 500) + '...',
    })),
    customData: `<language>en-us</language>`,
  });
}
