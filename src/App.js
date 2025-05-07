import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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


function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path='/search' element={<SearchProductPage/>}/>
              <Route path="/detail/:id" element={<ProductDetailPage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="/order" element={<OrderPage/>}/>
              <Route path="/checkout" element={<CheckoutPage/>}/>
              <Route path="/category/:id" element={<CategoryPage/>}/>
              <Route path="/user/:id" element={<UserDetailPage/>}/>
              <Route path="/user/info/" element={<UserInfoPage/>}/>
              <Route path="/product/add/" element={<AddProductPage/>}/>
              <Route path="/product/update/" element={<UpdateProductPage/>}/>
              <Route path="/product/update/" element={<UpdateProductPage/>}/>
              

            </Route>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user/repassword" element={<ChangePasswordPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
