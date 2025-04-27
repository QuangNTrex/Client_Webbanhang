import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serverURL } from '../libs/http';
import "./ProductDetailPage.css";
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartSlice';

const ProductDetailPage = () => {
    const  dispatch = useDispatch();
    const navigator = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState({user: {
        userID: "ahihi",
        avatarUrl: "https://down-vn.img.susercontent.com/file/vn-11134216-7r98o-lvvpsh3mxz2z4c@resize_w160_nl.webp",
        name: "MuscleStore -Thực Phẩm Bổ Sung",
    }, productID: "1111",price: 1000,title: "Creatine Monohydrate - Ostrovit (300g, 500g) Tăng Cơ, Tăng Sức Mạnh & Hiệu Suất Tập Luyện", description: "OstroVit Creatine Monohydrate là sản phẩm bổ sung creatine monohydrate với mức độ vi mô hóa tuyệt vời. Creatine là một chất bổ sung được biết đến và sử dụng rộng rãi. Hiệu quả của nó đã được xác nhận bởi nhiều nghiên cứu khoa học. Nó cung cấp sự phát triển cơ bắp tốt hơn, tái tạo hiệu quả và năng lượng để tập luyện lâu hơn, hiệu quả hơn. Creatine là một hợp chất hóa học hữu cơ xuất hiện tự nhiên trong cơ thể con người. Nó thường được cung cấp cùng với các sản phẩm từ thịt động vật, trứng hoặc cá. Tác dụng có lợi của nó dựa trên một cơ chế đơn giản giải phóng năng lượng dưới dạng các phân tử năng lượng cao ATP (adenosine triphosphate) thông qua sự phân hủy phosphocreatine trong cơ. Mặc dù thực tế là creatine cũng có trong thực phẩm, nhưng cách duy nhất để giúp cơ bắp của chúng ta bão hòa 100% với creatine là bổ sung nó liên tục", images: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lzr6bvyk5kf503"});
    const [inputQuantity, setInputQuantity] = useState(1);
    useEffect(() => {
            return;
            fetch(serverURL + "/api/product/" + id, {
                method: "GET",
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_TOKEN_HERE'
                }
            }).then(res => res.json()).then(data => {
                setProduct(data);
            }).catch(err => console.log(err))
        }, [id]);

    const addToCart = () => {
        dispatch(addProduct({product: product, quantity: inputQuantity}));
    }
    const buyHandler = () => {
        navigator("/checkout", { state: {cart: [{product: product, quantity: inputQuantity}]} });
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
                        <input type="text" className="quality" value={inputQuantity} onChange={(e) => setInputQuantity(Number(e.target.value))}/>
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
                    <img src={product.user.avatarUrl} alt="" className="avatar-img" />
                    
                </div>
                <div className="wrap-info">

                <h3 className="name">{product.user.name}</h3>
                    <button className="show" onClick={() => {navigator("/user/" + product.user.userID)}}>Xem shop</button>
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