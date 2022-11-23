import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

/** api */
import { getSoolDetail, getSimilarSool, getReviewList, purchase } from "../api/api.js"
/** Context */
import AuthContext from "../context/AuthProvider.js";

/**Component */
import Header from "../Components/Header.js"
import ProductSwiper from "../Components/ProductSwiper.js";
import TopButton from "../Components/TopButton.js";

/** CSS */
import styled from "styled-components";
import "./Detail.css"

/** MUI */
import { Rating } from '@mui/material';
import { CircularProgress } from '@mui/material';

/** FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"


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

const Review = styled.li`
    list-style: none;
    /* height: 50px; */
    flex: 1 0 max-content;
    margin-bottom: 10px;
    
    &:not(:last-child)::after{
        display: inline-block;
        content: "";
        width: 100%;
        height: 3px;
        margin-top: 30px;
        background-color: white;
    }

    > div{
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        > span:nth-child(1){
            font-size: 1rem;
            font-weight: 500;
            color: var(--basic-font-color);
        }

        > div{
            display: flex;
            align-items: center;
            > .review--date{
                color: var(--grey-font-color);
                font-size: 0.8rem;
            }
        }
    }

    > p{
        color: var(--basic-font-color);
        font-size: 0.9rem;
        margin-top: 1rem;
        padding-left: 1rem;
    }
`

const ReviewCloseBtn = styled.div`

    > button {
        border: none;
        background-color: white;
        margin-top: 0.5rem;
        font-size: 1rem;
        color: var(--main-color);
        font-weight: 500;
    }
`

const Detail = () => {
    // 로그인 정보
    const { authName, isLogin } = useContext(AuthContext)
    // url에 sool id 같이 들어옴
    const { soolId } = useParams();
    
    /** 에러, 로딩 */
    // const [error, setError] = useState('');
    // const [isLoading, setIsLoading] = useState(true)

    // 술에 대한 정보
    const [sool, setSool] = useState({});
    const [tokens, setTokens] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);

    // 비슷한 술 리스트
    const [similarSool, setSimilarSool] = useState([]);

    
    // 구매 loading
    const [purchaseLoading, setPurchaseLoading] = useState(false)
    // const [purchaseSuccess, setPurchasSuccess] = useState(false)
    
    const navigate = useNavigate();
    
    useEffect(() => {
        // URL : detail/:id

        // 로그인 상태에 따라 다른 url로 GET 요청
        
        // -> auth 정보로 url을 만들어야 하는데
        // 위의 if문에 해당하는 조건이 의도대로 되지 않음 -> 맞지 않는 url을 받아옴
        // 그래서 url 정확히 받아오기 전까지는 요청하지 않도록 수정

        // setIsLoading(true)
        setShowReviews(false)

        // 술 정보 가져오기
        getSoolDetail(soolId)
            .then((res)=>{
                res.data.al_data.price = (res.data.al_data.price).toLocaleString()
                setSool(res.data.al_data)
                setTokens(res.data.token_rank)
                // setIsLoading(false)
            }).catch((e)=>{
                if(e.response.status === 401){
                    sessionStorage.removeItem("access_token")
                    window.location.reload()
                }
            })

        // 리뷰 데이터 가져오기
        getReviewList(soolId)
        .then((res) => {
            // 리뷰 설정
            setReviews(Object.values(res.data))
        }).catch((e) => console.log(e))

        // 비슷한 술 리스트 가져오기
        getSimilarSool(soolId)
            .then((res) => {
                setSimilarSool(Object.values(res.data))
            }).catch((e) => console.log(e))
        
            

    }, [soolId])

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
            // setPurchasSuccess(false)
            // post 작업 실행
            try{
                const res = await purchase(soolId);
                await wait(500)
                alert(res.data.msg)
                // setPurchasSuccess(true);
                setPurchaseLoading(false);
            }catch(e){
                console.log(e)
                if(e.response.status === 401){
                    sessionStorage.removeItem("access_token")
                    window.location.reload()
                }
                // setPurchasSuccess(false)
            }
        }

        buySool()

    }

    const handleReviewShowBtn = () => {
        setShowReviews(!showReviews)
    }

    return (
        <div className="Detail">
            <Header />
            <TopButton />
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
                                        <label>주종: </label>
                                        <span>{sool.category}</span>
                                    </div>
                                    <div className="product--degree">
                                        <label>도수: </label>
                                        <span>{sool.degree}%</span>    
                                    </div>
                                    <div className="product--star">
                                        <Rating className="rating" name="read-only" size="large" value={Math.round(sool.score * 10) / 10} precision={0.25} readOnly />
                                        <span className="score">{String(Math.round(sool.score * 10) / 10)}</span>
                                    </div>
                                </div>
                                <div className="product--token col">
                                    {authName? 
                                        <div className="token--title"><span>{authName}</span>님께 추천하는 토큰 랭킹</div>
                                        : <div className="token--title">이 술의 토큰 랭킹</div>}
                                    <ul className="row product--tokenList">
                                        {tokens.map((token, idx) => {
                                            return (<li key={idx} className="product--tokenList">#{token}</li>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="product__purchase col">
                                <span className="product--price">{sool.price}원</span>
                                <PurchaseButton disabled={purchaseLoading} onClick={handlePurchaseBtn}>
                                    {purchaseLoading ?
                                        (<div className="col-center"><CircularProgress size={30} color="inherit"/></div>)
                                        : <div>바로구매 <FontAwesomeIcon icon={faAngleRight} /></div>}
                                </PurchaseButton>
                            </div>
                        </div>
                    </div>
                    <div className="reviews__container">
                        <div onClick={handleReviewShowBtn}>
                            <h2>리뷰</h2>
                            <span>({reviews.length})</span>
                            {showReviews ?
                                <button className="review__close-button"><FontAwesomeIcon icon={faCaretUp} /></button>
                                : <button className="review__open-button"><FontAwesomeIcon icon={faCaretDown} /></button>
                            }
                        </div>
                        {showReviews?
                            (
                                <ul>
                                    { reviews.length === 0 ? <div>작성된 리뷰가 없습니다.</div>
                                        : (reviews.map((el, idx) => {
                                                return <Review key={idx}>
                                                    <div className="review--top">
                                                        <span>{el.u_name}</span>
                                                        <div>
                                                            <Rating className="rating" name="read-only" size="small" value={Math.round(el.score * 10) / 10} precision={0.5} readOnly />
                                                            <span className="review--date">{el.datetime}</span>
                                                        </div>
                                                    </div>
                                                    <p className="review--bottom">{el.review}</p>
                                                </Review>
                                            }))
                                    }
                                </ul>
                            )
                            : null}
                        <ReviewCloseBtn className="col-center">
                            { showReviews? <button className="col-center" onClick={handleReviewShowBtn}>닫기</button> : null }
                        </ReviewCloseBtn>
                    </div>
                </main>
                <aside className="col-center detail-bottom">
                    <h2>비슷한 술</h2>
                    <ProductSwiper products={similarSool}/>
                </aside>
            </div>
        </div>
    )
}

export default Detail