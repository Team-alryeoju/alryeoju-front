import React from "react";
import { Link } from "react-router-dom";


import './ProductCard.css'

const ProductCard = ({ sool }) => {  
    const url = `/detail/${sool.al_id}`
    const textDecoNone = {
      textDecoration: 'none'
    };

    return(
      <Link className="productCard row-center" to={url} style={textDecoNone}>
        <div className="productCard__wrapper" id={sool.al_id}>
              <div className="productCard--img">
                <img src={sool.img_link} alt={sool.al_name}></img>  
              </div>
              <div className="productCard__content col-center">
                <span className="productCard--name">{sool.al_name}</span>
                <span className="productCard--price">1000원</span>
              </div>
        </div>
      </Link>
    )
}

export default ProductCard;