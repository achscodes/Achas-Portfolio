export type PhotoCategory =
  | "Events"
  | "Portraits"
  | "Sports"
  | "Street Photography";

export type PhotoStatus = "draft" | "published" | "archived";

export interface Photo {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: PhotoCategory;
  categoryId?: string;
  projectId?: string;
  project?: string;
  dateTaken?: string;
  location?: string;
  featured?: boolean;
  status: PhotoStatus;
  storagePath?: string;
  createdAt?: string;
  updatedAt?: string;
}