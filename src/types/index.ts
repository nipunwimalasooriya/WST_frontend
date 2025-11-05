export type UserRole = 'USER' | 'ADMIN';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface Product {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  price: number;
  imageData: string | null;
  created_at: string;
  updated_at: string;
}

export type ProductInput = {
  name: string;
  description?: string;
  price: number;
  imageData?: string;
};