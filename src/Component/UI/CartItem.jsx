// src/pages/CartItem.jsx
import { useDispatch } from "react-redux";
import "./CartItem.css"
import { addProduct, changeProduct, deleteProduct } from "../../redux/cartSlice";


const CartItem = ({product, quantity, checked, changeValueHandler=() => {}}) => {
    const dispatch = useDispatch();
    function shortenString(str, num = 50) {
        if (str.length <= num) return str;
        return str.slice(0, num) + '...';
      }
      console.log(checked);
  return (
    <div className="CartItem">
        <div className="wrap-left">
            <div className="wrap-btn-checked">
                <input type="checkbox" className="btn-checked" checked={checked} onClick={() => {dispatch(changeProduct({product, quantity, checked: !checked}))}}/>
            </div>
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
                <p>Số lượng: </p>
                <button className="-" onClick={() => dispatch(addProduct({product: product, quantity: -1}))}>-</button>
                <input type="text" className="quality" value={quantity} />
                <button className="+" onClick={() => dispatch(addProduct({product: product, quantity: 1}))}>+</button>
            </div>
            <p className="total-price">Thành tiền: {product.price * Number(quantity)}</p>
        </div>
        <div className="wrap-right">
            <button className="btn btn-delete" onClick={() => dispatch(deleteProduct({productID: product.productID}))}>Xóa</button>
        </div>
    </div>
  );
};

export default CartItem;
