import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const MAX_CONTENT_LENGTH = 1200;

function toPlainText(markdown = '') {
  return markdown
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/^\s*(import|export)\s.+$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\[\^.+?\]:.+$/gm, '')
    .replace(/[*_~|]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildFeedContent(body, fallback = '') {
  const plainText = toPlainText(body);

  if (!plainText) {
    return fallback;
  }

  if (plainText.length <= MAX_CONTENT_LENGTH) {
    return plainText;
  }

  return `${plainText.slice(0, MAX_CONTENT_LENGTH).trimEnd()}...`;
}

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
      content: buildFeedContent(post.body, post.data.description),
    })),
    customData: `<language>en-us</language>`,
  });
}
