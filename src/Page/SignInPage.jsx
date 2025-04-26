// src/pages/SignInPage.jsx
import React from 'react';
import AuthForm from '../Component/AuthForm/AuthForm';
import {serverURL} from "../libs/http";
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigation = useNavigate();
  const handleLogin = (data) => {
    console.log('Login with:', data, serverURL);
    navigation("/")
    return;

    fetch(serverURL + "/api/account/signin")
  };

  return <AuthForm type="signin" onSubmit={handleLogin} />;
};

export default SignInPage;
