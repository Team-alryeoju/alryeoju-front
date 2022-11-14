import React from "react";
import ProductCard from "./ProductCard.js";

import './ProductList.css'

const ProductList = ({products}) => {
    return (
        <ul className="product-list">
            {products.map((product) => <li key={product.al_id}><ProductCard sool={product}/></li>)}
        </ul>
    )
}

export default ProductList