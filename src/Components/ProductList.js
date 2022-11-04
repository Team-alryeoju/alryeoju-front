import React from "react";
import ProductCard from "./ProductCard";

import './ProductList.css'

const ProductList = ({products}) => {
    return (
        <ul className="product-list">
            {products.map((product) => <li key={product.id}><ProductCard sool={product}/></li>)}
        </ul>
    )
}

export default ProductList