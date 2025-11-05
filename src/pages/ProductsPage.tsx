import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { ProductCard } from '../components/ProductCard';
import { ProductFormModal } from '../components/ProductFormModal';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal'; 
import styles from './ProductsPage.module.css';
import { toast } from 'react-hot-toast';
import type { Product } from '../types';


export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [productToDelete, setProductToDelete] = useState<number | null>(null); 

  const { isAuthenticated, isAdmin } = useAuth();

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
  
  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id); 
    setIsDeleteModalOpen(true); 
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); 
    setProductToDelete(null); 
  };

  const performDelete = async () => {
    if (productToDelete === null) return; 

    const toastId = toast.loading('Deleting product...');
    try {
      await apiClient.delete(`/products/${productToDelete}`);
      setProducts(products.filter((p) => p.id !== productToDelete));
      toast.success('Product deleted!', { id: toastId });
    } catch (err) {
      toast.error('Failed to delete product.', { id: toastId });
    }
    
    handleCloseDeleteModal(); 
  };


  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading products...</p>;

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Products</h1>
        {isAdmin && (
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
              onDelete={handleDeleteProduct} 
            />
          ))
        ) : (
          !loading && <p>No products found. Add one to get started!</p>
        )}
      </div>

      {isFormModalOpen && (
        <ProductFormModal
          productToEdit={productToEdit}
          onClose={handleCloseFormModal}
          onSave={handleSaveProduct}
        />
      )}
      
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={performDelete}
      />
    </div>
  );
};