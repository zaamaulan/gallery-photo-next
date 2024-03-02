export type Photo = {
  id: string;
  userId: string | null;
  title: string;
  description: string;
  publishedAt: Date;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}