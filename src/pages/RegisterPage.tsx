import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../services/api';
import styles from '../components/Form.module.css';
import { toast } from 'react-hot-toast'; // <-- Import toast
import type { AuthUser } from '../types';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(''); // <-- Remove
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required'); // <-- Use toast
      return;
    }
    try {
      const response = await apiClient.post<{ token: string; user: AuthUser }>(
        '/auth/register',
        { email, password }
      );
      login(response.data.user, response.data.token);
      toast.success('Account created successfully!'); // <-- Success toast
      navigate('/');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      toast.error(message); // <-- Error toast
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ...form inputs... (same as before) */}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={`${styles.button} ${styles.primary}`}>
          Sign Up
        </button>
      </form>
    </div>
  );
};