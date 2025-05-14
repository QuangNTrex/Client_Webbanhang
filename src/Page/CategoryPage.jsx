// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductList from '../Component/UI/ProductList';
import { serverURL } from '../libs/http';

const CategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state.category;
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(serverURL + "/api/product?category_id=" + category.categoryId, {
      method: "GET",
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
      },
    }).then(res => res.json()).then(data => {
      console.log(data);
      setProducts(data.data);
    }).catch(err => console.log(err))
  }, [category]);

  const clickHandler = (product) => {
    navigate("/detail/" + product.productID);
  }


  return (
    <div className="CategoryPage">
      <h2 className="title">Danh mục: {category.categoryName}</h2>
      <ProductList clickHandler={clickHandler} products={products} />
    </div>
  );
};

export default CategoryPage;
