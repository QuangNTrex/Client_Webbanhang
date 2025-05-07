import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, BrowserRouter } from 'react-router-dom';
import SignInPage from './Page/SignInPage';
import SignUpPage from './Page/SignUpPage';
import MainLayout from './Component/Layout/MainLayout';
import HomePage from './Page/HomePage';
import SearchProductPage from './Page/SearchProductPage';
import ProductDetailPage from './Page/ProductDetailPage';
import CartPage from './Page/CartPage';
import OrderPage from './Page/OrderPage';
import CheckoutPage from './Page/CheckoutPage';
import CategoryPage from './Page/CategoryPage';
import UserDetailPage from './Page/UserDetailPage';
import UserInfoPage from './Page/UserInfoPage';
import AddProductPage from './Page/AddProductPage';
import UpdateProductPage from './Page/UpdateProductPage';
import ChangePasswordPage from './Page/ChangePasswordPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userSlice';
import { serverURL } from './libs/http';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    } else {
      fetch(serverURL + "/api/account", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log("user", data)
          dispatch(setUser(data));
        })
        .catch(err => console.log(err));
    }

  }, [])
  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/search' element={<SearchProductPage />} />
          <Route path="/detail/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route path="/user/info/" element={<UserInfoPage />} />
          <Route path="/product/add/" element={<AddProductPage />} />
          <Route path="/product/update/" element={<UpdateProductPage />} />
          <Route path="/product/update/" element={<UpdateProductPage />} />

        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/repassword" element={<ChangePasswordPage />} />
      </Routes>


    </div>
  );
}

export default App;
