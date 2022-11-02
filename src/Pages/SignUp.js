import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios'

import AuthContext from '../context/AuthProvider';
import { InputContainer } from '../Components/InputContainer';
import { SubmitButton } from '../Components/SubmitButton';
/** css */
import './SignUp.css'

// 1. 로그인 시 서버 쪽에서 session_id (쿠키) 를 설정
// 2. 클라이언트 요청 시에 session_id를 서버 족에서 받는다.
// 3. 서버 쪽에서 session_id를 검증

function SignUp(props) {
    /** context value 
     * 이를 통해 컴포넌트 모두에서 페이지를 이용하는 동안 acces token 받을 수 있다.
    */
    const { auth } = useContext(AuthContext);
    // Ref
    const errRef = useRef();

    /** 사용자 ID state */
    const userRef = useRef();
    const [user, setUser] = useState("");
    const [userMsg, setUserMsg] = useState("");
    const [isUserConfirm, setIsUserConfirm] = useState(false)
    /** 사용자 닉네임 state */
    const [name, setName] = useState("");
    const [nameMsg, setNameMsg] = useState("")
    const [isNameConfirm, setIsNameConfirm] = useState(false)

    /** 사용자 PW state */
    const [pwd, setPwd] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    /** 비밀번호 확인 state**/
    // 확인용 비밀번호
    const [matchPwd, setMatchPwd] = useState("");
    const [matchFocus, setMatchFocus] = useState(false)
    const [isPwdConfirm, setIsPwdConfirm] = useState(false);
    const [pwdConfirmError, setPwdConfirmError] = useState("");

    /** 에러 메시지 state */
    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();
    
    // 로그인 상태라면 메인화면으로!
    useEffect(() => {
        // 로그인 정보가 존재한다면
        if(auth?.accesToken && auth?.accesToken !== "" && auth?.accesToken !== undefined){
            navigate("/")
        }
    }, [auth, navigate])

    // 처음에 ID 부분으로 focusing 됨
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        if(success){
            // 회원가입 성공 시
            alert('회원가입이 성공하였습니다')
            navigate("/login")
        }
    }, [navigate, success])

    // 비밀번호나 확인 비밀번호가 바뀔 때 -> 두 비밀번호가 일치하는지 확인
    useEffect(() => {
        if(pwd.length < 1 || matchPwd.length < 1){
            setPwdConfirmError("");
        }else if(pwd === matchPwd){
            setPwdMsg("");
            setIsPwdConfirm(true);
            setPwdConfirmError("비밀번호가 일치합니다!");
        }else{
            setPwdMsg("");
            setIsPwdConfirm(false);
            setPwdConfirmError("비밀번호가 일치하지 않습니다:(");
        }
    }, [pwd, matchPwd])

    /** ID 중복 확인 */
    useEffect(() => {
        /** ID 중복 확인 */
        const checkIdDuplicate = async () => {
        // ID 칸 비어있으면 아무 동작X
            if(user === ""){
                setIsUserConfirm(false)
                setUserMsg("")
                return
            }
            try{
                const response = await axios.post("/duplicate_id_check",
                    JSON.stringify({id : user}),
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                setIsUserConfirm(true)
                setUserMsg(response.data.msg)
                
            } catch(err) {
                // 에러 처리
                if(!err?.response){
                    setUserMsg("No Server Response")
                }else if(err.response?.status === 400){
                    // 서버에서 필요한 정보가 요청에 없을 때
                    setUserMsg("Missing id")
                }else if(err.response.status === 409){
                    setUserMsg(err.response.data.msg)
                }else{
                    setUserMsg("Failed")
                }

                setIsUserConfirm(false)
            }
        }

        checkIdDuplicate();
    },[user])
    
     /** 닉네임 중복 확인 */
     useEffect(() => {
        /** 닉네임 중복 확인 */
        const checkNameDuplicate = async () => {
        // 닉네임 칸 비어있으면 아무 동작X
            if(name === ""){
                setIsNameConfirm(false)
                setNameMsg("")
                return
            }
            try{
                const response = await axios.post("/duplicate_name_check",
                    JSON.stringify({u_name : name}),
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                setIsNameConfirm(true)
                setNameMsg(response.data.msg)
                
            } catch(err) {
                // 에러 처리
                if(!err?.response){
                    setNameMsg("No Server Response")
                }else if(err.response?.status === 400){
                    // 서버에서 필요한 정보가 요청에 없을 때
                    setNameMsg("Missing id")
                }else if(err.response.status === 409){
                    setNameMsg(err.response.data.msg)
                }else{
                    setNameMsg("Failed")
                }

                setIsNameConfirm(false)
            }
        }

        checkNameDuplicate();
    },[name])

    // login submit
    const handleSubmit = async (e) => {
        // 해당 이벤트에 대한 기본 동작을 실행하지 않도록 지정한다.
        e.preventDefault();

        // 입력값 단 하나라도 비어있으면 submit X
        if(user === "" || user === "" || pwd === "" || matchPwd === "" ){
            if(user === "") setUserMsg("아이디를 입력해주세요")
            if(name === "") setNameMsg("닉네임을 입력해주세요")
            if(pwd === "") setPwdMsg("비밀번호를 입력해주세요")
            if(matchPwd === "") setPwdConfirmError("비밀번호 확인을 위해 비밀번호를 다시 입력해주세요")

            return
        }

        // 아이디 중복 확인X
        if(!isUserConfirm){
            alert(userMsg)
            return
        }
        // 비밀번호 확인X
        if(!isPwdConfirm){
            alert(pwdConfirmError)
            return
        }

        // post 작업 필요
        try{
            const response = await axios.post("/signup",
                JSON.stringify({id : user, pw : pwd, u_name: name}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }  
            );

            // 처리 성공
            setSuccess(true);

        } catch(err) {
            // 에러 처리
            setSuccess(false)
        }
    }

    // form
    return (
        <div className='SignUp'>
            <header>
                <Link className='home__link' to="/">Home</Link>
            </header>
            <div className='sign-up__container'>
                <h1>Sign up</h1>
                <form className='col-center' onSubmit={handleSubmit}>
                    {/* 아이디 */}
                    <InputContainer>
                        <input 
                            type="text" 
                            id="id"
                            ref={userRef}
                            className="input-field" 
                            autoComplete="off"
                            placeholder="아이디"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        ></input>
                        <p className={`${isUserConfirm ? "valid" : "invalid"} ${userMsg !== "" ? "show" : "hide"}`}
                        >{userMsg}</p>
                    </InputContainer>
                    {/* 닉네임 */}
                    <InputContainer>
                        <input 
                            type="text" 
                            id="username"
                            className="input-field" 
                            autoComplete="off"
                            placeholder="닉네임"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        <p className={`${isNameConfirm ? "valid" : "invalid"} ${nameMsg !== "" ? "show" : "hide"}`}
                        >{nameMsg}</p>
                    </InputContainer>
                        {/* 비밀번호 입력 */}
                    <InputContainer>
                        <input 
                            type="password" 
                            id="pwd" 
                            className="input-field" 
                            placeholder="비밀번호"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)} 
                        ></input>
                        <p className={`invalid ${pwdMsg !== "" ? "show" : "hide"}`}
                        >{pwdMsg}</p>
                    </InputContainer>
                    <InputContainer>
                        <input 
                            type="password" 
                            name="confirm_pwd" 
                            className="input-field" 
                            placeholder="비밀번호 확인"
                            value={matchPwd}
                            onChange={(e) => setMatchPwd(e.target.value)} 
                            onFocus={() => setMatchFocus(true)}
                        ></input>
                        <p
                            className={`${isPwdConfirm ? "valid" : "invalid"}`}
                        >{pwdConfirmError}</p>
                    </InputContainer>
                    <SubmitButton type="submit" className="submit__button">회원가입</SubmitButton>
                    <Link className="sign-in__link" to="/login">로그인</Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;