import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("fluffy_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error loading user session:", error);
      return null;
    }
  });
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("fluffy_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fluffy_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("fluffy_theme");
    if (savedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, []);

  const addToCart = (product) => {
    const existProduct = cart.find((item) => item.id === product.id);

    if (existProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    alert("Product added to cart!");
  };

  const updateQuantity = (id, amount) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    if (location.pathname === "/productDetail") {
      return;
    }
    navigate("/productDetail");
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // --- FIXED LOGOUT METHOD ---
  const logout = () => {
    const activeSessions = JSON.parse(localStorage.getItem("fluffy_active_sessions")) || [];
    
    // Safely parse username whether user is wrapped in an array or direct object
    const activeUserObj = user && Array.isArray(user) ? user : user;
    const currentUsername = activeUserObj?.username || "";

    const updatedSessions = activeSessions.filter((s) => s.username !== currentUsername);
    localStorage.setItem("fluffy_active_sessions", JSON.stringify(updatedSessions));

    localStorage.removeItem("fluffy_user");
    setUser(null);

    if (updatedSessions.length > 0) {
      // FIX: Store the single first object profile element, NOT the whole raw session array state
      localStorage.setItem("fluffy_user", JSON.stringify(updatedSessions));
      setUser(updatedSessions);
      alert(`Logged out. Switched to next active switcher account profile: @${updatedSessions.username}`);
      navigate("/");
    } else {
      alert("Logged out successfully.");
      navigate("/");
    }
  };

  const getCurrentPageName = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/products") return "products";
    if (location.pathname === "/productDetail") return "productDetail";
    if (location.pathname === "/cart") return "cart";
    if (location.pathname === "/checkout") return "checkout";
    if (location.pathname === "/orders") return "orders";
    if (location.pathname === "/dashboard") return "dashboard";
    if (location.pathname === "/login") return "login";
    if (location.pathname === "/register") return "register";
    if (location.pathname === "/settings") return "settings";
    return "home";
  };

  const handlePageChange = (targetPage) => {
    const targetPath = targetPage === "home" ? "/" : `/${targetPage}`;
    if (location.pathname === targetPath) {
      return; 
    }
    navigate(targetPath);
  };

  const handleNavbarNavigate = (targetPage) => {
    if (targetPage === "products") {
      setSelectedCategory("All");
    }
    handlePageChange(targetPage);
  };

  const handleCheckoutGate = () => {
    if (!user) {
      alert("Please log in or register an account to complete your checkout!");
      setRedirectAfterLogin(true);
      handlePageChange("login");
    } else {
      handlePageChange("checkout");
    }
  };

  return (
    <>
      <Navbar
        cart={cart}
        setCart={setCart}
        cartCount={cartCount}
        page={getCurrentPageName()}
        setPage={handleNavbarNavigate}
        user={user}
        logout={logout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              setPage={handlePageChange}
              viewProduct={viewProduct}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />

        <Route
          path="/products"
          element={
            <Products
              addToCart={addToCart}
              viewProduct={viewProduct}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login 
              setUser={setUser} 
              setPage={handlePageChange} 
              redirectAfterLogin={redirectAfterLogin}
              setRedirectAfterLogin={setRedirectAfterLogin}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register 
              setPage={handlePageChange} 
            />
          }
        />

        <Route
          path="/productDetail"
          element={
            <ProductDetail
              product={selectedProduct}
              addToCart={addToCart}
              setPage={handlePageChange}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              onCheckoutClick={handleCheckoutGate}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
              setPage={handlePageChange}
              user={user}
            />
          }
        />

        <Route path="/orders" element={<Orders />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/settings"
          element={
            <Settings
              user={user}
              setUser={setUser}
              setPage={handlePageChange}
              setRedirectAfterLogin={setRedirectAfterLogin}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;