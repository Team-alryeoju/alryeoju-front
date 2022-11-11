import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import AuthContext from '../context/AuthProvider';


const HeaderContainer = styled.header`
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    width: 100vw;
    height: var(--header-height);
    padding: 0 10px 0 10px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);


    a, button{
        color: #737373;
        cursor: pointer;

    }

    & > a > div{
        width: 100px;
        height: 60px;
        
        & > img{
            object-position: 50% 50%;
            object-fit: contain;

            width: 100%;
            height: 100%;
        }
    }

    .home-link{
        font-size: 1.5rem;
        font-weight: 700;
        padding-left: 10px;
        color: #7D6767;
    }

    .user-link{
        font-size: 1rem;
        font-weight: 500;
        & > button, & > a{
            margin-right: 10px;
        }
    }

`

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext)

    const logOut = () => {
        // 로그인 정보 session스토리지에서 remove
        sessionStorage.removeItem("user")
        // Context 정보에서도 제거
        setAuth({})
        // 새로고침
        window.location.replace("/")
    }

    return (
        <HeaderContainer>
            <Link to="/" className="home-link"><div><img src="/logo.jpeg" /></div></Link>
            <div className="user-link row">
                <Link to="/test">취향 테스트</Link>
                <Link to="/mypage">구매내역</Link>
                {/* <FontAwesomeIcon className="mypage-icon" icon={faCircleUser} /> */}
                { auth ?
                    (<button onClick={logOut}>로그아웃</button>) 
                    : (<Link to="/login">로그인</Link>) 
                }
            </div>
        </HeaderContainer>
    )
}

export default Header