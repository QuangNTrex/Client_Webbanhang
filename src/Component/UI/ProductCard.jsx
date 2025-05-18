import './ProductCard.css';

const ProductCard = ({ product, clickHandler }) => {
    function formatCurrency(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return <div className="ProductCard" onClick={clickHandler.bind(null, product)}>
        <div className="wrap-top">
            <img src={product.images} alt="" className="img" />
        </div>
        <div className="wrap-bottom">
            <p className="title">{product.title}</p>
            <p className="price">{formatCurrency(product.price)} VNĐ</p>
        </div>
    </div>
}
export default ProductCard;