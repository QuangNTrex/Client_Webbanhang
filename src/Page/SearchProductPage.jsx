import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../Component/UI/ProductCard";
import ProductList from "../Component/UI/ProductList";
import { useEffect, useState } from "react";
import { serverURL } from "../libs/http";

const SearchProductPage = () => {
    const token = localStorage.getItem("token");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q");
    const pageNumber = queryParams.get("page_number") || 1;
    const navigator = useNavigate();

    const [products, setProducts] = useState([{ price: 1000, title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06" },]);

    useEffect(() => {
        fetch(serverURL + "/api/product?keyword=" + q, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            console.log(data)
            setProducts(data.data)
        }).catch(err => console.log(err))
    }, [q, pageNumber]);

    const clickHandler = (product) => {
        navigator("/detail/" + product.productID);
    }

    return <div className="SearchProductPage">
        <div className="wrap-title">
            <h4 className="title">Tìm kiếm sản phẩm: {q}</h4>
        </div>
        <div className="wrap-product">
            <ProductList clickHandler={clickHandler} products={products} />
        </div>
    </div>
}
export default SearchProductPage;