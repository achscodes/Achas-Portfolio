export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface DatabasePhoto {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  storage_path: string | null;
  category_id: string | null;
  project_id: string | null;
  date_taken: string | null;
  location: string | null;
  featured: boolean;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
}

export interface DatabaseProject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  date: string | null;
  location: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseInquiry {
  id: string;
  name: string;
  email: string;
  project_type: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
}