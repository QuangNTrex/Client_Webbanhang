// src/pages/AddProductPage.jsx
import { useDispatch, useSelector } from "react-redux";
import "./AddProductPage.css"
import CheckoutItem from "../Component/UI/CheckoutItem";
import { serverURL } from "../libs/http";
import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../Component/ProductForm/ProductForm";


const AddProductPage = () => {
    const navigate = useNavigate();
   const submitHandler = (data) => {
        fetch(serverURL + "/api/product" , {
            method: "GET",
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            navigate("/")
        }).catch(err => {
            navigate("/")
        })
   }
    return (
        <div className="AddProductPage">
            <h2 className="title">Thêm sản phẩm</h2>
            <ProductForm onSubmit={submitHandler}/>
            
        </div>
    );
};

export default AddProductPage;
