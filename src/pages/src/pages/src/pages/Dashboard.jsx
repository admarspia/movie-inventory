import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Welcome, {user.email}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
