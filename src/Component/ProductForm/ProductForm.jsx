import './ProductForm.css';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from '../../libs/http';

const ProductForm = ({ type = "create", onSubmit, product = { categoryID: -1 }, onDelete }) => {
    const localUser = useSelector(state => state.user);
    const userID = localUser.userID;
    const token = localStorage.getItem("token");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(serverURL + "/api/admin/category", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            setCategories(data);
            console.log(data)
        }).catch(err => {
            setCategories([{ categoryID: 123, categoryName: "ababa" }, { categoryID: 11111111, categoryName: "ab dhab djba d" }]);
        })
    }, [])
    const productIDRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const conditionRef = useRef();
    const imagesRef = useRef();
    const locationRef = useRef();

    const navigation = useNavigate();
    console.log(product, "abc ")

    return <div className="ProductForm">

        <div className="wrap-top wrap-top--">
            <input readOnly ref={productIDRef} type="text" className="productID" placeholder='Product ID' defaultValue={product.productID} />
            <input readOnly type="text" className="productname" defaultValue={userID} />
            <select ref={categoryRef} defaultValue={product.categoryID || ''}>
                <option hidden selected value="">Chọn thể loại</option>
                {categories.map(e => (
                    <option key={e.categoryID} selected={e.categoryID === product.categoryID} value={e.categoryID}>
                        {e.categoryName}
                    </option>
                ))}
            </select>

            <input type="text" className="title" ref={titleRef} placeholder='Tên sản phẩm' defaultValue={product.title} />
            <textarea className="birthOfDate" ref={descRef} placeholder='Mô tả' defaultValue={product.desc} />
            <input type="number" className="" ref={priceRef} placeholder='Giá' defaultValue={product.price || 0} />
            <input type="text" className="" ref={conditionRef} placeholder='Điều kiện' defaultValue={product.condition} />
            <input type="text" className="" ref={imagesRef} placeholder='Url ảnh' defaultValue={product.images} />
            <input type="text" className="" ref={locationRef} placeholder='Vị trí' defaultValue={product.location} />
        </div>

        <div className="wrap-bottom">
            <div className="wrap-btn">
                <button className="btn btn-update" onClick={() => {
                    console.log(categories)
                    const data = {
                        productID: productIDRef.current.value,
                        userID,
                        categoryID: categories.filter(e => e.categoryName == categoryRef.current.value)[0].categoryId,
                        title: titleRef.current.value,
                        description: descRef.current.value,
                        price: priceRef.current.value,
                        condition: conditionRef.current.value,
                        images: imagesRef.current.value,
                        location: locationRef.current.value,
                    }

                    onSubmit(data);
                }}>{type === "update" ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</button>
                {onDelete && <button className="btn btn-delete" onClick={onDelete.bind(null, product.productID)}>Xóa sản phẩm</button>}
            </div>


        </div>

    </div>
}
export default ProductForm;