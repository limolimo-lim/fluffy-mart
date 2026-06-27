import React from "react";

function Register({ setPage }) {
  const handleRegister = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("fluffy_registered_users")) || [];

    if (registeredUsers.some((user) => user.username === username)) {
      alert("Username already exists! Please choose another one.");
      return;
    }

    const newUser = {
      username,
      fullName,
      email,
      phone,
      password,
      role: "customer"
    };

    registeredUsers.push(newUser);
    localStorage.setItem("fluffy_registered_users", JSON.stringify(registeredUsers));

    alert("Registration successful! Proceeding to login.");
    setPage("login");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto" style={{ maxWidth: "420px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Register</h3>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input name="username" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input name="fullName" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input name="email" type="email" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input name="phone" type="tel" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input name="confirmPassword" type="password" className="form-control" required />
            </div>

            <button className="btn btn-success w-100">Register</button>
          </form>

          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <button 
              className="btn btn-link p-0" 
              onClick={() => setPage("login")}
              style={{ verticalAlign: "baseline" }}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;