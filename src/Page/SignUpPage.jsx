// src/pages/SignUpPage.jsx
import React from 'react';
import AuthForm from '../Component/AuthForm/AuthForm';
import { serverURL } from '../libs/http';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigation = useNavigate();
  const handleRegister = (data) => {
    const genderBoolean = data.gender === "1";
    fetch(serverURL + "/api/account/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: data.gmail,
        Password: data.password,
        Username: data.username,
        Name: data.name,
        Gender: genderBoolean,
        BirthOfDate: data.birthOfDate,
        PhoneNumber: data.phoneNumber,
        Address: data.address,
        AvatarUrl: data.avatarUrl
      })
    })
      .then(response => {
        if (response.ok) {
          navigation('/signin');
        } else if (response.status === 409) {
          alert("Email hoặc tên người dùng đã tồn tại. Vui lòng chọn lại.");
        } else {
          alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
      })
      .catch(error => console.error("Login error:", error));
  };

  return <AuthForm type="signup" onSubmit={handleRegister} />;
};

export default SignUpPage;
