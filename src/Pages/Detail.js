import React from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import AuthContext from "../context/AuthProvider";

/**Component */
import Header from "../Components/Header"
import ProductSwiper from "../Components/ProductSwiper";

import styled from "styled-components";
import "./Detail.css"

/** FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons"

import dummySool from "../static/dummyData"

const PurchaseButton = styled.button`
    background-color: #9999D8;
    width: 200px;
    height: 50px;
    border-radius: 10px;
    border: none;
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
`

const Detail = () => {
    // 로그인 정보
    const { auth } = useContext(AuthContext)
    // url에 sool id 같이 들어옴
    const { soolId } = useParams();

    // url, userName - Auth 에 따라 달라질 부분
    const [detailUrl, setDetailUrl] = useState('');
    const [userName , setUserName] = useState('');
    const [isloading, setIsLoading] = useState(true);
    /** 에러 */
    const [error, setError] = useState('');
    const [sool, setSool] = useState({})
    const [tokens, setTokens] = useState([])

    useEffect(() => {
        if(auth?.accesToken && auth?.accesToken !== "" && auth?.accesToken !== undefined){
            // detailUrl = `/detail/?al_id=${soolId}&id=${auth.id}`
            setDetailUrl(`/detail?al_id=${soolId}&id=16`)
            setUserName(auth.userName);
        }
        else {
            setDetailUrl(`/detail?al_id=${soolId}`)
            setUserName('');
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

                const soolData = response.data.al_data

                // 영어로 들어온 카테고리 한글로 바꿔줌!
                switch(soolData.category){
                    case 'takju':
                        soolData.category = '탁주';
                        break
                    case 'chungju':
                        soolData.category = '약주';
                        break
                    case 'wine':
                        soolData.category = '과실주';
                        break
                    case 'soju':
                        soolData.category = '일반증류주';
                        break
                    default:
                        break
                }

                setSool(soolData)
                setTokens(response.data.token_rank)
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
                        <img src={dummySool[0].img} alt={sool.al_name}></img>
                        {/* <img src={sool.img_link} alt={sool.al_name}></img> */}
                    </div>
                    <div className="detail_right col">
                        <div className="product__content col">
                            <div className="product--detail col">
                                <div className="product--name">{sool.al_name}</div>
                                <div className="product--category">주종 : {sool.category}</div>
                                <div className="product--degree">도수: {sool.degree}%</div>
                                <div className="product--star">
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                </div>
                            </div>
                            <div className="product--token col">
                                <div className="token--title"><span>{userName}</span>님께 추천하는 토큰 랭킹</div>
                                <ul className="row product--tokenList">
                                    {tokens.map((token) => {
                                        return (<li className="product--tokenList">#{token}</li>)
                                    })}
                                </ul>
                            </div>
                            {/* <div className="product--price">가격</div> */}
                        </div>
                        <div className="product__purchase col">
                            {/* <div className="product--count row">
                                <button>minus</button>
                                <p>1</p>
                                <button>plus</button>
                            </div>
                            <p>총 가격</p> */}
                            <PurchaseButton>바로구매 <FontAwesomeIcon icon={faAngleRight} /></PurchaseButton>
                        </div>
                    </div>
                </div>
            </main>
            <div className="col-center detail-bottom">
                <h2>비슷한 술</h2>
                <ProductSwiper products={dummySool}/>
            </div>
        </div>
    )
}

export default Detail