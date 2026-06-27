import React, { useState } from "react";

function Navbar({ cart, setCart, cartCount, page, setPage, user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (targetPage) => {
    setPage(targetPage);
    setIsOpen(false); 
    setIsCartOpen(false);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
      localStorage.removeItem("fluffy_cart");
    }
  };

  const cartTotal = cart ? cart.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;

  return (
    <>
      <nav
        className="navbar navbar-dark sticky-top shadow-sm"
        style={{
          backgroundColor: "#1f4d36",
          padding: "0.75rem 1rem",
          zIndex: 1030
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <button
            className="navbar-brand btn btn-link text-white text-decoration-none fw-bold m-0 p-0"
            onClick={() => handleNavigate("home")}
          >
            Fluffy Mart
          </button>

          <div className="d-flex align-items-center gap-3">
            <button className="nav-btn m-0" onClick={() => setIsCartOpen(true)}>
              Cart ({cartCount})
            </button>

            <button
              className="btn text-white p-2 border-0"
              type="button"
              onClick={() => setIsOpen(true)}
              style={{ fontSize: "1.5rem", lineHeight: "1" }}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {(isOpen || isCartOpen) && (
        <div
          onClick={() => { setIsOpen(false); setIsCartOpen(false); }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(2px)",
            zIndex: 1040,
            transition: "opacity 0.3s ease-in-out"
          }}
        />
      )}

      {/* SLIDING CART DRAWER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "320px",
          height: "100vh",
          backgroundColor: "var(--card-bg, #ffffff)",
          color: "var(--text-color, #212529)",
          boxShadow: "5px 0 25px rgba(0,0,0,0.3)",
          zIndex: 1050,
          transform: isCartOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="m-0 fw-bold" style={{ color: "#1f4d36" }}>Your Cart</h5>
          <button className="btn p-0 fs-3 border-0" onClick={() => setIsCartOpen(false)} style={{ lineHeight: "1" }}>✕</button>
        </div>

        <div className="flex-grow-1 overflow-auto mb-3">
          {!cart || cart.length === 0 ? (
            <p className="text-muted text-center mt-5">Your cart is currently empty.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom pb-2">
                  <div>
                    <div className="fw-bold small">{item.name}</div>
                    <div className="text-muted extra-small">${item.price} x {item.quantity}</div>
                  </div>
                  <span className="fw-bold text-success">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart && cart.length > 0 && (
          <div className="border-top pt-3">
            <div className="d-flex justify-content-between align-items-center mb-3 fw-bold">
              <span>Total:</span>
              <span className="text-success fs-5">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn text-white w-100 mb-2" style={{ backgroundColor: "#1f4d36" }} onClick={() => handleNavigate("cart")}>
              Go to Full Checkout
            </button>
            <button className="btn btn-outline-danger w-100 btn-sm" onClick={handleClearCart}>
              Clear All Items
            </button>
          </div>
        )}
      </div>

      {/* SLIDING SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "300px",
          height: "100vh",
          backgroundColor: "#1f4d36",
          boxShadow: "-5px 0 25px rgba(0,0,0,0.3)",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          padding: "1.5rem"
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="text-white m-0 fw-bold">Menu</h5>
          <button
            className="btn text-white p-0 fs-3 border-0"
            onClick={() => setIsOpen(false)}
            style={{ lineHeight: "1" }}
          >
            ✕
          </button>
        </div>

        <div className="d-flex flex-column gap-2">
          <button 
            className="btn text-white text-start py-2 px-3 rounded border-0" 
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            onClick={() => handleNavigate("home")}
          >
            Home
          </button>
          
          <button 
            className="btn text-white text-start py-2 px-3 rounded border-0" 
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            onClick={() => handleNavigate("products")}
          >
            Shop Now
          </button>

          {user && (
            <button 
              className="btn text-white text-start py-2 px-3 rounded border-0" 
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              onClick={() => handleNavigate("orders")}
            >
              Orders
            </button>
          )}

          {user?.role === "admin" && (
            <button 
              className="btn text-white text-start py-2 px-3 rounded border-0" 
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              onClick={() => handleNavigate("dashboard")}
            >
              Dashboard
            </button>
          )}

          <hr className="border-secondary my-3" />

          {/* Settings link is now available to all users (Guest or Authenticated) */}
          <button 
            className="btn text-white text-start py-2 px-3 rounded border-0 fw-bold" 
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onClick={() => handleNavigate("settings")}
          >
            ⚙️ Settings
          </button>

          {user ? (
            <button 
              className="btn text-warning text-start py-2 px-3 rounded border-0 mt-2" 
              onClick={() => { logout(); setIsOpen(false); }}
            >
              Logout
            </button>
          ) : (
            <button 
              className="btn text-info text-start py-2 px-3 rounded border-0 mt-2" 
              onClick={() => handleNavigate("login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;