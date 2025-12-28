import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  // LocalStorage'dan veri yükleme
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('urka-gaz-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('urka-gaz-orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [customer, setCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem('urka-gaz-customer');
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });

  // LocalStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem('urka-gaz-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('urka-gaz-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('urka-gaz-customer', JSON.stringify(customer));
    } else {
      localStorage.removeItem('urka-gaz-customer');
    }
  }, [customer]);

  // Login işlemi
  const handleLogin = (customerData, rememberMe) => {
    setCustomer(customerData);
    if (rememberMe) {
      localStorage.setItem('urka-gaz-customer', JSON.stringify(customerData));
    }
  };

  // Logout işlemi
  const handleLogout = () => {
    setCustomer(null);
    setCart([]);
    localStorage.removeItem('urka-gaz-customer');
    localStorage.removeItem('urka-gaz-cart');
  };

  // Sepet işlemleri
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Sipariş işlemleri
  const handleCreateOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
    setCart([]); // Sepeti temizle
  };

  // Aktif siparişler (hazırlanıyor veya yolda)
  const activeOrders = orders.filter(
    (order) => order.status === 'hazırlanıyor' || order.status === 'yolda'
  );

  // Sepet toplam miktarı
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Giriş yapılmamışsa LoginPage'e yönlendir
  if (!customer) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage 
                activeOrders={activeOrders} 
                customer={customer}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProductsPage 
                onAddToCart={handleAddToCart}
                priceGroup={customer.priceGroup}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCreateOrder={handleCreateOrder}
                customer={customer}
              />
            }
          />
          <Route
            path="/orders"
            element={<OrdersPage orders={orders} />}
          />
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav cartCount={cartCount} />
      </div>
    </Router>
  );
}

export default App;
