import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import AuthContext from '../context/AuthProvider';


const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;
    width: 100vw;
    height: 56px;
    padding: 0 10px 0 10px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
`

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext)
    const textDecoNone = {
        textDecoration: 'none'
    };

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
            <Link to="/" style={textDecoNone}><div className="home-link">Home</div></Link>
            <div className="row">
                <Link to="/mypage" style={textDecoNone}><div className="mypage-link">MyPage</div></Link>
                { auth ?
                    (<button onClick={logOut}>logout</button>) 
                    : (<Link to="/login" style={textDecoNone}><div className="login-link">login</div></Link>) 
                }
            </div>
        </HeaderContainer>
    )
}

export default Header