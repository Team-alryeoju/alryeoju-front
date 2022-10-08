import React from "react";

import dummySool from "../static/dummyData";
import ProductCard from "./ProductCard";

import './ProductList.css'

const ProductList = () => {
    return (
        <ul className="product-list">
            {dummySool.map((sool) => <li key={sool.id}><ProductCard sool={sool}/></li>)}
        </ul>
    )
}

export default ProductList