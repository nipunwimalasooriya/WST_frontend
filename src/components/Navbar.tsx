import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Close menu on logout
    navigate('/login');
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <Link to="/" className={styles.brand} onClick={closeMenu}>
            ProductsApp
          </Link>
          {/* Desktop Links */}
          <div className={styles.desktopLinks}>
            <Link to="/analytics">Analytics</Link>
          </div>
        </div>

        {/* Desktop Links & Auth */}
        <div className={styles.desktopLinks}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {isAuthenticated ? (
            <>
              <span>Hi, {user?.email}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className={styles.hamburgerButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {/* Create a CSS-only hamburger icon */}
          <span className={styles.hamburgerIcon}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" onClick={closeMenu}>
            Products
          </Link>
          <Link to="/analytics" onClick={closeMenu}>
            Analytics
          </Link>
          <hr className={styles.divider} />
          {isAuthenticated ? (
            <>
              <span className={styles.mobileUser}>Hi, {user?.email}</span>
              <button onClick={handleLogout} className={styles.mobileLogoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
          <hr className={styles.divider} />
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
        </div>
      )}
    </>
  );
};