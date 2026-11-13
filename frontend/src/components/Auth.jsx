import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Auth({ onLoginSuccess }) {
  // Inputs for Register
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("staff");

  // Inputs for Login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Status message
  const [message, setMessage] = useState("");

  // 1. REGISTER FUNCTION (.then style)
  function handleRegister() {
    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: regUsername,
        password: regPassword,
        role: regRole,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("User registered successfully! Now please log in.");
          setRegUsername("");
          setRegPassword("");
        }
      });
  }

  // 2. LOGIN FUNCTION (.then style)
  function handleLogin() {
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("role", data.role);
          onLoginSuccess(data.access_token, data.role);
        }
      });
  }

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h2>Warehouse Authentication</h2>

      {message && <p style={{ color: "blue" }}><b>{message}</b></p>}

      <div style={{ display: "flex", gap: "50px", marginTop: "20px" }}>
        
        {/* REGISTER SECTION */}
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", width: "260px" }}>
          <h3>Register</h3>
          <b>Username:</b><br/>
          <input
            placeholder="Username"
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
          /><br/><br/>

          <b>Password:</b><br/>
          <input
            type="password"
            placeholder="Password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          /><br/><br/>

          <b>Role:</b><br/>
          <select
            value={regRole}
            onChange={(e) => setRegRole(e.target.value)}
          >
            <option value="staff">staff</option>
            <option value="admin">admin</option>
          </select><br/><br/>

          <button onClick={handleRegister}>Register</button>
        </div>

        {/* LOGIN SECTION */}
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", width: "260px" }}>
          <h3>Log In</h3>
          <b>Username:</b><br/>
          <input
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          /><br/><br/>

          <b>Password:</b><br/>
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          /><br/><br/>

          <button onClick={handleLogin}>Log In</button>
        </div>

      </div>
    </div>
  );
}

export default Auth;
