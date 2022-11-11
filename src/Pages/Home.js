import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
/** Components import */
import ProductList from "../Components/ProductList"
import ProductSwiper from "../Components/ProductSwiper";
import Header from "../Components/Header";
import Footer from '../Components/Footer'

import './Home.css'

const Home = () => {
    const {auth} = useContext(AuthContext);
    // 화면에 보여줄 알코올 리스트
    const [alList, setAlList] = useState([]);
    const [recommList, setRecommList] = useState([]);
    /** auth 마다 달라질 state */
    // API 요청 URL
    const [recommUrl , setRecommUrl] = useState('')
    // title
    const [title, setTitle] = useState('')
    // api에 넘겨줄 데이터 조건 -> 카테고리 누를 때마다 변한다.
    const [category, setCategory] = useState(0);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 검색 조건을 보내서 fetch 해오는 방식으로!!

    const categoryArr = [
        { name: '전체' , url: `/alcohol`},
        { name: '탁주' , url: `/alcohol?category=탁주`},
        { name: '약주' , url: `/alcohol?category=약주`},
        { name: '과실주' , url: `/alcohol?category=과실주`},
        { name: '증류식소주' , url: `/alcohol?category=증류식소주`}
    ]

    useEffect(() => {
        if(auth?.accesToken && auth?.accesToken !== "" && auth?.accesToken !== undefined){
            // swiper 제목
            setTitle(`${auth.userName}님에게 추천하는 술`)
            // *고칠것*id를 auth id로 바꿔야함!
            setRecommUrl(`/recomm?id=${auth.id}`)
        }
        else {
            setTitle(`Top 15`)
            setRecommUrl(`/recomm`)
        }
    }, [auth])

    useEffect(() => {
        // URL : detail/:id

        // 로그인 상태에 따라 다른 url로 GET 요청
        
        // -> auth 정보로 url을 만들어야 하는데
        // 위의 if문에 해당하는 조건이 의도대로 되지 않음 -> 맞지 않는 url을 받아옴
        // 그래서 url 정확히 받아오기 전까지는 요청하지 않도록 수정
        if(recommUrl === ''){
            return
        }

        /** GET 요청 */
        const getSoolDetail = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(recommUrl, {
                    withCredentials: true
                })
                setRecommList(Object.values(response.data))

            } catch (e){
                setError(e);
            }
        };

        getSoolDetail()
        
    }, [recommUrl])

    // category가 변할 때마다 알맞은 조건의 데이터를 가져온다.
    useEffect(() =>{
        const getAlcoholList = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(categoryArr[category].url)
                setAlList(Object.values(response.data))
            } catch (e){
                setError(e);
            }
        }

        setIsLoading(false);
        getAlcoholList();
    }, [category])

    return (
        <div className="Home">
            <Header />
            <div className="container">
                <section className="product__slide-container col-center">
                    <h2 className="home-title product__slide-title">{title}</h2>
                    <ProductSwiper title={title} products={recommList}/>
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