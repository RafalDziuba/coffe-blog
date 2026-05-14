import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('posts')).sort(
    (a, b) =>
      new Date(b.data.publishDate).getTime() -
      new Date(a.data.publishDate).getTime(),
  )

  const siteUrl = context.site?.href ?? 'https://zakawieni.pl/'
  const siteString = siteUrl.replace(/\/?$/, '')

  return rss({
    title: 'Zakawieni — blog o kawie speciality',
    description:
      'Kawa speciality, kursy baristyczne i porady dla domowych bariistów — artykuły ZAKAWIENI.',
    site: siteString,
    items: posts.map((post) => ({
      link: `/articles/${post.slug}`,
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      description: post.data.description,
      categories: post.data.tags,
      author: post.data.author,
    })),
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    trailingSlash: false,
  })
}
