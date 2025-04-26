import './ProductCard.css';

const ProductCard = ({product, clickHandler}) => {
    return <div className="ProductCard" onClick={clickHandler.bind(null, product)}>
        <div className="wrap-top">
            <img src={product.images} alt="" className="img" />
        </div>
        <div className="wrap-bottom">
            <p className="title">{product.title}</p>
            <p className="price">đ{product.price}</p>
        </div>
    </div>
}
export default ProductCard;