import React, { useContext, useMemo } from "react";
import { useEffect, useState } from "react";

/** api */
import axios from "../api/axios.js";
import { getSoolRank } from "../api/api.js"


/** Context */
import AuthContext from "../context/AuthProvider.js";
/** Components import */
import ProductList from "../Components/ProductList.js"
import ProductSwiper from "../Components/ProductSwiper.js";
import Header from "../Components/Header.js";
import Footer from '../Components/Footer.js'

import './Home.css'

const Home = () => {
    const {authName} = useContext(AuthContext);
    // 화면에 보여줄 알코올 리스트
    const [alList, setAlList] = useState([]);
    const [recommList, setRecommList] = useState([]);
    const [hi, setHi] = useState('');
    // api에 넘겨줄 데이터 조건 -> 카테고리 누를 때마다 변한다.
    const [category, setCategory] = useState(0);
    // const [isloading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    // 검색 조건을 보내서 fetch 해오는 방식으로!!

    const categoryArr = useMemo(()=> {
        return [
            { name: '전체' , url: `/alcohol`},
            { name: '탁주' , url: `/alcohol?category=탁주`},
            { name: '약주' , url: `/alcohol?category=약주`},
            { name: '과실주' , url: `/alcohol?category=과실주`},
            { name: '증류식소주' , url: `/alcohol?category=증류식소주`}
        ]
    }, [])

    useEffect(() => {
        /** GET 요청 */
        const getSoolRanking = async () => {
            try {
                // setIsLoading(true)
                const response = await getSoolRank()
                setRecommList(Object.values(response.data))
                // setIsLoading(false)
            } catch (e){
                // setError(e);
            }
        };

        const getHello = async () =>{
            try{
                const res = await axios("http://127.0.0.1:5000/hello")
                console.log(res.data)
                setHi(res.data)
            }catch(e){
                console.log(e.response.data)
            }
        }
        
            getHello()
            getSoolRanking()
        
    }, [])

    // category가 변할 때마다 알맞은 조건의 데이터를 가져온다.
    useEffect(() =>{
        const getAlcoholList = async () => {
            try {
                // setIsLoading(true)
                const response = await axios.get(categoryArr[category].url)
                setAlList(Object.values(response.data))
            } catch (e){
                // setError(e);
            }
        }
        // setIsLoading(false);
        getAlcoholList();
    }, [category, categoryArr])

    return (
        <div className="Home">
            <Header />
            <h1>{hi}</h1>
            <div className="container">
                <section className="product__slide-container col-center">
                    {authName? 
                        <h2 className="home-title product__slide-title"><span>{authName}</span>님께 추천하는 토큰 랭킹</h2>
                        : <h2 className="home-title product__slide-title">이 술의 토큰 랭킹</h2>}
                    <ProductSwiper products={recommList}/>
                </section>
                <section className="product__list-container col">
                    <h2 className="home-title product__list-title">전통주 찾아보기</h2>
                    <div className="category__button-container">
                        {categoryArr.map((el, idx) => {
                            return (<button key={idx} className="button--category" onClick={() => setCategory(idx)}>{el.name}</button>)
                        })}
                    </div>
                    <div className="col-center">
                        <ProductList products={alList}/>
                    </div>
                    {/* {isloading ? <LoadingIndicator /> :<ProductList products={alList}/>} */}
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Home