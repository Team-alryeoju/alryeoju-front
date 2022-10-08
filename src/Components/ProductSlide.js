import React, { useState, useRef, useEffect } from "react";

import dummySool from "../static/dummyData";
import ProductCard from "./ProductCard";
import './ProductSlide.css'

const ProductSlide = () => {
    // 카드 + margin 값 -> 220px
    // css 가 변경되면 값도 변경되어야 함!
    const cardSize = 220;

    // product-slide__wrapper의 width를 가져오기 위해 useRef 사용한다.
    const ref = useRef()

    // 페이지 당 들어갈 카드 수 limit (state)
    const [limit, setLimit] = useState(3);

    // 현재 페이지 번호 page (state)
    const [page, setPage] = useState(1);

    // 현재 페이지의 첫번째 요소의 index 구하기
    let offset = (page - 1) * limit; 

    // 전체 페이지 계산 : 전체 데이터의 개수를 페이지 당 표시할 개수로 나눈다.
    const numPage = Math.ceil(dummySool.length / limit)

    const changeWidth = () => {
        let newWidth = ref.current.clientWidth;
        
        setPage(1);
        // if(newWidth > cardSize * 5) setLimit(5);
        // else if(newWidth > cardSize * 4) setLimit(4);
        if(newWidth > cardSize * 3) setLimit(3);
        else if(newWidth > cardSize * 2) setLimit(2);
        else setLimit(1);
    }

    useEffect(() => {
        changeWidth();
    }, [])

    useEffect(() => {
        window.addEventListener("resize", changeWidth)
    }, [])

    return (
        <div className="product-slide">
            {/* 이전 페이지 이동 */}
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>left</button>
            <ul className="product-slide__wrapper" ref={ref}>
                {/* 페이지 별로 slice 해서 보여준다 */}
                {dummySool.slice(offset, offset+limit).map((sool) => <li key={sool.id}><ProductCard sool={sool}/></li>)}
            </ul>
            {/* 다음 페이지 이동 */}
            <button onClick={() => setPage(page + 1)} disabled={page === numPage}>right</button>
        </div>
    )
}

export default ProductSlide