import React, { useContext, useEffect, useRef, useState } from 'react';

import AuthContext from '../context/AuthProvider';

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
    /** 사용자 PW state */
    const [pwd, setPwd] = useState("");
    const [pwdRetype, setPwdRetype] = useState("");
    const [isPwdConfirm, setIsPwdConfirm] = useState(false);
    const [confirmError, setConfirmError] = useState("");
    /** 에러 메시지 state */
    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    // fetch


    // useEffect
    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    // 비밀번호나 확인 비밀번호가 바뀔 때 -> 비밀번호가 일치하는지 확인
    useEffect(() => {
        if(pwd.length < 1 && pwdRetype.length < 1){
            setConfirmError("")
        }else if(pwd === pwdRetype){
            setIsPwdConfirm(true)
            setConfirmError("비밀번호가 일치합니다! :)")
        }else{
            setIsPwdConfirm(false)
            setConfirmError("비밀번호가 일치하지 않습니다! :(")
        }
    }, [pwdRetype, pwd])

    // login submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // 비밀번호가 일치하지 않으면
        if(!isPwdConfirm){
            alert("비밀번호를 다시 확인해주세요!")
            return
        }
        // post 작업 필요

        console.log(user, pwd);
        setUser('');
        setPwd('');   
        setPwdRetype('') 
    }

    // form
    return (
        <section className='SignUp'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign up</h1>
            <form className='col-center' onSubmit={handleSubmit}>
                {/* 아이디 입력 */}
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
                {/* 비밀번호 입력 */}
                <input 
                    type="password" 
                    name="pw" 
                    className="input-field" 
                    placeholder="비밀번호"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)} 
                    required
                ></input>
                <input 
                    type="password" 
                    name="pw" 
                    className="input-field" 
                    placeholder="비밀번호 확인"
                    value={pwdRetype}
                    onChange={(e) => setPwdRetype(e.target.value)} 
                    required
                ></input>
                <p>{confirmError}</p>
                <button type="submit" className="submit__button">회원가입</button>
            </form>
        </section>
    );
}


export default SignUp;