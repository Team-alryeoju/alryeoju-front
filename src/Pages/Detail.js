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
    // ????????? ??????
    const { authName, isLogin } = useContext(AuthContext)
    // url??? sool id ?????? ?????????
    const { soolId } = useParams();
    
    /** ??????, ?????? */
    // const [error, setError] = useState('');
    // const [isLoading, setIsLoading] = useState(true)

    // ?????? ?????? ??????
    const [sool, setSool] = useState({});
    const [tokens, setTokens] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);

    // ????????? ??? ?????????
    const [similarSool, setSimilarSool] = useState([]);

    
    // ?????? loading
    const [purchaseLoading, setPurchaseLoading] = useState(false)
    // const [purchaseSuccess, setPurchasSuccess] = useState(false)
    
    const navigate = useNavigate();
    
    useEffect(() => {
        // URL : detail/:id

        // ????????? ????????? ?????? ?????? url??? GET ??????
        
        // -> auth ????????? url??? ???????????? ?????????
        // ?????? if?????? ???????????? ????????? ???????????? ?????? ?????? -> ?????? ?????? url??? ?????????
        // ????????? url ????????? ???????????? ???????????? ???????????? ????????? ??????

        // setIsLoading(true)
        setShowReviews(false)

        // ??? ?????? ????????????
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

        // ?????? ????????? ????????????
        getReviewList(soolId)
        .then((res) => {
            // ?????? ??????
            setReviews(Object.values(res.data))
        }).catch((e) => console.log(e))

        // ????????? ??? ????????? ????????????
        getSimilarSool(soolId)
            .then((res) => {
                setSimilarSool(Object.values(res.data))
            }).catch((e) => console.log(e))
        
            

    }, [soolId])

    const handlePurchaseBtn = () => {
        // ???????????? ??? ??? ????????????
        if(!isLogin){
            // ????????? ???????????? ????????????
            alert("????????? ??? ?????? ???????????????.")
            navigate("/login")
            return
        }

        const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))
        const buySool = async () =>{
            setPurchaseLoading(true)
            // setPurchasSuccess(false)
            // post ?????? ??????
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
                        <div className="detail_left">
                            <div className="product--img" style={{ backgroundImage: `url(${sool.img_link})` }}></div>
                            {/* <img src={sool.img_link} alt={sool.al_name}></img> */}
                        </div>
                        <div className="detail_right col">
                            <div className="product__content col">
                                <div className="product--detail col">
                                    <div className="product--name">{sool.al_name}</div>
                                    <div className="product--category">
                                        <label>??????: </label>
                                        <span>{sool.category}</span>
                                    </div>
                                    <div className="product--degree">
                                        <label>??????: </label>
                                        <span>{sool.degree}%</span>    
                                    </div>
                                    <div className="product--star">
                                        <Rating className="rating" name="read-only" size="large" value={Math.round(sool.score * 10) / 10} precision={0.25} readOnly />
                                        <span className="score">{String(Math.round(sool.score * 10) / 10)}</span>
                                    </div>
                                </div>
                                <div className="product--token col">
                                    {authName? 
                                        <div className="token--title"><span>{authName}</span>?????? ???????????? ?????? ??????</div>
                                        : <div className="token--title">??? ?????? ?????? ??????</div>}
                                    <ul className="row product--tokenList">
                                        {tokens.map((token, idx) => {
                                            return (<li key={idx} className="product--tokenList">#{token}</li>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="product__purchase col">
                                <span className="product--price">{sool.price}???</span>
                                <PurchaseButton disabled={purchaseLoading} onClick={handlePurchaseBtn}>
                                    {purchaseLoading ?
                                        (<div className="col-center"><CircularProgress size={30} color="inherit"/></div>)
                                        : <div>???????????? <FontAwesomeIcon icon={faAngleRight} /></div>}
                                </PurchaseButton>
                            </div>
                        </div>
                    </div>
                    <div className="reviews__container">
                        <div onClick={handleReviewShowBtn}>
                            <h2>??????</h2>
                            <span>({reviews.length})</span>
                            {showReviews ?
                                <button className="review__close-button"><FontAwesomeIcon icon={faCaretUp} /></button>
                                : <button className="review__open-button"><FontAwesomeIcon icon={faCaretDown} /></button>
                            }
                        </div>
                        {showReviews?
                            (
                                <ul>
                                    { reviews.length === 0 ? <div>????????? ????????? ????????????.</div>
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
                            { showReviews? <button className="col-center" onClick={handleReviewShowBtn}>??????</button> : null }
                        </ReviewCloseBtn>
                    </div>
                </main>
                <aside className="col-center detail-bottom">
                    <h2>????????? ???</h2>
                    <ProductSwiper products={similarSool}/>
                </aside>
            </div>
        </div>
    )
}

export default Detail