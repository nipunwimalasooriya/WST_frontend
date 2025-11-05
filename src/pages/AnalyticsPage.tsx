import { useState, useEffect, useMemo } from 'react';
import apiClient from '../services/api';
import { toast } from 'react-hot-toast';
import styles from './AnalyticsPage.module.css';
import type { Product } from '../types';

// A simple card component for displaying a stat
const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className={styles.statCard}>
    <h3 className={styles.statTitle}>{title}</h3>
    <p className={styles.statValue}>{value}</p>
  </div>
);

export const AnalyticsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<Product[]>('/products');
        setProducts(response.data);
      } catch (err) {
        toast.error('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Calculate stats using useMemo
  const stats = useMemo(() => {
    if (products.length === 0) {
      return { total: 0, avgPrice: 0, highest: 0, lowest: 0 };
    }

    const prices = products.map(p => Number(p.price));
    const total = products.length;
    const sum = prices.reduce((a, b) => a + b, 0);
    const avgPrice = sum / total;
    const highest = Math.max(...prices);
    const lowest = Math.min(...prices);

    return { total, avgPrice, highest, lowest };
  }, [products]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading analytics...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Product Analytics</h1>
      <div className={styles.grid}>
        <StatCard title="Total Products" value={stats.total} />
        <StatCard 
          title="Average Price" 
          value={`$${stats.avgPrice.toFixed(2)}`} 
        />
        <StatCard 
          title="Highest Price" 
          value={`$${stats.highest.toFixed(2)}`} 
        />
        <StatCard 
          title="Lowest Price" 
          value={`$${stats.lowest.toFixed(2)}`} 
        />
      </div>
    </div>
  );
};