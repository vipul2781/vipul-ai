import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ToastContainerComponent from './components/ToastContainerComponent';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="app-container">
                <ScrollToTop />
                <ToastContainerComponent />
                <AppNavbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
