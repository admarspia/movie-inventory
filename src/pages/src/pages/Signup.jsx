import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === data.email)) {
      alert("Email already registered!");
      return;
    }
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    users.push({ email: data.email, password: data.password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="email" placeholder="Email" required />
        <input {...register("password")} type="password" placeholder="Password" required />
        <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
