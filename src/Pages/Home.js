import React from "react";
import { useEffect, useState } from "react";
import axios from "../api/axios";
/** Components import */
import ProductList from "../Components/ProductList"
import ProductSwiper from "../Components/ProductSwiper";
import Footer from '../Footer'

import '../default.css'
import './Home.css'

const Home = () => {
    // 화면에 보여줄 알코올 리스트
    const [alList, setAlList] = useState([]);
    // api에 넘겨줄 데이터 조건 -> 카테고리 누를 때마다 변한다.
    const [category, setCategory] = useState('');
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 검색 조건을 보내서 fetch 해오는 방식으로!!
    const showAll = () => setCategory('')
    const showTakju = () => setCategory('탁주')
    const showYackju = () => setCategory('약주')
    const showWine = () => setCategory('과실주')
    const showSoju = () => setCategory('일반증류주')

    // category가 변할 때마다 알맞은 조건의 데이터를 가져온다.
    useEffect(() =>{
        let url = ''
        // sool List URL is random
        if(category === ''){
            url = `/random`
        }else{
            url = `/random?category=${category}`
        }

        const getAlcoholList = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(url)
                setAlList(response.data)
            } catch (e){
                setError(e);
            }
        }
        setIsLoading(false);
        getAlcoholList();
    }, [category])

    return (
        <div className="home-main">
            <section className="product__slide-container col-center">
                <ProductSwiper />
            </section>
            <section className="product__list-container col-center">
                <p className="list-title h2">전체 술</p>
                <div>
                    <button onClick={showAll}>전체</button>
                    <button onClick={showTakju}>탁주</button>
                    <button onClick={showYackju}>약주</button>
                    <button onClick={showWine}>과실주</button>
                    <button onClick={showSoju}>일반증류주</button>
                </div>
                <ProductList products={alList}/>
                {/* {isloading ? <LoadingIndicator /> :<ProductList products={alList}/>} */}
            </section>
            <Footer />
        </div>
    )
}

export default Home