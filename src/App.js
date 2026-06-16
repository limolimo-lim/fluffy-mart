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

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("fluffy_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("fluffy_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("fluffy_cart", JSON.stringify(cart));
  }, [cart]);

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

  const logout = () => {
    localStorage.removeItem("fluffy_user");
    setUser(null);
    navigate("/");
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

  return (
    <>
      <Navbar
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
              setPage={handlePageChange}
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
            />
          }
        />

        <Route path="/orders" element={<Orders />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;