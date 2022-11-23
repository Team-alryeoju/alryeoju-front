import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";


/** Swiper */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";

/** FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

import "./ProductSwiper.css"
import ProductCard from "./ProductCard.js";


const NavigationButton = styled.button`
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    background-color: white;
    border: 2px solid var(--main-color);
    color: var(--main-color);

    svg{
        width: 1rem;
        height: 1rem;
    }

    &.swiper-button-disabled{
        color: white;
        border: none;
    }
`

// function getWindowSize() {
//     const {innerWidth : width, innerHeight: height} = window;
//     return {width, height};
// }

function ProductSwiper({ products }) {
    // const [slide, setSlide] = useState(3);
    const [swiperSetting, setSwiperSetting] = useState(null);
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    useEffect(() => {
        if(!swiperSetting){
            const settings = {
                slidesPerView: 1,
                spaceBetween: 15,
                slidesPerGroup: 1,
                loop: false,
                loopFillGroupWithBlank: true,
                navigation: {
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current
                },
                onBeforeInit: (swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.update();
                    swiper.slideTo(0);
                    swiper.update();
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,  //브라우저가 768보다 클 때
                        slidesPerGroup: 2,
                        spaceBetween: 15,
                    },
                    1024: {
                      slidesPerView: 3,  //브라우저가 1024보다 클 때
                      slidesPerGroup: 3,
                      spaceBetween: 15,
                    },
                },
                modules: [Navigation],
                className: "mySwiper"
            }
            setSwiperSetting(settings)
        }
    },[swiperSetting])

    // useEffect(() => {
    //     const handleResize = () => {
    //         const windowWidth = getWindowSize().width

    //         if(windowWidth <= 500) setSlidesPerView(1);
    //         else if(windowWidth <= 900) setSlidesPerView(2);
    //         else setSlidesPerView(3);
    //     }

    //     handleResize();
    //     window.addEventListener("resize", handleResize)

    //     return () => { // 언마운트
    //         window.removeEventListener("resize", handleResize)
    //     }

    // }, [])

    return (
        <div className="swiper-container row-center">
            <NavigationButton ref={navigationPrevRef}><FontAwesomeIcon icon={faAngleLeft} /></NavigationButton>
            { swiperSetting ? (<Swiper {...swiperSetting}>
                {products.map((sool, idx) => <SwiperSlide key={idx}><ProductCard sool={sool}/></SwiperSlide>)}
            </Swiper>) : null}
            <NavigationButton ref={navigationNextRef}><FontAwesomeIcon icon={faAngleRight} /></NavigationButton>
        </div>
  );
}


export default ProductSwiper
