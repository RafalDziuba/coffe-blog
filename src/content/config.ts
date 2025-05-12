import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    readTime: z.string(),
    featured: z.boolean().optional().default(false),
  }),
})

export const collections = {
  posts: postsCollection,
}
