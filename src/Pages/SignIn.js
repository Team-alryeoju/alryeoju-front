import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider';

import "./SignIn.css"
import { InputContainer } from '../Components/InputContainer';
import { SubmitButton } from '../Components/SubmitButton';
// 1. 로그인 시 서버 쪽에서 session_id (쿠키) 를 설정
// 2. 클라이언트 요청 시에 session_id를 서버 족에서 받는다.
// 3. 서버 쪽에서 session_id를 검증

function SignIn(props) {
    /** context value 
     * 이를 통해 컴포넌트 모두에서 페이지를 이용하는 동안 acces token 받을 수 있다.
    */
   // AuthContext이 제공하는 auth state를 변경하는 함수를 받는다.
    const { auth, setAuth } = useContext(AuthContext);

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
    const [success, setSuccess] = useState(false)

    // useEffect
    useEffect(() => {
        // 로그인 정보가 존재한다면
        if(auth?.accesToken && auth?.accesToken !== "" && auth?.accesToken !== undefined){
            navigate("/")
        }
        userRef.current.focus();
    }, [auth, navigate])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
        if(success){
            // 회원가입 성공 시
            alert('로그인이 성공하였습니다')

            // 메인 화면으로 redirect
            navigate("/")
        }
    }, [navigate, success])

    // login submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            // 서버에 POST 요청으로 토큰을 발급받는다.
            const response = await axios.post("/signin",
                JSON.stringify({id : user, pw : pwd}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            
            // 응답의 데이터 중 access_token 으로 발급받음
            const accesToken = response.data.access_token;

            // Auth Context
            setAuth({ user, accesToken})

            // 받은 토큰을 도메인의 Session Storage나 Local Storage 로 저장한다.
            sessionStorage.setItem("user", JSON.stringify({ user, accesToken }))
            setSuccess(true)
            setUser('');
            setPwd('');  
            
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
                <Link className='home__link' to="/">Home</Link>
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
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)} 
                            required
                        ></input>
                    </InputContainer>
                    <p ref={errRef} className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
                    <SubmitButton type="submit" className="submit__button">로그인</SubmitButton>
                    <Link className="sign-up__link" to="/signup">회원가입</Link>
                </form>
            </div>
        </div>
    );
}


export default SignIn;