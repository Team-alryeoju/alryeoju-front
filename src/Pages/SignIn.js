import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider';

// 1. 로그인 시 서버 쪽에서 session_id (쿠키) 를 설정
// 2. 클라이언트 요청 시에 session_id를 서버 족에서 받는다.
// 3. 서버 쪽에서 session_id를 검증

function SignIn(props) {
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        // post 작업 필요
        try{
            const response = await axios.post("/signin",
            JSON.stringify({id : user, pw : pwd}),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            });
            
            console.log(response.data)
            alert("로그인 성공")
            
        }catch(error){
            if(error.response.status === 401){
                alert("아이디나 비밀번호가 맞지 않습니다.")
            }
        }

        setUser('');
        setPwd('');    
    }



    // form
    return (
        <section className='SignIn'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign in</h1>
            <form className="col-center" onSubmit={handleSubmit}>
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
                <button type="submit" className="submit__button">로그인</button>
            </form>
        </section>
    );
}


export default SignIn;