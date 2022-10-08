import React from "react";
import ProductList from "../Components/ProductList"
import ProductSlide from "../Components/ProductSlide";
import Footer from '../Footer'


import './Home.css'

const Home = () => {
    return (
        <div className="home-main">
            <section className="product__slide-container">
                <p>추천하는 술</p>
                <ProductSlide />
            </section>
            <section className="product__list-container">
                <p>전체 술</p>
                <ProductList />
            </section>
            <Footer />
        </div>
    )
}

export default Home