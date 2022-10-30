import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Footer from "../Footer";
import dummySool from "../static/dummyData";
import ProductSwiper from "../Components/ProductSwiper";

import "./Detail.css"


const Detail = () => {
    const { id } = useParams();

    const dummyData = dummySool.find((sool) => sool.id === Number(id))
    // GET 요청
    // URL : detail/:id

    return (
        <div className="Detail">
            <main className="product__main col">
                <div className="product__detail row">
                    <div className="detail_left col-center">
                        <img src={dummyData.img} alt={dummyData.name}></img>
                    </div>
                    <div className="detail_right col">
                        <div className="product__content">
                            <div className="product--name">{dummyData.name}</div>
                            <div className="product--price">가격</div>
                            <div className="product--degree">도수</div>
                            <div className="product--star">평점</div>
                        </div>
                        <div className="product__purchase">
                            <div className="product--count row">
                                <button>minus</button>
                                <p>1</p>
                                <button>plus</button>
                            </div>
                            <p>총 가격</p>
                            <button>구매</button>
                        </div>
                    </div>
                </div>
                <p>비슷한 술</p>
                <ProductSwiper />
            </main>
            <Footer/>
        </div>
    )
}

export default Detail