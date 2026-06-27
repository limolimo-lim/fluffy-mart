import React from "react";

function Login({ setUser, setPage, redirectAfterLogin, setRedirectAfterLogin }) {
  const login = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const registeredUsers = JSON.parse(localStorage.getItem("fluffy_registered_users")) || [];

    const matchedUser = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (username === "admin" && password === "123") {
      const userData = { username: "admin", role: "admin" };
      localStorage.setItem("fluffy_user", JSON.stringify(userData));
      setUser(userData);
      
      const activeSessions = JSON.parse(localStorage.getItem("fluffy_active_sessions")) || [];
      if (!activeSessions.some(s => s.username === userData.username)) {
        activeSessions.push(userData);
        localStorage.setItem("fluffy_active_sessions", JSON.stringify(activeSessions));
      }
      
      setPage("dashboard");
    } else if (username === "customer" && password === "123") {
      const userData = { username: "customer", role: "customer" };
      localStorage.setItem("fluffy_user", JSON.stringify(userData));
      setUser(userData);
      
      const activeSessions = JSON.parse(localStorage.getItem("fluffy_active_sessions")) || [];
      if (!activeSessions.some(s => s.username === userData.username)) {
        activeSessions.push(userData);
        localStorage.setItem("fluffy_active_sessions", JSON.stringify(activeSessions));
      }

      if (redirectAfterLogin) {
        setRedirectAfterLogin(false);
        setPage("checkout");
      } else {
        setPage("home");
      }
    } else if (matchedUser) {
      const userData = { 
        username: matchedUser.username, 
        role: matchedUser.role,
        fullName: matchedUser.fullName, 
        email: matchedUser.email,
        phone: matchedUser.phone
      };
      localStorage.setItem("fluffy_user", JSON.stringify(userData));
      setUser(userData);
      
      const activeSessions = JSON.parse(localStorage.getItem("fluffy_active_sessions")) || [];
      if (!activeSessions.some(s => s.username === userData.username)) {
        activeSessions.push(userData);
        localStorage.setItem("fluffy_active_sessions", JSON.stringify(activeSessions));
      }

      if (redirectAfterLogin) {
        setRedirectAfterLogin(false);
        setPage("checkout");
      } else {
        setPage("home");
      }
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto" style={{ maxWidth: "420px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Login</h3>

          <form onSubmit={login}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input name="username" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" className="form-control" required />
            </div>

            <button className="btn btn-success w-100">Login</button>
          </form>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <button className="btn btn-link p-0" onClick={() => setPage("register")} style={{ verticalAlign: "baseline" }}>
              Register here
            </button>
          </div>

          <div className="alert alert-info mt-3 mb-0">
            Admin: <b>admin / 123</b><br />
            Customer: <b>customer / 123</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;