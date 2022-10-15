import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./ProductSwiper.css"
import dummySool from "../static/dummyData";
import ProductCard from "./ProductCard";

// import required modules
import { Pagination, Navigation } from "swiper";


function getWindowSize() {
    const {innerWidth : width, innerHeight: height} = window;
    return {width, height};
}

export default function ProductSwiper() {

    const [slide, setSlide] = useState(3);

    useEffect(() => {

        const handleResize = () => {
            const windowWidth = getWindowSize().width

            if(windowWidth <= 500) setSlide(1);
            else if(windowWidth <= 900) setSlide(2);
            else setSlide(3);
        }

        handleResize();
        window.addEventListener("resize", handleResize)

        return () => { // 언마운트
            window.removeEventListener("resize", handleResize)
        }

    }, [])

    return (
        <div className="swiper-container">
            <p className="swiper-title h2">예린 님께 추천하는 술</p>
            <Swiper
                slidesPerView={slide}
                spaceBetween={15}
                slidesPerGroup={slide}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {dummySool.map((sool) => <SwiperSlide key={sool.id}><ProductCard sool={sool}/></SwiperSlide>)}
            </Swiper>
        </div>
  );
}
