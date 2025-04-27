// src/pages/CheckoutItem.jsx
import { useDispatch } from "react-redux";
import "./CheckoutItem.css"
import { addProduct, changeProduct, deleteProduct } from "../../redux/cartSlice";


const CheckoutItem = ({product, quantity = 1}) => {
    const dispatch = useDispatch();
    function shortenString(str = "", num = 50) {
        if (str.length <= num) return str;
        return str.slice(0, num) + '...';
      }
  return (
    <div className="CheckoutItem">
        <div className="wrap-left">
                    <div className="wrap-img">
                <img src={product.images} alt="" className="img" />
            </div>
            <div className="wrap-title">
                <p className="title">{shortenString(product.title)}</p>
            </div>
        </div>
        <div className="wrap-center">
            <p className="title">Đơn giá: {product.price}</p>
            <div className="wrap-quantity">
                <p>Số lượng: {quantity}</p>
            </div>
            <p className="total-price">Thành tiền: {product.price * Number(quantity)}</p>
        </div>
    </div>
  );
};

export default CheckoutItem;
