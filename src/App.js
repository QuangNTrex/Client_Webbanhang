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

            </Route>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
