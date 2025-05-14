import ProductCard from './ProductCard';
import './UserDetail.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { serverURL } from '../../libs/http';
import ProductList from './ProductList';

const UserDetail = ({ userID }) => {
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);

    const navigation = useNavigate();
    const pseudoUser = useSelector(state => state.user);
    const clickHandler = (product) => {
        navigation("/detail/" + product.productID);
    }
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetch(serverURL + "/api/admin/account/" + userID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }).then(res => res.json()).then(data => {
            setUser(data);
        }).catch(err => {
            setUser(pseudoUser);
        })

        fetch(serverURL + "/api/product?user_id=" + userID, {
            method: "GET",
            header: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }).then(res => res.json()).then(data => {
            setProducts(data.data);
        }).catch(err => {
            console.log(err);
        })
    }, [userID]);



    return <div className="UserDetail">
        <div className="wrap-top wrap-top--">
            <div className="wrap-top-left">
                <div className="wrap-avatar">
                    <img src={user.avatarUrl} alt="" className="avatar" />
                </div>
                <div className="wrap-info">
                    <p className="name">{user.name}</p>
                    <p className="username">{user.username}</p>
                </div>
            </div>
            <div className="wrap-top-right">
                <p className="title">Sản phẩm: {products.length}</p>
                <p className="title">Số điện thoại: {user.phoneNumber}</p>
                <p className="title">Gmail: {user.email}</p>

            </div>
        </div>
        <div className="wrap-bottom">
            <h2 className="title">Tất cả sản phẩm</h2>
            <div className="wrap-product">
                <ProductList products={products} clickHandler={clickHandler} />
            </div>
        </div>
    </div>
}
export default UserDetail;