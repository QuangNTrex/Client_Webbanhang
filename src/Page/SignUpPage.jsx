// src/pages/SignUpPage.jsx
import React from 'react';
import AuthForm from '../Component/AuthForm/AuthForm';
import { serverURL } from '../libs/http';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigation = useNavigate();
  const handleRegister = (data) => {
    console.log('Register with:', data);
    navigation("/signin");
    return;
    fetch(serverURL + "/api/account/signup");
  };

  return <AuthForm type="signup" onSubmit={handleRegister} />;
};

export default SignUpPage;
