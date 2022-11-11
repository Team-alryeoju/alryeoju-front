import React from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
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
    background-color: var(--emphasize-color);
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
    const [sool, setSool] = useState({});
    const [tokens, setTokens] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(auth?.accesToken && auth?.accesToken !== "" && auth?.accesToken !== undefined){
            // detailUrl = `/detail/?al_id=${soolId}&id=${auth.id}`
            setDetailUrl(`/detail?al_id=${soolId}&id=${auth.id}`)
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

        const getSoolDetail = async () => {

            try {
                setIsLoading(true)
                const response = await axios.get(detailUrl, {
                    withCredentials: true
                })
                const soolData = response.data.al_data

                setSool(soolData)
                setTokens(response.data.token_rank)
                // img_link, token_rank
            } catch (e){
                setError(e);
            }
        }
        getSoolDetail()

        // fetch('http://127.0.0.1:5000' + detailUrl, { method: 'GET' })
        // .then((response) => {
        //     console.log(response.json)
        //     return response.json()
        // })
        // .then((data) => {
        //     // sool 정보는 al_data
        //     // 토큰은 token_rank로 들어옴
        //     setSool(data.al_data)
        //     setTokens(data.token_rank)
        //     console.log(data)
        // })
        // .catch((error) => console.log(error));

    }, [detailUrl])

    const handlePurchaseBtn = () => {
        // 로그인이 안 된 상태라면
        if(!auth?.accesToken || auth?.accesToken === "" || auth?.accesToken === undefined){
            // 로그인 화면으로 전환시킴
            alert("로그인 후 구매 가능합니다.")
            navigate("/login")
            return
        }

        alert("구매 완료")

    }

    return (
        <div className="Detail">
            <Header />
            <div className="container">
                <main className="product__main col">
                    <div className="product__detail row">
                        <div className="detail_left col-center">
                            <img src={sool.img_link} alt={sool.al_name}></img>
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
                                        <p>{sool.score}</p>
                                    </div>
                                </div>
                                <div className="product--token col">
                                    {userName !== ''? 
                                        <div className="token--title"><span>{userName}</span>님께 추천하는 토큰 랭킹</div>
                                        : <div className="token--title">이 술의 토큰 랭킹</div>}
                                    <ul className="row product--tokenList">
                                        {tokens.map((token, idx) => {
                                            return (<li key={idx} className="product--tokenList">#{token}</li>)
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
                                <PurchaseButton onClick={handlePurchaseBtn}>바로구매 <FontAwesomeIcon icon={faAngleRight} /></PurchaseButton>
                            </div>
                        </div>
                    </div>
                </main>
                <div className="col-center detail-bottom">
                    <h2>비슷한 술</h2>
                    <ProductSwiper products={dummySool}/>
                </div>

            </div>
        </div>
    )
}

export default Detail