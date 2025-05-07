// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import NavCategory from '../Component/UI/NavCategory';
import ProductList from '../Component/UI/ProductList';
import { serverURL } from '../libs/http';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");


    fetch(serverURL + "/api/product", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("product", data);
        setProducts(data.data);
      })
      .catch(err => {
        console.log("err", err)
      });

    fetch(serverURL + "/api/admin/category", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("categori", data);
        setCategories(data);
      })
      .catch(err => {
        console.log("err", err)
      });
  }, [navigate]);

  const clickHandler = (product) => {
    navigate("/detail/" + product.productID);
  };

  return (
    <div className="HomePage">
      <NavCategory categories={categories} />
      <p className="title" style={{ marginTop: "2rem", fontSize: "1.5rem" }}>Gợi ý hôm nay</p>
      <ProductList products={products} clickHandler={clickHandler} />
    </div>
  );
};

export default HomePage;
