import { Link } from 'react-router-dom';
import React from 'react';

function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc"
      }}>
        <h1>Movie Inventory</h1>
        <nav>
          {user ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      <main style={{ padding: 20 }}>
        <h2>Welcome to Movie Inventory!</h2>
        <p>Manage your movie collection easily.</p>
      </main>
    </div>
  );
}

export default App;
