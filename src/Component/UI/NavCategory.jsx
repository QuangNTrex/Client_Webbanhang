import { useState } from 'react';
import './NavCategory.css';
import { useLocation, useNavigate } from "react-router-dom";

const NavCategory = ({ categories = [] }) => {
    const navigate = useNavigate()

    return <div className="NavCategory" >
        <p className="title">Danh mục</p>
        <div className="wrap-all">
            {categories.map(e => <div className="wrap-category" onClick={() => navigate("/category/" + e.categoryId, { state: { category: e } })} >
                <p className="name">{e.categoryName}</p>
            </div>)}
        </div>
    </div>
}
export default NavCategory;