import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

const CART_STORAGE_KEY = 'nova_store_cart';
const COUPON_STORAGE_KEY = 'nova_store_coupon';

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const existing = updatedItems[existingItemIndex];
        const newQty = Math.min(existing.quantity + qtyToAdd, product.stock || 999);
        updatedItems[existingItemIndex] = {
          ...existing,
          quantity: newQty,
        };
        addToast(`Updated "${product.title.slice(0, 22)}..." quantity in cart (${newQty})`, 'info');
        return updatedItems;
      } else {
        addToast(`Added "${product.title.slice(0, 22)}..." to cart!`, 'success');
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            discountPercentage: product.discountPercentage || 0,
            thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
            stock: product.stock || 50,
            category: product.category,
            brand: product.brand || '',
            quantity: Math.min(qtyToAdd, product.stock || 999),
          },
        ];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const clampedQty = Math.min(qty, item.stock || 999);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove) {
        addToast(`Removed "${itemToRemove.title.slice(0, 20)}..." from cart`, 'warning');
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    addToast('Your cart has been cleared.', 'info');
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SAVE10') {
      const coupon = { code: 'SAVE10', discountPercent: 10, label: '10% Discount' };
      setAppliedCoupon(coupon);
      addToast('Coupon SAVE10 applied! (10% off)', 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else if (cleanCode === 'WELCOME20') {
      const coupon = { code: 'WELCOME20', discountPercent: 20, label: '20% Welcome Offer' };
      setAppliedCoupon(coupon);
      addToast('Coupon WELCOME20 applied! (20% off)', 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else if (cleanCode === 'FREESHIP') {
      const coupon = { code: 'FREESHIP', freeShipping: true, label: 'Free Shipping' };
      setAppliedCoupon(coupon);
      addToast('Free Shipping coupon applied!', 'success');
      return { success: true, message: 'Free Shipping coupon applied!' };
    } else {
      addToast('Invalid coupon code. Try SAVE10 or WELCOME20', 'danger');
      return { success: false, message: 'Invalid coupon code.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);

  let couponDiscountAmount = 0;
  if (appliedCoupon && appliedCoupon.discountPercent) {
    couponDiscountAmount = (subtotal * appliedCoupon.discountPercent) / 100;
  }

  const shippingCost =
    subtotal === 0
      ? 0
      : appliedCoupon && appliedCoupon.freeShipping
      ? 0
      : subtotal >= 50
      ? 0
      : 9.99;

  const grandTotal = Math.max(0, subtotal - couponDiscountAmount + shippingCost);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        shippingCost,
        couponDiscountAmount,
        grandTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
