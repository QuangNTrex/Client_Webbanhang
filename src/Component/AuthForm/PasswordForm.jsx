// src/components/PasswordForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const PasswordForm = ({ type, onSubmit }) => {
  const isSignUp = type === 'signup';
  const stateRequired = false;

  const [formData, setFormData] = useState({
    renewPassword: "",
    newPassword: "",
    currentPassword: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Đổi mật khẩu</h2>

        {/* Dùng trong cả hai */}
        <input
          type="password"
          name="currentPassword"
          placeholder="Mật khẩu hiện tại"
          required={stateRequired}
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="Mật khẩu mới"
          required={stateRequired}
          value={formData.newPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="renewPassword"
          placeholder="Nhập lại mật khẩu mới"
          required={stateRequired}
          value={formData.renewPassword}
          onChange={handleChange}
        />



        <button type="submit">
          Đổi mật khẩu
        </button>

      </form>
    </div>
  );
};

export default PasswordForm;
