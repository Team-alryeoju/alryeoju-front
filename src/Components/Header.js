import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import AuthContext from '../context/AuthProvider.js';


const HeaderContainer = styled.header`
    /* position: sticky;
    top: 0; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    width: 100vw;
    height: var(--header-height);
    padding: 0 10px 0 10px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

    .home-link{
        font-size: 1.5rem;
        font-weight: 700;
        padding-left: 10px;
        color: #7D6767;

        & > div{
            width: 100px;
            height: 60px;
            
            & > img{
                object-position: 50% 50%;
                object-fit: contain;

                width: 100%;
                height: 100%;
            }
        }
    }

    .user-link{
        & > .test-link, & > .mypage-link{
            background: none;
            border: none;
            color: #737373;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            margin-right: 10px;
        }
    }

`
const SignButton = styled.button`
    background-color: white;
    height: 33px;
    width: 80px;
    color: var(--main-color);
    font-weight: 600;
    border-radius: 15px;
    border: solid 2px var(--main-color);
    font-size: 0.9rem;

    &:hover{
        background-color: var(--main-color);
        color: white;
    }
`

const Header = () => {
    const { setAuth, isLogin, setIsLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const logOut = () => {
        // 로그인 정보 session스토리지에서 remove
        sessionStorage.removeItem("access_token")
        // Context 정보에서도 제거
        setAuth({})
        setIsLogin(false)
        // 새로고침
        window.location.replace("/")
    }

    const toMyPage = () => {
        if(!isLogin){
            // 로그인 화면으로 전환시킴
            alert("로그인이 필요합니다.")
            navigate("/login")
            return
        }

        navigate('/mypage')
    }

    return (
        <HeaderContainer>
            <Link to="/" className="home-link"><div><img src="/logo.jpeg" alt="logo"/></div></Link>
            <nav className="user-link row-center">
                <Link className="test-link" to="/test">취향 테스트</Link>
                <button className="mypage-link" onClick={toMyPage}>구매내역</button>
                {/* <FontAwesomeIcon className="mypage-icon" icon={faCircleUser} /> */}
                { isLogin ?
                    (<SignButton onClick={logOut}>로그아웃</SignButton>) 
                    : (<Link to="/login"><SignButton>로그인</SignButton></Link>) 
                }
            </nav>
        </HeaderContainer>
    )
}

export default Header