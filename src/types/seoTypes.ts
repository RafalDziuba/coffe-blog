export interface Props {
  title: string;
  description: string;
  canonicalURL?: string;
  image?: string;
  type?: 'website' | 'article';
  publishDate?: string;
  updatedDate?: string;
  author?: string;
  tags?: string[];
  readTime?: string;
}
