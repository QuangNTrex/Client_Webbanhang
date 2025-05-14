// src/pages/ConfirmOrderCancellationPage.jsx
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmOrderCancellationPage.css"
import CheckoutItem from "../Component/UI/CheckoutItem";
import { serverURL } from "../libs/http";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import OrderItem from "../Component/UI/OrderItem";
import { pushNotify } from "../redux/notifySlice.js"

const ConfirmOrderCancellationPage = () => {

    const reasonRef = useRef()
    const token = localStorage.getItem("token");
    const tempOrder = useLocation().state || {};
    const [order, setOrder] = useState(tempOrder);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    console.log(tempOrder)

    const deleteOrderHandler = () => {
        if (!reasonRef.current.value) {
            dispatch(pushNotify({ title: "ly do huy don hang bi bo trong", state: "ERR" }))
            return;
        }

        const data = {
            "orderID": order.orderID,
            "buyerId": order.buyerId,
            "vendorID": order.vendorId,
            "totalPrice": order.totalPrice,
            "status": "CANCELATION",
            "orderDetailID": order.orderDetails[0].orderDetailID,
            "productID": order.orderDetails[0].productID,
            "price": order.orderDetails[0].price,
            "payMethod": order.payMethod,
            "cancelReason": reasonRef.current.value,

        }
        console.log(data)

        fetch(serverURL + "/api/order?id=" + order.orderID, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            console.log("thanh toan", data)
            dispatch(pushNotify({ title: "Huy thanh cong", state: "WAR" }))
            navigate("/");
        }).catch(err => {
            console.log(err);
            dispatch(pushNotify({ title: "Huy that bai", state: "ERR" }))
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
                <OrderItem order={order} unCancelButton={true} />
                <div className="wrap-reason">
                    <p>Lý do hủy đơn hàng: </p>
                    <select name="" id="" ref={reasonRef}>
                        <option value="Chọn lý do hủy đơn" selected hidden>Chọn lý do hủy đơn</option>
                        <option value="Thay đổi phương thức thanh toán">Thay đổi phương thức thanh toán</option>
                        <option value="Không còn thấy cần thiết">Không còn thấy cần thiết</option>
                    </select>
                </div>
                <div className="wrap-method">
                    <p>Phương thức thanh toán: COD</p>
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
