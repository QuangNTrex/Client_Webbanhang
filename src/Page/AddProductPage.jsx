// src/pages/AddProductPage.jsx
import { useDispatch, useSelector } from "react-redux";
import "./AddProductPage.css"
import CheckoutItem from "../Component/UI/CheckoutItem";
import { serverURL } from "../libs/http";
import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../Component/ProductForm/ProductForm";


const AddProductPage = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const submitHandler = (data) => {
        console.log(data)
        fetch(serverURL + "/api/product", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                categoryID: data.categoryID,
                title: data.title,
                price: data.price,
                description: data.description,
                condition: data.condition,
                images: data.images,
                location: data.location
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            navigate("/user/info")
        }).catch(err => {
            //navigate("/")
        })
    }
    return (
        <div className="AddProductPage">
            <h2 className="title">Thêm sản phẩm</h2>
            <ProductForm onSubmit={submitHandler} />

        </div>
    );
};

export default AddProductPage;
