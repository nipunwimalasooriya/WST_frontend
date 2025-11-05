import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { toast } from 'react-hot-toast';
import styles from './UserManagementPage.module.css';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types';

// We must create a new User type for this page (without password_hash)
type DisplayUser = {
  id: number;
  email: string;
  role: UserRole;
  created_at: string;
}

export const UserManagementPage = () => {
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: adminUser } = useAuth(); // Get the currently logged-in admin

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<DisplayUser[]>('/users');
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, newRole: UserRole) => {
    const toastId = toast.loading('Updating role...');
    try {
      await apiClient.put(`/users/${userId}/role`, { role: newRole });
      
      // Update the role in our local state to reflect the change
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));
      toast.success('User role updated!', { id: toastId });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update role';
      toast.error(message, { id: toastId });
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>User Management</h1>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Member Since</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                {adminUser?.id === user.id ? (
                  <span className={styles.selfText}> (This is you) </span>
                ) : (
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                    className={styles.roleSelect}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};