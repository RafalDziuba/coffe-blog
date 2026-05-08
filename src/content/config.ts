import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string(),
    image: image(),
    tags: z.array(z.string()),
    readTime: z.string(),
    featured: z.boolean().optional().default(false),
  }),
})

const courses = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      price: z.union([z.number(), z.string()]),
      originalPrice: z.union([z.number(), z.string()]).optional(),
      image: image(),
      badge: z.string().optional(),
      badgeColor: z.enum(['blue', 'green', 'red', 'yellow']).optional(),
      status: z.enum(['available', 'coming-soon', 'sold-out']),
      launchDate: z.date().optional(),
      duration: z.string(),
      level: z.enum(['beginner', 'intermediate', 'advanced']),
      lessons: z.union([z.number(), z.string()]),
      rating: z.union([z.number(), z.string()]).optional(),
      features: z.array(z.string()),
      instructor: z.string(),
      category: z.string(),
      featured: z.boolean().default(false),
      order: z.number().default(999),
    }),
})

export const collections = {
  posts: postsCollection,
  courses: courses,
}
