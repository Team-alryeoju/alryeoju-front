import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

/** api */
import { getSoolDetail, getSimilarSool, purchase } from "../api/api.js"
/** Context */
import AuthContext from "../context/AuthProvider.js";

/**Component */
import Header from "../Components/Header.js"
import ProductSwiper from "../Components/ProductSwiper.js";

/** CSS */
import styled from "styled-components";
import "./Detail.css"

/** MUI */
import { Rating } from '@mui/material';
import { CircularProgress } from '@mui/material';

/** FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"


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
    const { auth, isLogin } = useContext(AuthContext)
    // url에 sool id 같이 들어옴
    const { soolId } = useParams();
    
    /** 에러, 로딩 */
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    // 술에 대한 정보
    const [sool, setSool] = useState({});
    const [tokens, setTokens] = useState([]);

    // 비슷한 술 리스트
    const [similarSool, setSimilarSool] = useState([]);
    
    // 구매 loading
    const [purchaseLoading, setPurchaseLoading] = useState(false)
    const [purchaseSuccess, setPurchasSuccess] = useState(false)
    
    const navigate = useNavigate();
    
    useEffect(() => {
        // URL : detail/:id

        // 로그인 상태에 따라 다른 url로 GET 요청
        
        // -> auth 정보로 url을 만들어야 하는데
        // 위의 if문에 해당하는 조건이 의도대로 되지 않음 -> 맞지 않는 url을 받아옴
        // 그래서 url 정확히 받아오기 전까지는 요청하지 않도록 수정

        setIsLoading(true)

        // 술 정보 가져오기
        getSoolDetail(soolId)
            .then((res)=>{
                setSool(res.data.al_data)
                setTokens(res.data.token_rank)
                setIsLoading(false)

            }).catch((e)=>{
                setError(e.response.data);
            })
        
        // 비슷한 술 리스트 가져오기
        getSimilarSool(soolId)
            .then((res) => {
                setSimilarSool(Object.values(res.data))
            }).catch((e) => setError(e.response.data))

    }, [])

    const handlePurchaseBtn = () => {
        // 로그인이 안 된 상태라면
        if(!isLogin){
            // 로그인 화면으로 전환시킴
            alert("로그인 후 구매 가능합니다.")
            navigate("/login")
            return
        }

        const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))
        const buySool = async () =>{
            setPurchaseLoading(true)
            setPurchasSuccess(false)
            // post 작업 실행
            try{
                const res = await purchase(soolId);
                console.log(res.msg)
                await wait(500)
                alert("구매 완료!")
                setPurchasSuccess(true);
                setPurchaseLoading(false);
            }catch(e){
                console.log(e)
                setPurchasSuccess(false)
            }
        }

        buySool()

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
                                    <div className="product--category">
                                        <lable>주종: </lable>
                                        <span>{sool.category}</span>
                                    </div>
                                    <div className="product--degree">
                                        <lable>도수: </lable>
                                        <span>{sool.degree}%</span>    
                                    </div>
                                    <div className="product--star">
                                        <Rating className="rating" name="read-only" value={Math.round(sool.score * 10) / 10} precision={0.25} readOnly />
                                        <span className="score">{Math.round(sool.score * 10) / 10}</span>
                                    </div>
                                </div>
                                <div className="product--token col">
                                    {isLogin? 
                                        <div className="token--title"><span>{auth.userName}</span>님께 추천하는 토큰 랭킹</div>
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
                                <span className="product--price">{(sool.price)}원</span>
                                <PurchaseButton disabled={purchaseLoading} onClick={handlePurchaseBtn}>
                                    {purchaseLoading ?
                                        (<div className="col-center"><CircularProgress size={30} color="inherit"/></div>)
                                        : <div>바로구매 <FontAwesomeIcon icon={faAngleRight} /></div>}
                                </PurchaseButton>
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </main>
                <div className="col-center detail-bottom">
                    <h2>비슷한 술</h2>
                    <ProductSwiper products={similarSool}/>
                </div>

            </div>
        </div>
    )
}

export default Detail