// src/pages/UpdateProductPage.jsx
import React, { useEffect, useState } from 'react';
import { serverURL } from '../libs/http';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../Component/ProductForm/ProductForm';


const UpdateProductPage = () => {
    const product = useLocation().state;
    const navigate = useNavigate();
    const deleteHandler = (productID) => {
        fetch(serverURL + "/api/product/" + product.productID, {
            method: "DELETE",
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE'
            },

        }).then(res => res.json()).then(data => {
            navigate("/")
        }).catch(err => {
            navigate("/")
        })
    }

    const submitHandler = (product) => {
        fetch(serverURL + "/api/product/" + product.productID, {
            method: "PUT",
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE'
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
        }).catch(err => {
            navigate("/")
        })
    }

    return <div className="UpdateProductPage">
        <h2 className="title">Cập nhật sản phẩm</h2>
        <ProductForm type="update" product={product} onDelete={deleteHandler} product={product} onSubmit={submitHandler} />

    </div>
};

export default UpdateProductPage;
