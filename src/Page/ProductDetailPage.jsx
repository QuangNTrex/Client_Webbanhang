import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serverURL } from '../libs/http';
import "./ProductDetailPage.css";
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartSlice';
import { pushNotify } from '../redux/notifySlice';

const ProductDetailPage = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [user, setUser] = useState({});
    const [inputQuantity, setInputQuantity] = useState(1);
    const token = localStorage.getItem("token")
    useEffect(() => {
        fetch(serverURL + "/api/product/" + id, {
            method: "GET",
            header: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            setProduct(data);
            //user
            fetch(serverURL + "/api/admin/account/" + data.userID, {
                method: "GET",
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
                setUser(data);

            }).catch(err => console.log(err))
        }).catch(err => console.log(err))


    }, [id]);

    const addToCart = () => {
        if (!token) return navigator("/signin");
        dispatch(addProduct({ product: product, quantity: inputQuantity }));
        dispatch(pushNotify({ title: "them vao gio hang thanh cong" }))
    }
    const buyHandler = () => {
        if (!token) return navigator("/signin");
        navigator("/checkout", { state: { cart: [{ product: product, quantity: inputQuantity }] } });
    }


    return <div className="ProductDetailPage">
        <div className="wrap-top">
            <div className="wrap-left">
                <div className="wrap-img">
                    <img src={product.images} alt="" className="img" />
                </div>
            </div>
            <div className="wrap-right">
                <div className="wrap-right-top">
                    <h3 className="title">{product.title}</h3>
                    <h2 className="price">{product.price} VND</h2>
                </div>
                <div className="wrap-right-bottom">
                    <div className="wrap-quality">
                        <p>Số lượng: </p>
                        <button className="-" onClick={() => setInputQuantity(prev => prev - 1)}>-</button>
                        <input type="text" className="quality" value={inputQuantity} onChange={(e) => setInputQuantity(Number(e.target.value))} />
                        <button className="+" onClick={() => setInputQuantity(prev => prev + 1)}>+</button>
                    </div>
                    <div className="wrap-btns">
                        <div className="wrap-btn" onClick={addToCart}>
                            <i class="bi bi-cart4"></i>
                            <span className="btn btn-add">Thêm vào giỏ hàng</span>
                        </div>

                        <div className="wrap-btn wrap-btn-buy">
                            <span className="btn btn-buy" onClick={buyHandler}>Mua Ngay</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="wrap-middle">
            <div className="wrap-user-info">
                <div className="wrap-avatar">
                    <img src={user.images} alt="" className="avatar-img" />

                </div>
                <div className="wrap-info">

                    <h3 className="name">{user.name}</h3>
                    <button className="show" onClick={() => { navigator("/user/" + user.userID) }}>Xem shop</button>
                </div>

            </div>
        </div>
        <div className="wrap-bottom">
            <h3 className="title">MÔ TẢ SẢN PHẨM</h3>
            <p className="title">{product.description}</p>
        </div>
    </div>
}
export default ProductDetailPage;