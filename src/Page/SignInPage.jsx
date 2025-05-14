// src/pages/SignInPage.jsx
import React from 'react';
import AuthForm from '../Component/AuthForm/AuthForm';
import { serverURL } from "../libs/http";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { pushNotify } from '../redux/notifySlice';
import { resizeProducts } from '../redux/cartSlice';
import CartItem from '../Component/UI/CartItem';

const SignInPage = () => {

  const navigation = useNavigate();
  const state = useLocation().state || {};
  console.log(JSON.stringify(state));

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const handleLogin = (data) => {
    fetch(serverURL + "/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ Email: data.username, Password: data.password })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        dispatch(setUser(result.user))
        if (result.token) {
          // Lưu token vào localStorage
          localStorage.setItem('token', result.token);
          fetch(serverURL + "/api/cart", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${result.token}`
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (!!data)
                dispatch(resizeProducts({
                  cartItems: data.map(c => {
                    return { product: c, quantity: c.quantity }
                  })
                }))
            })
            .catch(err => {
              dispatch(pushNotify({ title: "lay gio hang that bai", state: "ERR" }))
              console.log(err)
            });
          dispatch(pushNotify({ title: "Đăng nhập thành công, chào mừng " + result.user.name + " đến với trang mua sắm" }))
          if (state.link) {
            navigation(state.link, { state });
          }
          else navigation('/');
        }
      })
      .catch(error => console.error("Login error:", error));
  };

  return <AuthForm type="signin" onSubmit={handleLogin} />;
};

export default SignInPage;