import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider.js';

import { signIn, getUserInfo } from "../api/api.js"

import "./SignIn.css"
import { InputContainer } from '../Components/InputContainer.js';
import { SubmitButton } from '../Components/SubmitButton.js';
// 1. 로그인 시 서버 쪽에서 session_id (쿠키) 를 설정
// 2. 클라이언트 요청 시에 session_id를 서버 족에서 받는다.
// 3. 서버 쪽에서 session_id를 검증

function SignIn() {
    /** context value 
     * 이를 통해 컴포넌트 모두에서 페이지를 이용하는 동안 acces token 받을 수 있다.
    */
   // AuthContext이 제공하는 auth state를 변경하는 함수를 받는다.
    const { setAuth, isLogin, setIsLogin } = useContext(AuthContext);

    // navigate
    const navigate = useNavigate();
    // Ref
    const userRef = useRef();
    const errRef = useRef();
    /** 사용자 ID state */
    const [user, setUser] = useState("")
    /** 사용자 PW state */
    const [pwd, setPwd] = useState("")
    /** 에러 메시지 state */
    const [errMsg, setErrMsg] = useState("")
    // const [success, setSuccess] = useState(false)

    useEffect(()=> {
        userRef.current.focus();
    }, [])

    // useEffect
    useEffect(() => {
        // 로그인 정보가 존재한다면
        if(isLogin){
            navigate(-1)
        }
    }, [navigate, isLogin])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    // login submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            // 서버에 POST 요청으로 토큰을 발급받는다.
            const response = await signIn(user, pwd);
            
            // 응답의 데이터 중 access_token 으로 발급받음
            const accessToken = response.data.access_token;

            // 받은 토큰을 도메인의 Session Storage나 Local Storage 로 저장한다.
            sessionStorage.setItem("access_token", JSON.stringify(accessToken))

            const userInfo = await getUserInfo(accessToken);
            
            setAuth({
                userName: userInfo.data.user_name
            })
            setIsLogin(true)
            setUser('');
            setPwd('');  

            alert('로그인이 성공하였습니다')
            // 이전 화면으로 redirect
            // 하고 싶은데 안감..
            navigate('/')
            
        }catch(error){
            // 에러 처리
            // 응답이 존재하지 않는다면
            if(!error?.response){
                setErrMsg("No Server Response")
            }else if(error.response?.status === 400){
                // 서버에서 필요한 정보가 요청에 없을 때
                setErrMsg("Missing Username or Password")
            }else if(error.response.status === 401){
                setErrMsg("아이디나 비밀번호가 맞지 않습니다.")
            }else{
                setErrMsg("Login Failed")
            }

            // err에 focus
            errRef.current.focus()
        }
    }

    // form
    return (
        <div className='SignIn'>
            <header>
                {/* <Link className='home__link' to="/">Home</Link> */}
                <Link className='home__link' to="/"><div className="home-image__container"><img src="/logo.jpeg" alt='logo'/></div></Link>
            </header>
            <div className='sign-in__container'>
                <h1>Sign in</h1>
                <form className="col-center" onSubmit={handleSubmit}>
                    {/* 아이디 입력 */}
                    <InputContainer>
                        <input 
                            type="text" 
                            ref={userRef}
                            className="input-field" 
                            autoComplete="off"
                            placeholder="아이디"
                            title="아이디"
                            value={user}
                            onChange={(e) => setUser(e.target.value)} 
                            required
                        ></input>
                    </InputContainer>
                    {/* 비밀번호 입력 */}
                    <InputContainer>
                        <input 
                            type="password" 
                            name="pw" 
                            className="input-field" 
                            placeholder="비밀번호"
                            title="비밀번호"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)} 
                            required
                        ></input>
                        <p ref={errRef} className={errMsg ? "invalid" : "hide"}>{errMsg}</p>
                    </InputContainer>
                    <SubmitButton type="submit" className="submit__button">로그인</SubmitButton>
                    <Link className="sign-up__link" to="/signup">회원가입</Link>
                </form>
            </div>
        </div>
    );
}


export default SignIn;