import { useEffect, useState } from "react";
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
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("fluffy_user");
  return savedUser ? JSON.parse(savedUser) : null;
});
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setPage("productDetail");
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

const logout = () => {
  localStorage.removeItem("fluffy_user");
  setUser(null);
  setPage("home");
};
  return (
    <>
      <Navbar
  cartCount={cartCount}
  page={page}
  setPage={setPage}
  user={user}
  logout={logout}
/>
      {page === "login" && (
  <Login setUser={setUser} setPage={setPage} />
      )}
      
      {page === "home" && (
        <Home
          addToCart={addToCart}
          setPage={setPage}
          viewProduct={viewProduct}
        />
      )}

      {page === "products" && (
        <Products
          addToCart={addToCart}
          viewProduct={viewProduct}
        />
      )}

      {page === "productDetail" && (
        <ProductDetail
          product={selectedProduct}
          addToCart={addToCart}
          setPage={setPage}
        />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          setPage={setPage}
        />
      )}

      {page === "checkout" && (
        <Checkout
          cart={cart}
          setCart={setCart}
          setPage={setPage}
        />
      )}

      {page === "orders" && <Orders />}

      {page === "dashboard" && <Dashboard />}

      <Footer />
    </>
  );
}

export default App;