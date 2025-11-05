import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProductsPage } from './pages/ProductsPage';
import { AnalyticsPage } from './pages/AnalyticsPage'; 
import { AdminRoute } from './components/AdminRoute';
import { UserManagementPage } from './pages/UserManagementPage';

function App() {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '16px',
            padding: '16px 24px',
          },
        }}
      />
      <Navbar />
      <main style={{ padding: '0 2rem' }}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/users" element={<UserManagementPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;