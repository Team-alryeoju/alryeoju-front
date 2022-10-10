import React, { useState, useRef, useEffect } from "react";

import dummySool from "../static/dummyData";
import ProductCard from "./ProductCard";
import './ProductSlide.css'

const ProductSlide = () => {
    // 카드 + margin 값 -> 220px
    // css 가 변경되면 값도 변경되어야 함!
    // 카드는 총 15개가 들어갈 예정
    const cardSize = 220;

    const ref = useRef()

    const [limit, setLimit] = useState(3); // 페이지 당 들어갈 카드 수 limit (state)
    const [page, setPage] = useState(1); // 현재 페이지 번호 page (state)

    // const offset = (page - 1) * limit; // 현재 페이지의 첫번째 요소의 index 구하기
    const numPage = Math.ceil(dummySool.length / limit) // 전체 페이지 계산 : 전체 데이터의 개수를 페이지 당 표시할 개수로 나눈다.
    // const showCard = 1;

    const changeWidth = () => {
        let newWidth = ref.current.clientWidth;
        
        setPage(1);

        if(newWidth <= cardSize + 1) setLimit(1);
        else if(newWidth <= cardSize * 2 + 1) setLimit(2);
        else setLimit(3);
    }

    // const handlePrevBtn = () => {
    // }

    useEffect(() => {
        changeWidth();
        window.addEventListener("resize", changeWidth)
    }, [])

    return (
        <div className="product-slide col-center">
            <div className="product-slide__main row-center">
                <div className="product-slide__wrapper row">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>prev</button>
                    <ul className="product-slide__content row" ref={ref}>
                        {dummySool.map((sool) => <li key={sool.id}><ProductCard sool={sool}/></li>)}
                    </ul>
                    <button onClick={() => setPage(page + 1)} disabled={page === numPage}>next</button>
                </div>
            </div>
        </div>
    )
}

export default ProductSlide