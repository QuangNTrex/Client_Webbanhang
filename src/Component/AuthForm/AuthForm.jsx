// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ type, onSubmit }) => {
  const isSignUp = type === 'signup';
  const stateRequired = false;

  const [formData, setFormData] = useState({
    username: '',
    gmail: '',
    password: '',
    name: '',
    gender: '',
    birthOfDate: '',
    phoneNumber: '',
    address: '',
    avatarUrl: ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-container" style={{ marginTop: isSignUp && "8rem" }}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

        {/* Dùng trong cả hai */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          required={stateRequired}
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required={stateRequired}
          value={formData.password}
          onChange={handleChange}

        />

        {/* Chỉ hiện trong Sign Up */}
        {isSignUp && (
          <>
            <input
              type="email"
              name="gmail"
              placeholder="Gmail"
              required={stateRequired}
              value={formData.gmail}
              onChange={handleChange}
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required={stateRequired}
              value={formData.name}
              onChange={handleChange}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required={stateRequired}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="date"
              name="birthOfDate"
              placeholder="Birth Date"
              required={stateRequired}
              value={formData.birthOfDate}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              required={stateRequired}
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              required={stateRequired}
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="url"
              name="avatarUrl"
              placeholder="Avatar URL"
              value={formData.avatarUrl}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit">
          {isSignUp ? 'Register' : 'Login'}
        </button>

        <p style={{ textAlign: 'center' }}>
          {type === 'signin' ? (
            <>Don't have an account? <Link to="/signup">Sign up</Link></>
          ) : (
            <>Already have an account? <Link to="/signin">Sign in</Link></>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
