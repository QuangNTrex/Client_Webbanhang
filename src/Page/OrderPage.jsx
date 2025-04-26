// src/pages/OrderPage.jsx
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Component/UI/CartItem";
import "./OrderPage.css"
import { changeProduct } from "../redux/cartSlice";


const OrderPage = () => {
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    return (
        <div className="OrderPage">
            <div className="wrap-top">

            <h3 className="title">Giỏ hàng</h3>
            {cart.length === 0 && <p>Trống</p>}
            <div className="wrap-cart">
                {cart.map(item => <CartItem product={item.product} quantity={item.quantity} checked={item.checked}/>)}
            </div>
            </div>
            <div className="wrap-bottom">
                <div className="wrap-bottom-left">

                     <button className="btn btn-check-all" onClick={() => {
                        cart.map(e => {
                            dispatch(changeProduct({product: e.product, quantity: e.quantity, checked: true}))
                        })
                     }}>Chọn tất cả</button>
                </div>
                <div className="wrap-bottom-right">
                    <h3 className="title">Tổng cộng {'('}{cart.reduce((total, item) => total + item.quantity, 0)} sản phẩm {')'}: </h3>
                    <h3 className="total-price">{cart.reduce((total, item) => total + item.quantity * item.product.price * item.checked, 0)} VND</h3>
                    <button className="btn btn-buy">Mua Hàng</button>
                </div>
            </div>

        </div>
    );
};

export default OrderPage;
