import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({products, clickHandler = (e) => console.log(e)}) => {
    
    return <div className="ProductList">
        <div className="wrap-products">
            {products.map((product) => {
                return <ProductCard clickHandler={clickHandler} product={product}></ProductCard>
            })}
        </div>
    </div>
}
export default ProductList;