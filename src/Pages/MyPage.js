import React, { useContext, useState, useEffect } from "react";

/** api */
import { getPurchasedItems } from "../api/api.js"
import AuthContext from "../context/AuthProvider.js";

/** Component */
import Header from "../Components/Header.js";
import PurchasedList from "../Components/PurchasedList.js";

import styled from "styled-components";

const MyPageContainer = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
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

    & > div> main {
        margin-top: 40px;
    }

`

const MyPage = () => {
    const { authName, isLogin } = useContext(AuthContext)
    const [alList, setAlList] = useState([])

    useEffect(() => {
        
        if(!isLogin){
            return
        }

        const getPurchasedList = async () => {
            try {
                const response = await getPurchasedItems();
                setAlList(Object.values(response.data))
            } catch (e){
                console.log(e)
                if(e.response.status === 401){
                    sessionStorage.removeItem("access_token")
                    window.location.reload()
                }
            }
        }

        getPurchasedList()
        
    }, [isLogin])
    

    return (
        <>
            <Header></Header>
            <MyPageContainer>
                <h1>구매 내역</h1>
                {isLogin? (
                        <div>
                            <h2>{authName}님 안녕하세요!</h2>
                            <main>
                                {alList.length === 0 ? 
                                    <div>구매 내역이 없습니다.</div> 
                                    : <PurchasedList products={alList}></PurchasedList>
                                }
                            </main>
                        </div>
                    ): <h2>로그인 후 확인 가능합니다!</h2>
                }
            </MyPageContainer>
        </>
    )
}

export default MyPage