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
            <p>현재 가짜 데이터로 작업중</p>
            <h1>{id}의 상세 페이지 입니다.</h1>
            <main className="detail__main col-center">
                <div className="product__detail row">
                    <div className="product--image">
                        <img src={dummyData.img} alt={dummyData.name}></img>
                    </div>
                    <div className="product__content">
                        <div className="product--name">{dummyData.name}</div>
                        <div className="product--price">가격</div>
                        <div className="product--degree">도수</div>
                        <div className="product--star">평점</div>
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