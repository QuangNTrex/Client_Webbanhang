// src/pages/CheckoutPage.jsx
import { useDispatch, useSelector } from "react-redux";
import "./CheckoutPage.css"
import CheckoutItem from "../Component/UI/CheckoutItem";
import { serverURL } from "../libs/http";
import { useLocation, useNavigate } from "react-router-dom";


const CheckoutPage = () => {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const orderData = location.state;
    const user = useSelector(state => state.user);
    const cart = orderData.cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const buyHandler = () => {
        const data = {
            BuyerID: user.userID,
            VendorID: cart[0].product.userID,
            TotalPrice: cart.reduce((total, item) => total + item.quantity * item.product.price * item.checked, 0)
            , OrderDetails: []
        }
        console.log(data);
        fetch(serverURL + "/api/order", {
            method: "POST",
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log("acpt", data)
                navigate("/");
            })
            .catch(err => {
                console.log("thanh toan", err)
            })

    }
    return (
        <div className="CheckoutPage">
            <div className="wrap-top">
                <div className="wrap-info">
                    <div className="wrap-top-left">
                        <div className="title">
                            <i class="bi bi-geo"></i>
                            <p>Địa chỉ nhận hàng</p>
                        </div>
                        <div className="wrap-name-phonenumber">
                            <p className="name">{user.name}</p>
                            <p className="phone">{user.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="wrap-top-middle">
                        <p className="address">{user.address}</p>
                    </div>
                </div>
                <div className="wrap-cart">
                    {cart.map(item => <CheckoutItem product={item.product} quantity={item.quantity} checked={item.checked} />)}
                </div>
            </div>
            <div className="wrap-bottom">
                <div className="wrap-bottom-right">
                    <div className="wrap-price">

                        <h3 className="title">Tổng cộng {'('}{cart.reduce((total, item) => total + item.quantity, 0)} sản phẩm {')'}: </h3>
                        <h3 className="total-price">{cart.reduce((total, item) => total + item.quantity * item.product.price, 0)} VND</h3>
                    </div>
                    <button className="btn btn-buy" onClick={buyHandler}>Thanh toánn</button>
                </div>
            </div>

        </div>
    );
};

export default CheckoutPage;
