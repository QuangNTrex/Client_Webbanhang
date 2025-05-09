// src/pages/ConfirmOrderCancellationPage.jsx
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmOrderCancellationPage.css"
import CheckoutItem from "../Component/UI/CheckoutItem";
import { serverURL } from "../libs/http";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderItem from "../Component/UI/OrderItem";


const ConfirmOrderCancellationPage = () => {
    const token = localStorage.getItem("token");
    const tempOrder = useLocation().state || {};
    const [order, setOrder] = useState(tempOrder);
    const navigate = useNavigate();

    const deleteOrderHandler = () => {
        navigate("/");
        fetch(serverURL + "/api/order/id?id=" + order.orderID, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            console.log("thanh toan", data)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetch(serverURL + "/api/order/" + tempOrder.orderID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
            .then(res => res.json())
            .then(data => {
                setOrder(order);
            }).catch(err => {

            })
        }, []);
    return (
        <div className="ConfirmOrderCancellationPage">
            <div className="wrap">

            <h2 className="title">Hủy đơn</h2>
            <OrderItem order={order} unCancelButton={true}/>
            <div className="wrap-reason">
                <p>Lý do hủy đơn hàng: </p>
                <select name="" id="">
                    <option value="" selected hidden>Chọn lý do hủy đơn</option>
                    <option value="">Thay đổi phương thức thanh toán</option>
                    <option value="">Không còn thấy cần thiết</option>
                </select>
            </div>
            <div className="wrap-refund-money">
                <p>Số tiền hoàn lại: 0đ</p>
            </div>
            <div className="confirm">
                <button onClick={deleteOrderHandler} className="btn btn-delete">Xác nhận hủy đơn</button>
            </div>
            </div>
        </div>
    );
};

export default ConfirmOrderCancellationPage;
