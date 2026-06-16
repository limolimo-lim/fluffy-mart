function Navbar({ cartCount, page, setPage, user, logout }) {
  return (
    <nav
  className="navbar navbar-dark sticky-top"
  style={{
    backgroundColor: "#1f4d36"
  }}
>
      <div className="container">
        <button
          className="navbar-brand btn btn-link text-white text-decoration-none"
          onClick={() => setPage("home")}
        >
          Fluffy Mart
        </button>

        <div className="ms-auto d-flex gap-2">
          <button className="btn btn-outline-light" onClick={() => setPage("home")}>
            Home
          </button>

<button
  className="nav-btn"
  onClick={() => setPage("products")}
>
  Shop Now
</button>

          {user && (
  <button
    className="nav-btn"
    onClick={() => setPage("orders")}
  >
    Orders
  </button>
)}

{user?.role === "admin" && (
  <button
    className="nav-btn"
    onClick={() => setPage("dashboard")}
  >
    Dashboard
  </button>
)}

<button
  className="nav-btn"
  onClick={() => setPage("cart")}
>
  Cart ({cartCount})
</button>

{user ? (
  <button
    className="logout-btn"
    onClick={logout}
  >
    Logout
  </button>
) : (
  <button
    className="login-btn"
    onClick={() => setPage("login")}
  >
    Login
  </button>
)}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;