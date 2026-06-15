import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Route - No Layout */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Main Store Routes with Layout */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              {/* Fallback */}
              <Route path="*" element={
                <div className="py-32 text-center">
                  <h1 className="text-4xl font-serif font-bold mb-4">404 - Page Not Found</h1>
                  <a href="/" className="text-[#D4AF37] hover:underline">Return to Home</a>
                </div>
              } />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}
