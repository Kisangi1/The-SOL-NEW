export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageData?: string;
  tags: string[]; 
  createdAt: string;
  updatedAt: string;
  authorName: string;
  authorId?: string;
  category?: string;
  excerpt?: string; 
}