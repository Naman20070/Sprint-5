import { useState } from "react";

const API_URL = "http://127.0.0.1:8001";

function Auth({ onLoginSuccess }) {
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("staff");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister() {
    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: regUsername,
        password: regPassword,
        role: regRole,
      }),
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

  function handleLogin() {
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          onLoginSuccess(data.access_token, data.role);
        }
      });
  }


  return (
    <div>
      <h3>Authentication(Only staff and admin)</h3>

      <p><b>{message}</b></p>

      <b>Register New User</b><br/><br/>
      <b>Username: </b>
      <input
        placeholder="Username"
        value={regUsername}
        onChange={(e) => setRegUsername(e.target.value)}
      />
      <br /><br />

      <b>Password: </b>
      <input
        placeholder="Password"
        value={regPassword}
        onChange={(e) => setRegPassword(e.target.value)}
      />
      <br /><br />

      <b>Role: </b>
      <select value={regRole} onChange={(e) => setRegRole(e.target.value)}>
        <option value="staff">staff</option>
        <option value="admin">admin</option>
      </select>
      <br /><br />

      <button onClick={handleRegister}>Register</button>

      <br /><br/>
      <hr />
      <br />

      <b>Login</b><br/><br/>
      <b>Username: </b>
      <input
        placeholder="Username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <br /><br />

      <b>Password: </b>
      <input
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Auth;
