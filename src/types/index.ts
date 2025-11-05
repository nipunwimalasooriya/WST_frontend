// User data as stored in the JWT payload
export interface AuthUser {
  id: number;
  email: string;
}

// The full product object from the database
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

// Data needed to create or update a product
export type ProductInput = {
  name: string;
  description?: string;
  price: number;
  imageData?: string;
};