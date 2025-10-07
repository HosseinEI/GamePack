export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  role: 'ADMIN' | 'EDITOR' | 'READER';
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  created_at: string;
}

export interface Article {
  slug: string;
  title: string;
  content: string;
  image: string;
  author: User;
  category: Category;
  tags: Tag[];
  published_at: string;
  comments: Comment[];
}

export interface Review {
  id: number;
  game_title: string;
  rating: number;
  content: string;
  image: string;
  reviewer: User;
  published_at: string;
}

export interface Ad {
  id: number;
  title: string;
  image: string;
  link: string;
}