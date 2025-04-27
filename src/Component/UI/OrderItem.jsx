import { useState } from 'react';
import './OrderItem.css';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CheckoutItem from './CheckoutItem';



const OrderItem = ({order, onDeleteOrder = () => {}}) => {
    const navigate = useNavigate()
    
    return <div className="OrderItem" >
        <div className="OrderItem--wrap">

        <div className="OrderItem--wrap-top">
            <div className="OrderItem--wrap-top-left">

            <p className="id">ID đơn hàng: {order.orderID}</p>
            <p className="date">Ngày đặt: {dayjs(Number(order.createdAt)).format('HH:mm:ss DD/MM/YYYY')}</p>
            </div>

            <div className="OrderItem--wrap-top-center">
                <p className="buyer">Tên người bán: {order.vendor.name}</p>
                <p className="email">Email người bán: {order.vendor.email}</p>
                
            </div>
            <div className="OrderItem--wrap-top-bottom">
                <p className="buyer">Tên người mua: {order.buyer.name}</p>
                <p className="email">Địa chỉ: {order.buyer.address}</p>
            </div>
        </div>
        <div className="OrderItem--wrap-center">
            {order.orderDetails.map(e => <CheckoutItem product={e.product}/>)}
        </div>
        <div className="OrderItem--wrap-bottom">
            <div className="OrderItem--wrap-bottom-right">

            <h3 className="total-price">Thành tiền: {order.orderDetails.reduce((total, e) => total + e.price, 0)} VND</h3>
            <button className="btn-delete" onClick={onDeleteOrder.bind(null, order.orderID)}>Hủy đơn hàng</button>
            </div>
        </div>
        </div>
    </div>

}
export default OrderItem;