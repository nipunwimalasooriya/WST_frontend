import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import styles from './Modal.module.css';
import { toast } from 'react-hot-toast'; // <-- Import toast
import type { Product, ProductInput } from '../types';

interface ProductFormModalProps {
  // ... (props are the same)
  productToEdit: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export const ProductFormModal = ({
  productToEdit,
  onClose,
  onSave,
}: ProductFormModalProps) => {
  const [formData, setFormData] = useState<ProductInput>({
    name: '', description: '', price: 0, imageData: '',
  });
  // const [error, setError] = useState(''); // <-- Remove

  // ... (useEffect and handleChange are the same)
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        description: productToEdit.description || '',
        price: productToEdit.price,
        imageData: productToEdit.imageData || '',
      });
    } else {
      setFormData({ name: '', description: '', price: 0, imageData: '' });
    }
  }, [productToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageData: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let savedProduct: Product;
      const toastId = toast.loading('Saving product...'); // <-- Loading toast

      if (productToEdit) {
        const response = await apiClient.put<Product>(
          `/products/${productToEdit.id}`, formData
        );
        savedProduct = response.data;
      } else {
        const response = await apiClient.post<Product>('/products', formData);
        savedProduct = response.data;
      }
      
      toast.success('Product saved!', { id: toastId }); // <-- Success toast
      onSave(savedProduct);
      onClose();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to save product';
      toast.error(message); // <-- Error toast
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>
          {productToEdit ? 'Edit Product' : 'Create Product'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* ... all form inputs are the same ... */}
          {/* We remove the {error} <p> tag */}
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text" name="name" id="name"
              value={formData.name} onChange={handleChange}
              className={styles.input} required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description" id="description"
              value={formData.description} onChange={handleChange}
              className={styles.textarea}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="price">Price</label>
            <input
              type="number" name="price" id="price"
              step="0.01" value={formData.price} onChange={handleChange}
              className={styles.input} required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="image">Image</label>
            <input
              type="file" name="image" id="image"
              accept="image/*" onChange={handleImageChange}
            />
            {formData.imageData && (
              <img src={formData.imageData} alt="Preview" className={styles.imagePreview} />
            )}
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};