import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductSwiper from "../Components/ProductSwiper.js"

// 
import dummySool from '../static/dummyData.js';

import styled from 'styled-components';


const TestResultContainer = styled.div`
    /* margin-top: 40px; */
    height: 100%;

    & > h1{
        margin-bottom: 0.5rem;
        color: #2d2d2d;
    }

    & h2{
        margin: 0.2rem;
    }

    & > .loading__container{
        height: 80%;
    }
    & .loadingImg {
        object-position: 50% 50%;
        object-fit: contain;

        width: 100%;
        height: 100%;
    }
`

const TestResult = ({answers}) => {
    // answers가 정답임 -> 서버로 post 하는 작업 필요
    // loading 화면 일부로 추가하면 좋을듯 (연산하는 느낌이 들게)
    // survey 하지 않고 다른 경로로 접속해서 들어오지 못하게 하는 경우 추가 필요
        // -> 이 경우 answers가 빈 배열일 것이다.

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if(answers.length === 0) {
            navigate('/test')
        }

        const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

        const getResult = async () =>{
            setIsLoading(true)
            // post 작업 실행
            // post 작업 하고 answers 초기화 해야함!
            await wait(3000)
            setIsLoading(false)
        }

        getResult()

    },[navigate])

    return (
        <TestResultContainer>
            {isLoading? <div className='loading__container'><img className="loadingImg" src="/loading.gif" alt='loading'/></div> : 
                <div className='col-center'>
                    <h2>당신은 이런 전통주를 좋아할지도 몰라요!</h2>
                    <ProductSwiper products={dummySool}/>
                </div>
            }        
        </TestResultContainer>
    );
};

export default TestResult;