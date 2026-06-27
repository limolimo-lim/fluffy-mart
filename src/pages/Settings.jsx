import React, { useState, useEffect } from "react";

function Settings({ user, setUser, setPage, setRedirectAfterLogin }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("fluffy_theme") === "dark"
  );

  const [activeSessions, setActiveSessions] = useState(() => {
    return JSON.parse(localStorage.getItem("fluffy_active_sessions")) || [];
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("fluffy_theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("fluffy_theme", "light");
    }
  }, [isDarkMode]);

  // --- SAFE USER EXTRACTION LOGIC ---
  let activeUserObj = null;
  if (user && typeof user === "object") {
    if (Array.isArray(user)) {
      activeUserObj = user.length > 0 ? user : null;
    } else {
      activeUserObj = user;
    }
  }

  const currentUsername = activeUserObj && typeof activeUserObj === "object" ? activeUserObj.username || "" : "";
  const isGuest = !currentUsername;
  // ----------------------------------

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (isGuest) return;
    
    const registeredUsers = JSON.parse(localStorage.getItem("fluffy_registered_users")) || [];
    
    let dbUserIndex = registeredUsers.findIndex((u) => u.username === currentUsername);
    
    if (dbUserIndex === -1 && (currentUsername === "admin" || currentUsername === "customer")) {
      const systemDefaultAccount = {
        username: currentUsername,
        fullName: currentUsername === "admin" ? "System Administrator" : "Default Customer",
        email: `${currentUsername}@fluffymart.local`,
        phone: "000-000-0000",
        password: "123",
        role: currentUsername
      };
      registeredUsers.push(systemDefaultAccount);
      localStorage.setItem("fluffy_registered_users", JSON.stringify(registeredUsers));
      dbUserIndex = registeredUsers.length - 1;
    }

    if (dbUserIndex === -1) {
      alert("Error: Core account profile not found.");
      return;
    }

    if (registeredUsers[dbUserIndex].password !== currentPassword) {
      alert("Current password verification failed.");
      return;
    }

    registeredUsers[dbUserIndex].password = newPassword;
    localStorage.setItem("fluffy_registered_users", JSON.stringify(registeredUsers));
    
    const updatedSessions = activeSessions.map((s) => 
      s.username === currentUsername ? { ...s, password: newPassword } : s
    );
    setActiveSessions(updatedSessions);
    localStorage.setItem("fluffy_active_sessions", JSON.stringify(updatedSessions));

    const updatedCurrentUser = { ...activeUserObj, password: newPassword };
    localStorage.setItem("fluffy_user", JSON.stringify(updatedCurrentUser));
    setUser(updatedCurrentUser);

    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleSwitchAccount = (targetUsername) => {
    const targetSession = activeSessions.find((s) => s.username === targetUsername);
    if (targetSession) {
      localStorage.setItem("fluffy_user", JSON.stringify(targetSession));
      setUser(targetSession);
      alert(`Switched to account: ${targetUsername}`);
    }
  };

  const handleRemoveSessionFromTray = (e, targetUsername) => {
    e.stopPropagation();

    if (!window.confirm(`Remove @${targetUsername} from the fast switcher list?`)) {
      return;
    }

    const updatedSessions = activeSessions.filter((s) => s.username !== targetUsername);
    setActiveSessions(updatedSessions);
    localStorage.setItem("fluffy_active_sessions", JSON.stringify(updatedSessions));

    if (targetUsername === currentUsername) {
      if (updatedSessions.length > 0) {
        localStorage.setItem("fluffy_user", JSON.stringify(updatedSessions));
        setUser(updatedSessions);
        alert(`Removed active session. Automatically switched to: @${updatedSessions.username}`);
      } else {
        localStorage.removeItem("fluffy_user");
        setUser(null);
        alert("All fast switcher profiles cleared.");
      }
    }
  };

  const handleDeleteAccount = () => {
    if (isGuest) return;
    if (!window.confirm("Are you absolutely sure you want to permanently delete this account? This cannot be undone.")) return;

    const registeredUsers = JSON.parse(localStorage.getItem("fluffy_registered_users")) || [];
    const updatedDb = registeredUsers.filter((u) => u.username !== currentUsername);
    localStorage.setItem("fluffy_registered_users", JSON.stringify(updatedDb));

    const updatedSessions = activeSessions.filter((s) => s.username !== currentUsername);
    setActiveSessions(updatedSessions);
    localStorage.setItem("fluffy_active_sessions", JSON.stringify(updatedSessions));

    if (updatedSessions.length > 0) {
      localStorage.setItem("fluffy_user", JSON.stringify(updatedSessions));
      setUser(updatedSessions);
      alert("Current profile deleted. Switched to next active account session.");
    } else {
      localStorage.removeItem("fluffy_user");
      setUser(null);
      alert("Account deleted completely. Returning to home page.");
      setPage("home");
    }
  };

  const handleAddNewAccount = () => {
    setRedirectAfterLogin(false); 
    setPage("login");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4" style={{ color: "#1f4d36", fontWeight: "bold" }}>
        Settings {isGuest && <span className="fs-5 text-muted fw-normal">(Guest Mode)</span>}
      </h2>
      
      {/* Preferences Card - Visible to both registered users and guests */}
      <div className="card shadow-sm mb-4" style={{ border: "1px solid #1f4d36" }}>
        <div className="card-header text-white" style={{ backgroundColor: "#1f4d36" }}>Preferences</div>
        <div className="card-body">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeToggle"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              style={{ cursor: "pointer" }}
            />
            <label className="form-check-label" htmlFor="darkModeToggle">
              Enable Dark Mode Theme Layout
            </label>
          </div>
        </div>
      </div>

      {/* Account controls are securely locked behind authentication checks */}
      {!isGuest && (
        <>
          {/* Account Switcher Tray */}
          <div className="card shadow-sm mb-4" style={{ border: "1px solid #1f4d36" }}>
            <div className="card-header text-white" style={{ backgroundColor: "#1f4d36" }}>Account Switcher Tray</div>
            <div className="card-body">
              <label className="form-label d-block fw-bold" style={{ color: "#1f4d36" }}>Active Profiles Loaded:</label>
              <div className="list-group mb-3">
                {activeSessions.map((session) => (
                  <div
                    key={session.username}
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    style={{
                      backgroundColor: session.username === currentUsername ? "#1f4d36" : "transparent",
                      color: session.username === currentUsername ? "#fff" : "inherit",
                      cursor: session.username === currentUsername ? "default" : "pointer",
                      paddingRight: "0.75rem"
                    }}
                    onClick={() => session.username !== currentUsername && handleSwitchAccount(session.username)}
                  >
                    <div>
                      <span>{session.fullName || session.username} (@{session.username})</span>
                      {session.username === currentUsername && (
                        <span className="badge bg-light ms-2" style={{ color: "#1f4d36" }}>Active Now</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm border-0 p-1"
                      style={{
                        color: session.username === currentUsername ? "rgba(255,255,255,0.7)" : "#dc3545",
                        fontSize: "1.1rem"
                      }}
                      onClick={(e) => handleRemoveSessionFromTray(e, session.username)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button 
                className="btn w-100" 
                style={{ border: "1px solid #1f4d36", color: "#1f4d36", backgroundColor: "transparent" }}
                onClick={handleAddNewAccount}
              >
                + Add / Link Another Existing Account Profile
              </button>
            </div>
          </div>

          {/* Security Controls */}
          <div className="card shadow-sm mb-4" style={{ border: "1px solid #1f4d36" }}>
            <div className="card-header text-white" style={{ backgroundColor: "#1f4d36" }}>Security Controls</div>
            <div className="card-body">
              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label className="form-label">Current Account Password</label>
                  <div className="input-group">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      className="form-control"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    >
                      {showCurrentPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">New Target Password String</label>
                  <div className="input-group">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    >
                      {showNewPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <button className="btn text-white w-100" style={{ backgroundColor: "#1f4d36" }}>Apply Update Password</button>
              </form>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card shadow-sm mb-5" style={{ border: "1px solid #dc3545" }}>
            <div className="card-header text-white" style={{ backgroundColor: "#dc3545" }}>Danger Zone Operations</div>
            <div className="card-body text-center">
              <p className="card-text text-muted small">
                Purges active user history credentials permanently from system registries.
              </p>
              <button className="btn text-white w-100" style={{ backgroundColor: "#dc3545" }} onClick={handleDeleteAccount}>
                Permanently Terminate Account Data Profile
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Settings;