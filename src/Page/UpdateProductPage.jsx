// src/pages/UpdateProductPage.jsx
import React, { useEffect, useState } from 'react';
import { serverURL } from '../libs/http';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../Component/ProductForm/ProductForm';
import { useDispatch } from 'react-redux';
import { pushNotify } from '../redux/notifySlice';


const UpdateProductPage = () => {
    const product = useLocation().state;
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const deleteHandler = (productID) => {
        fetch(serverURL + "/api/product/" + product.productID, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }).then(res => {
            navigate("/")
            dispatch(pushNotify({ title: "xoa san pham thanh cong" }))
        }).catch(err => {
            dispatch(pushNotify({ title: "xoa san pham that bai", state: "ERR" }))
        })
    }

    const submitHandler = (product) => {
        fetch(serverURL + "/api/product/" + product.productID, {
            method: "PUT",
            header: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ProductID: product.productID,
                UserID: product.userID,
                Title: product.title,
                Description: product.description,
                Price: product.price,
                CategoryID: product.categoryID,
                Condition: product.condition,
                Images: product.images,
                Location: product.location
            })
        }).then(res => res.json()).then(data => {
            navigate("/")
            dispatch(pushNotify({ title: "cap nhat san pham thanh cong" }))
        }).catch(err => {
            navigate("/")
            dispatch(pushNotify({ title: "cap nhat san pham that bai", state: "ERR" }))
        })
    }

    return <div className="UpdateProductPage">
        <h2 className="title">Cập nhật sản phẩm</h2>
        <ProductForm type="update" product={product} onDelete={deleteHandler} onSubmit={submitHandler} />

    </div>
};

export default UpdateProductPage;
