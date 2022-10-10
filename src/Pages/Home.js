import React from "react";

import ProductList from "../Components/ProductList"
import ProductSwiper from "../Components/ProductSwiper";
import Footer from '../Footer'

import '../default.css'
import './Home.css'

const Home = () => {
    return (
        <div className="home-main">
            <section className="product__slide-container col-center">
                <p>추천하는 술</p>
                <ProductSwiper />
            </section>
            <section className="product__list-container col-center">
                <p>전체 술</p>
                <ProductList />
            </section>
            <Footer />
        </div>
    )
}

export default Home