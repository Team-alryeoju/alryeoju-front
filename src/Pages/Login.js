import React, { useContext, useEffect, useRef, useState } from 'react';

import AuthContext from '../context/AuthProvider';

function Login(props) {
    /** context value 
     * 이를 통해 컴포넌트 모두에서 페이지를 이용하는 동안 acces token 받을 수 있다.
    */
    const { setAuth } = useContext(AuthContext);
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

    // fetch


    // useEffect
    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    // login submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // post 작업 필요

        console.log(user, pwd);
        setUser('');
        setPwd('');    
    }



    // form
    return (
        <section className='Login'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
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
                    required></input>
                <button type="submit" className="submit__button">로그인</button>
            </form>
            
        </section>
    );
}


export default Login;