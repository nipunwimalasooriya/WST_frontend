import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProductsPage } from './pages/ProductsPage';
import { AnalyticsPage } from './pages/AnalyticsPage'; // <-- Import

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
          <Route path="/analytics" element={<AnalyticsPage />} /> {/* <-- Add Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;