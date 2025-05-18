// src/pages/OrderOfShop.jsx
import { useDispatch, useSelector } from "react-redux";
import "./OrderOfShop.css"
import { useEffect, useState } from "react";
import { serverURL } from "../libs/http";
import OrderItem from "../Component/UI/OrderItem";
import { useNavigate, useParams } from "react-router-dom";
import { pushNotify } from "../redux/notifySlice";


const OrderOfShop = () => {
    const state = useParams().state;
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [orders, setOrders] = useState([{
        orderID: "1234 ",
        createdAt: 1745728763738,
        status: "",

        buyer: {
            userID: "ababa",
            name: "ahihi",
            address: "ijandkjnd and jdn ad "
        },
        vendor: {
            userID: "babab",
            name: "ah",
            email: "abc@gmail.com"
        },
        orderDetails: [{
            price: 1000,
            product: {
                user: {
                    userID: "ahihi",
                    avatarUrl: "https://down-vn.img.susercontent.com/file/vn-11134216-7r98o-lvvpsh3mxz2z4c@resize_w160_nl.webp",
                    name: "MuscleStore -Thực Phẩm Bổ Sung",
                }, productID: "1111", price: 1000, title: "Creatine Monohydrate - Ostrovit (300g, 500g) Tăng Cơ, Tăng Sức Mạnh & Hiệu Suất Tập Luyện", description: "OstroVit Creatine Monohydrate là sản phẩm bổ sung creatine monohydrate với mức độ vi mô hóa tuyệt vời. Creatine là một chất bổ sung được biết đến và sử dụng rộng rãi. Hiệu quả của nó đã được xác nhận bởi nhiều nghiên cứu khoa học. Nó cung cấp sự phát triển cơ bắp tốt hơn, tái tạo hiệu quả và năng lượng để tập luyện lâu hơn, hiệu quả hơn. Creatine là một hợp chất hóa học hữu cơ xuất hiện tự nhiên trong cơ thể con người. Nó thường được cung cấp cùng với các sản phẩm từ thịt động vật, trứng hoặc cá. Tác dụng có lợi của nó dựa trên một cơ chế đơn giản giải phóng năng lượng dưới dạng các phân tử năng lượng cao ATP (adenosine triphosphate) thông qua sự phân hủy phosphocreatine trong cơ. Mặc dù thực tế là creatine cũng có trong thực phẩm, nhưng cách duy nhất để giúp cơ bắp của chúng ta bão hòa 100% với creatine là bổ sung nó liên tục", images: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lzr6bvyk5kf503"
            }
        }]
    }]);
    const user = useSelector(state => state.user);
    const confirmOrderHandler = (order) => {
        const data = {
            "orderID": order.orderID,
            "buyerId": order.buyerId,
            "vendorID": order.vendorId,
            "totalPrice": order.totalPrice > 1000000000 ? 1000000000 : order.totalPrice,
            "status": "CONFIRMED",
            "orderDetailID": order.orderDetails[0].orderDetailID,
            "productID": order.orderDetails[0].productID,
            "price": 1,
            "payMethod": order.payMethod,
            "cancelReason": "iasd nasdb",
            "quantity": order.quantity || 1,
        }
        console.log(data)
        console.log(token)
        // fetch(serverURL + "/api/order?id=" + order.orderID, {
        fetch("http://localhost:5283/api/order?id=" + order.orderID, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                dispatch(pushNotify({ title: "Xac nhan thanh cong!" }))
                console.log("okeoke")
                setOrders(prev => prev.map(e => {
                    if (e.orderID === order.orderID) {
                        e.status = "CONFIRMED";
                    }
                    return e;
                }));
            }
            return res.json()
        }).then(data => {

        }).catch(err => {
            console.log(err);
        })


    }

    useEffect(() => {
        fetch(serverURL + "/api/order?pageNumber=1&pageSize=10&vendorID=" + user.userID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            console.log(data)
            setOrders(data.data);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <div className="OrderOfShop">
            <h2 className="title">Đơn người dùng đã đặt</h2>
            <div className="wrap-nav">
                <p style={{ color: state === "unconfirm" && "green" }} onClick={() => { navigate("/order/shop/unconfirm") }}>Đơn chưa duyệt</p>
                <p style={{ color: state === "confirmed" && "green" }} onClick={() => { navigate("/order/shop/confirmed") }}>Đơn đã duyệt</p>
                <p style={{ color: state === "cancel" && "green" }} onClick={() => { navigate("/order/shop/cancel") }}>Đơn người dùng đã hủy</p>
            </div>
            <div className="wrap-order">

                {orders.filter(e => {
                    if (state === "confirmed") return e.status === "CONFIRMED"
                    if (state === "cancel") return e.status === "CANCELATION"
                    if (state === "unconfirm")
                        return e.status === "";
                }).map(e => <OrderItem order={e} onConfirmOrder={confirmOrderHandler} />)}
            </div>
        </div>
    );
};

export default OrderOfShop;
