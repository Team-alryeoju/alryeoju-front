import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

/** Component */
import Header from "../Components/Header";
import PurchasedList from "../Components/PurchasedList";

import styled from "styled-components";

const MyPageContainer = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1{
        color: var(--main-color);
        text-align: center;
    }

    & h2{
        color: var(--basic-font-color);
        text-align: center;
        margin-top: 0.5rem;
    }

    & > main > div{
        margin-top: 40px;
    }

`

const MyPage = () => {
    const { auth } = useContext(AuthContext)
    const [alList, setAlList] = useState([])
    const [myPageUrl, setMyPageUrl] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const getPurchasedList = async () => {

            try {
                const response = await axios.post(`/purchased_items`, 
                JSON.stringify({id : auth.id}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                })
                setAlList(Object.values(response.data))
            } catch (e){
                setError(e.response.data);
            }
        }
        getPurchasedList()
        
    }, [auth])

    return (
        <>
            <Header></Header>
            <MyPageContainer>
                <div>
                    <h1>구매 내역</h1>
                    <h2>{auth.userName}님 안녕하세요!</h2>
                </div>
                <main>
                    {alList.length === 0 ? 
                        <div>구매 내역이 없습니다.</div> 
                        : <PurchasedList products={alList}></PurchasedList>
                    }
                </main>
            </MyPageContainer>
            <p>{error}</p>
        </>
    )
}

export default MyPage