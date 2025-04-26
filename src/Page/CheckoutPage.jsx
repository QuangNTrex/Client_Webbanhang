// src/pages/CheckoutPage.jsx
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Component/UI/CartItem";
import "./CheckoutPage.css"
import { changeProduct } from "../redux/cartSlice";
import CheckoutItem from "../Component/UI/CheckoutItem";


const CheckoutPage = () => {
    const cart = useSelector(state => state.cart.cart);
    const data = cart.filter(item => item.checked);
    const dispatch = useDispatch();

    return (
        <div className="CheckoutPage">
            <div className="wrap-top">

            <div className="wrap-cart">
                {data.map(item => <CheckoutItem product={item.product} quantity={item.quantity} checked={item.checked}/>)}
            </div>
            </div>
            <div className="wrap-bottom">
                <div className="wrap-bottom-right">
                    <h3 className="title">Tổng cộng {'('}{cart.reduce((total, item) => total + item.quantity, 0)} sản phẩm {')'}: </h3>
                    <h3 className="total-price">{cart.reduce((total, item) => total + item.quantity * item.product.price * item.checked, 0)} VND</h3>
                    <button className="btn btn-buy">Mua Hàng</button>
                </div>
            </div>

        </div>
    );
};

export default CheckoutPage;
