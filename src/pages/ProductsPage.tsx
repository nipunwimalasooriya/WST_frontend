import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { ProductCard } from '../components/ProductCard';
import { ProductFormModal } from '../components/ProductFormModal';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal'; // <-- 1. Import new modal
import styles from './ProductsPage.module.css';
import { toast } from 'react-hot-toast';
import type { Product } from '../types';

// We no longer need the custom toast function, so it's been removed.

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State for the CREATE/EDIT modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  
  // State for the DELETE modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // <-- 2. Add state for delete modal
  const [productToDelete, setProductToDelete] = useState<number | null>(null); // <-- 3. Add state for product ID

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<Product[]>('/products');
        setProducts(response.data);
      } catch (err) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- Form Modal Handlers ---
  const handleOpenCreateModal = () => {
    setProductToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = (savedProduct: Product) => {
    if (productToEdit) {
      setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
    } else {
      setProducts([savedProduct, ...products]);
    }
  };
  
  // --- Delete Modal Handlers ---
  
  // 4. This function now just opens the modal
  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id); // Set which product to delete
    setIsDeleteModalOpen(true); // Open the modal
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the modal
    setProductToDelete(null); // Clear the ID
  };

  // 5. This is the function that runs when "Delete" is clicked
  const performDelete = async () => {
    if (productToDelete === null) return; // Safety check

    const toastId = toast.loading('Deleting product...');
    try {
      await apiClient.delete(`/products/${productToDelete}`);
      setProducts(products.filter((p) => p.id !== productToDelete));
      toast.success('Product deleted!', { id: toastId });
    } catch (err) {
      toast.error('Failed to delete product.', { id: toastId });
    }
    
    handleCloseDeleteModal(); // Close the modal
  };


  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading products...</p>;

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Products</h1>
        {isAuthenticated && (
          <button onClick={handleOpenCreateModal} className={styles.addButton}>
            + Add Product
          </button>
        )}
      </header>

      <div className={styles.grid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteProduct} // This now opens the delete modal
            />
          ))
        ) : (
          !loading && <p>No products found. Add one to get started!</p>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isFormModalOpen && (
        <ProductFormModal
          productToEdit={productToEdit}
          onClose={handleCloseFormModal}
          onSave={handleSaveProduct}
        />
      )}
      
      {/* 6. Render the new Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={performDelete}
      />
    </div>
  );
};