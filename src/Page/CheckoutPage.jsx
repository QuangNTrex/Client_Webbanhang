// src/pages/CheckoutPage.jsx
import { useDispatch, useSelector } from "react-redux";
import "./CheckoutPage.css"
import CheckoutItem from "../Component/UI/CheckoutItem";
import { serverURL } from "../libs/http";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { pushNotify } from "../redux/notifySlice";


const CheckoutPage = () => {
    const token = localStorage.getItem("token");
    const [methodPay, setMethodPay] = useState("");
    const location = useLocation();
    const orderData = location.state;
    const user = useSelector(state => state.user);
    const cart = orderData.cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const buyHandler = () => {
        console.log(methodPay)
        if (methodPay === "") {
            dispatch(pushNotify({ title: "phai chon phuong thuc thanh toan" }))
            return;
        }
        const data = {
            BuyerID: user.userID,
            VendorID: cart[0].product.userID,
            TotalPrice: cart.reduce((total, item) => total + item.quantity * item.product.price * item.checked, 0),
            PayMethod: methodPay,
            CancelReason: "",
            OrderDetails: orderData.cart.map(e => {
                return {
                    ProductID: e.product.productID,
                    Price: e.product.price,
                    Quantity: e.quantity,
                }
            }),
            MethodPay: methodPay
        }
        console.log(data);

        fetch(serverURL + "/api/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) throw Error("ngu")
                return res.json()
            })
            .then(data => {
                dispatch(pushNotify({ title: "Đặt hành thành công!" }))
                console.log("acpt", data)
                navigate("/");
            })
            .catch(err => {
                dispatch(pushNotify({ title: "Đặt hành that bai!", state: "ERR" }))
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
                    <div className="wrap-method-pay">
                        <p className="title">Phương thức thanh toán</p>
                        <select name="" id="" onChange={(e) => { setMethodPay(e.target.value) }}>
                            <option value="" hidden selected>Chọn phương thức thanh toán</option>
                            <option value="Thanh toán cod (Thanh toán khi nhận hàng)">Thanh toán cod (Thanh toán khi nhận hàng)</option>

                        </select>
                    </div>
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
