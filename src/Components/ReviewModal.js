import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/** api */
import { getSoolDetail , postReviews} from '../api/api.js'

import styled from 'styled-components';

import { Rating } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Star } from '@mui/icons-material';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const ModalBackDrop = styled.div`
    position: fixed; // 보이는 화면에서 위치가 고정
    top: 0; bottom: 0; left: 0; right: 0; // 전체 화면에 요소를 꽉 채울 때!

    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`

const ModalView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 60%;
    height: 80%;
    min-height: 200px;
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    overflow: scroll;

    & > div:first-child{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        & > svg{
            cursor: pointer;
        }
    }
`

const ModalMain = styled.main`
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const ReviewProduct = styled.div`
    width: 100%;
    flex: 2 0 40%;
    display: flex;
    margin-bottom: 20px;

    & > .review--img{
        width: 200px;
        height: 200px;
        img {
            border-radius: 50%;
            vertical-align: top;
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }

    & > .review--detail{
        flex: 1;
        margin-left: 20px;
        margin-top: 10px;
        > .review--name{
            color: var(--basic-font-color);
            font-size: 1.5rem;
            font-weight: 500;
        }

        & > div {
            margin-top: 10px;
            & > .review--sub{
                color: var(--grey-font-color);
                margin-bottom: 5px;
                font-size: 0.9rem;
            }

            & > .review--price{
                color: var(--basic-font-color);
                margin-top: 10px;
                font-size: 1.1rem;
                font-weight: 500;
            }
        }


    }
    
`

const ReviewForm = styled.form`
    width: 100%;
    flex: 3 0 60%;
    /* border: solid 2px var(--light-grey-color);
    border-radius: 10px; */

    display: flex;
    flex-direction: column;
    align-items: center;

    & > .score {
        width: 100%;
        height: max-content;

        & > div:first-child{
            font-size: 1rem;
            color: var(--main-color);
            font-weight: 500;
        }
    }
    & > .review{
        width: 100%;
        height: 80%;
        & > label{
            padding-left: 10px;
            margin-bottom: 5px;
            font-size: 1rem;
            color: var(--main-color);
            font-weight: 500;
        }

        & > textarea {
            height: 100%;
            border: none;
            border-radius: 10px;
            resize: none;
            padding: 10px;
            font-size: 1rem;
            border: 2px solid var(--light-grey-color);
            
            &:focus{
                outline: none;
                background-color: var(--light-grey-color); 
            }
        }
    }

    & > button{
        margin-top: 10px;
        height: 50px;
        width: 100px;
        background-color: var(--emphasize-color);
        border: none;
        color: white;
        font-size: 1rem;
        font-weight: 400;
        border-radius: 25px;
    }



`
// const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

const ReviewModal = ({ modalClose, alcohol }) => {
    const [alDetail, setAlDetail] = useState({});

    /** review Text */
    const [review, setReview] = useState('');
    /** rating */
    const [score, setScore] = useState(0.5);
    const [hover, setHover] = useState(-1);
    
    /** post loading */
    const [reviewLoading, setReviewLoading] = useState(false);

    useEffect(()=>{
        getSoolDetail(alcohol.al_id)
            .then((res) => {
                res.data.al_data.price = (res.data.al_data.price).toLocaleString()
                setAlDetail(res.data.al_data)

            }).catch((e)=>{
                if(e.response.status === 401){
                    sessionStorage.removeItem("access_token")
                    window.location.reload()
                }
            })
    }, [alcohol])

    const reviewHandler = (e) => {
        setReview(e.target.value)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setReviewLoading(true);
        const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

        try{
            await postReviews(alcohol.al_id, alcohol.al_name, review, score)
            await wait(1000)
            setReviewLoading(false);
            alert("리뷰 작성 완료!")
            modalClose();
        }catch(e){
            console.log(e.response.data)
        }
    }

    return (
        <>
            <ModalBackDrop onClick={modalClose}>
                <ModalView  onClick={(e) => e.stopPropagation()}>
                    <div>
                        <FontAwesomeIcon onClick={modalClose} size="lg" icon={faXmark} />
                    </div>
                    <ModalMain>
                        <ReviewProduct>
                            <div className='review--img'>
                                <Link to={`/detail/${alcohol.al_id}`}>
                                    <img src={alDetail.img_link} alt={alcohol.al_name}></img>
                                </Link>
                            </div>
                            <div className='review--detail'>
                                <div className='review--name'>{alcohol.al_name}</div>
                                <div>
                                    <div className='review--sub'>
                                        <label>구매날짜 : </label>
                                        <span>{alcohol.date}</span>
                                    </div>
                                    <div className='review--sub'>
                                        <label>평점 : </label>
                                        <span>{Math.round(alDetail.score * 10) / 10}점</span>    
                                    </div>
                                    <div className='review--price'>
                                        <label>가격 : </label>
                                        <span>{alDetail.price}원</span>
                                    </div>
                                </div>
                            </div>
                        </ReviewProduct>
                        <ReviewForm onSubmit={handleSubmit}>
                            <div className='col-center score'>
                                <div>이 전통주는 어떠셨나요?</div>
                                <Rating
                                    name="hover-feedback"
                                    value={score}
                                    size="large"
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        setScore(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {score !== null && (
                                    <div>{hover !== -1 ? hover : score}</div>
                                )}
                            </div>
                            <div className='col review'>
                                <label>리뷰</label>
                                <textarea onChange={reviewHandler} placeholder='리뷰를 적어주세요'></textarea>
                            </div>
                            <button type="submit" className="col-center">
                                {reviewLoading? <CircularProgress size={20} color="inherit"/>:"리뷰 작성"}
                            </button>
                        </ReviewForm>
                    </ModalMain>
                </ModalView>
            </ModalBackDrop>
        </>
    );
};

export default ReviewModal;