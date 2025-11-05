
import { useAuth } from '../hooks/useAuth';
import type { Product } from '../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const { isAuthenticated } = useAuth();
  
  const placeholderImage = 'https://via.placeholder.com/400x200?text=No+Image';

  return (
    <div className={styles.card}>
      <img
        src={product.imageData || placeholderImage}
        alt={product.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${Number(product.price).toFixed(2)}</p>
        
        {isAuthenticated && (
          <div className={styles.actions}>
            <button
              onClick={() => onEdit(product)}
              className={styles.editButton}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};