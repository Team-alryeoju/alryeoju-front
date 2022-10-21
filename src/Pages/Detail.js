import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Footer from "../Footer";
import dummySool from "../static/dummyData";
import ProductSwiper from "../Components/ProductSwiper";


const Detail = () => {
    const { id } = useParams();

    // GET 요청
    // URL : detail/:id

    return (
        <div className="Detail">
            <h1>{id}의 상세 페이지 입니다.</h1>
            <div className="">
                <div>
                    <img src={dummyData.img} alt={dummyData.name}></img>
                </div>
                <div>
                    <div>{dummyData.name}</div>
                    <div>가격</div>
                    <div>도수</div>
                    <div>평점</div>
                </div>
                <ProductSwiper />

            </div>
            <Footer/>
        </div>
    )
}

export default Detail