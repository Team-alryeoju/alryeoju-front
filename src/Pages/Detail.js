import React from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import AuthContext from "../context/AuthProvider";

import Header from "../Components/Header"
import Footer from "../Components/Footer";
import ProductSwiper from "../Components/ProductSwiper";

import "./Detail.css"



const Detail = () => {
    // 로그인 정보
    const { auth } = useContext(AuthContext)
    // url에 sool id 같이 들어옴
    const { soolId } = useParams();

    // url
    const [detailUrl, setDetailUrl] = useState('');

    const [isloading, setIsLoading] = useState(true);
    /** 에러 */
    const [error, setError] = useState('');
    const [sool, setSool] = useState({})
    const [token, setToken] = useState([])

    useEffect(() => {
        if(auth?.accesToken && auth?.accesToken !== "" && auth?.accesToken !== undefined){
            // detailUrl = `/detail/?al_id=${soolId}&id=${auth.id}`
            setDetailUrl(`/detail?al_id=${soolId}&id=16`)
        }
        else {
            setDetailUrl(`/detail?al_id=${soolId}`)
        }
    }, [auth])

    useEffect(() => {
        // URL : detail/:id

        // 로그인 상태에 따라 다른 url로 GET 요청
        
        // -> auth 정보로 url을 만들어야 하는데
        // 위의 if문에 해당하는 조건이 의도대로 되지 않음 -> 맞지 않는 url을 받아옴
        // 그래서 url 정확히 받아오기 전까지는 요청하지 않도록 수정
        if(detailUrl === ''){
            return
        }

        /** GET 요청 */
        const getSoolDetail = async () => {

            try {
                setIsLoading(true)
                const response = await axios.get(detailUrl,{
                    withCredentials: true
                })
                setSool(response.data.al_data)
                setToken(response.data.token_rank)
                console.log(response.data)
                // img_link, token_rank
            } catch (e){
                setError(e);
            }
        }
        getSoolDetail()
    }, [detailUrl])

    return (
        <div className="Detail">
            <Header />
            <main className="product__main col">
                <div className="product__detail row">
                    <div className="detail_left col-center">
                        <img src={sool.img_link} alt={sool.al_name}></img>
                    </div>
                    <div className="detail_right col">
                        <div className="product__content">
                            <div className="product--name">이름: {sool.al_name}</div>
                            <div className="product--price">가격</div>
                            <div className="product--degree">도수: {sool.degree}</div>
                            <div className="product--star">평점</div>
                        </div>
                        <div className="product__purchase">
                            <div className="product--count row">
                                <button>minus</button>
                                <p>1</p>
                                <button>plus</button>
                            </div>
                            <p>총 가격</p>
                            <button>구매</button>
                        </div>
                    </div>
                </div>
                {/* <p>비슷한 술</p> */}
                {/* <ProductSwiper /> */}
            </main>
            <Footer/>
        </div>
    )
}

export default Detail