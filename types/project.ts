export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  date?: string;
  location?: string;
  published: boolean;
}