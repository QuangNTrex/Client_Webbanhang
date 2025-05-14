// src/pages/CheckoutItem.jsx
import { useDispatch } from "react-redux";
import "./CheckoutItem.css"
import { addProduct, changeProduct, deleteProduct } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import { serverURL } from "../../libs/http";


const CheckoutItem = ({ product, productID, quantity = 1 }) => {
    const token = localStorage.getItem("token");
    const [tempProduct, setTempProduct] = useState(product || {});

    function shortenString(str = "", num = 50) {
        if (str.length <= num) return str;
        return str.slice(0, num) + '...';
    }
    useEffect(() => {
        if (!productID) return;
        fetch(serverURL + "/api/product/" + productID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            setTempProduct(data)
        }).catch(err => {
            console.log(err);
        })


    }, [productID])
    return (
        <div className="CheckoutItem">
            <div className="wrap-left">
                <div className="wrap-img">
                    <img src={tempProduct.images} alt="" className="img" />
                </div>
                <div className="wrap-title">
                    <p className="title">{shortenString(tempProduct.title)}</p>
                </div>
            </div>
            <div className="wrap-center">
                <p className="title">Đơn giá: {tempProduct.price}</p>
                <div className="wrap-quantity">
                    <p>Số lượng: {quantity}</p>
                </div>
                <p className="total-price">Thành tiền: {tempProduct.price * Number(quantity)}</p>
            </div>
        </div>
    );
};

export default CheckoutItem;
