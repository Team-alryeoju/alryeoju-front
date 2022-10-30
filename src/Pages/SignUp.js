import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'

import AuthContext from '../context/AuthProvider';

/** css */
import './SignUp.css'

// 1. 로그인 시 서버 쪽에서 session_id (쿠키) 를 설정
// 2. 클라이언트 요청 시에 session_id를 서버 족에서 받는다.
// 3. 서버 쪽에서 session_id를 검증

function SignUp(props) {
    /** context value 
     * 이를 통해 컴포넌트 모두에서 페이지를 이용하는 동안 acces token 받을 수 있다.
    */
    const { setAuth } = useContext(AuthContext);
    // Ref
    const userRef = useRef();
    const errRef = useRef();

    /** 사용자 ID state */
    const [user, setUser] = useState("");

    /** 사용자 닉네임 state */
    const [name, setName] = useState("");
    /** 사용자 PW state */
    const [pwd, setPwd] = useState("");

    /** 비밀번호 확인 state**/
    const [matchPwd, setMatchPwd] = useState("");
    const [matchFocus, setMatchFocus] = useState(false)
    const [isPwdConfirm, setIsPwdConfirm] = useState(false);
    const [confirmError, setConfirmError] = useState("");

    /** 에러 메시지 state */
    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();
    // fetch


    // 처음에 ID 부분으로 focusing 됨
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // 아이디랑 비밀번호 유효성검사 할 때 활용하려면 정규식 검사 추가 필요
    
    // 에러 메시지 관리
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    useEffect(() => {
        if(success){
            // 회원가입 성공 시
            alert('회원가입이 성공하였습니다')
            navigate("/auth/signin")
        }
    }, [navigate, success])


    // 비밀번호나 확인 비밀번호가 바뀔 때 -> 두 비밀번호가 일치하는지 확인
    useEffect(() => {
        if(pwd.length < 1 && matchPwd.length < 1){
            setConfirmError("")
        }else if(pwd === matchPwd){
            setIsPwdConfirm(true)
            setConfirmError("비밀번호가 일치합니다! :)")
        }else{
            setIsPwdConfirm(false)
            setConfirmError("비밀번호가 일치하지 않습니다! :(")
        }
    }, [pwd, matchPwd])

    // login submit
    const handleSubmit = async (e) => {
        // 해당 이벤트에 대한 기본 동작을 실행하지 않도록 지정한다.
        e.preventDefault();

        // post 작업 필요
        try{
            const response = await axios.post("/signup",
                JSON.stringify({id : user, pw : pwd, u_name: name}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                });
        } catch(err) {
            // 에러 처리
        }
        

        // 처리 성공
        setSuccess(true);
    }

    // ID 중복 확인
    const checkIdDuplicate = async () => {
    
    }

    // form
    return (
        <section className='SignUp'>
            <h1>Sign up</h1>
            <form className='col-center' onSubmit={handleSubmit}>
                {/* 아이디 입력 */}
                <input 
                    type="text" 
                    id="id"
                    ref={userRef}
                    className="input-field" 
                    autoComplete="off"
                    placeholder="아이디"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    onBlur={checkIdDuplicate} 
                    required
                ></input>
                {/* 닉네임 입력 */}
                <input 
                    type="text" 
                    id="username"
                    className="input-field" 
                    autoComplete="off"
                    placeholder="닉네임"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={checkIdDuplicate} 
                    required
                ></input>
                {/* 비밀번호 입력 */}
                <input 
                    type="password" 
                    id="pwd" 
                    className="input-field" 
                    placeholder="비밀번호"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)} 
                    required
                ></input>
                <input 
                    type="password" 
                    name="confirm_pwd" 
                    className="input-field" 
                    placeholder="비밀번호 확인"
                    value={matchPwd}
                    aria-invalid={isPwdConfirm ? "false" : "true"}
                    aria-describedby="confirm-note"
                    onChange={(e) => setMatchPwd(e.target.value)} 
                    onFocus={() => setMatchFocus(true)}
                    required
                ></input>
                <p 
                    id="confirm-note" 
                    className={`${isPwdConfirm ? "valid" : "invalid"} ${matchFocus ? "show" : "hide"}`}
                    >{confirmError}</p>
                <button type="submit" className="submit__button" disabled={!isPwdConfirm ? true : false}>회원가입</button>
            </form>
        </section>
    );
}

export default SignUp;