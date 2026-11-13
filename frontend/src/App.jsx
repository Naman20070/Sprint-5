import { useState } from "react";
import Auth from "./components/Auth";

export default function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  function handleLoginSuccess(newToken, newRole) {
    setToken(newToken);
    setRole(newRole);
  }

  function handleLogout() {
    setToken("");
    setRole("");
  }

  return (
    <div >
      <h2 style={{ textAlign: "center"}}>
        Warehouse Dispatch Management System
      </h2>

      {!token ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <p>Logged in as: <b>{role}</b></p>
          <button onClick={handleLogout}>Logout</button>
          <br /><br />
          <hr />
          <p>Login successful!</p>
        </div>
      )}
    </div>
  );
}
