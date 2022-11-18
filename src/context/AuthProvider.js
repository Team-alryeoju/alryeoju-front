import { createContext, useEffect, useState } from "react";

/** api */
import { getUserInfo } from "../api/api.js"
// Context 생성 
const AuthContext = createContext({}); // 기본값은 {}

export const AuthProvider = ({children}) => {
    const [authName, setAuthName] = useState('')
    const [isLogin, setIsLogin] = useState(false);
    
    // refresh 할 때마다 실행됨.
    useEffect(() => {
        // Session Storage 에 저장된 User 정보를 가져온다.
        const accessToken = JSON.parse(sessionStorage.getItem("access_token"))

        if(accessToken) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
            return
        }

        // 새로 고침할 때마다 auth 업데이트 해준다.
        getUserInfo(accessToken)
            .then((res) => {
                setAuthName(res.data["user_name"])
            }).catch((err) =>{
                console.log(err)
            })

    },[])

    return (
        <AuthContext.Provider value={{ authName, setAuthName, isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

/** 예시 */
// async function login() {
//     const response = await fetch('/login_without_cookies', {method: 'post'});
//     const result = await response.json();
//     localStorage.setItem('jwt', result.access_token);
//   }
  
//   function logout() {
//     localStorage.removeItem('jwt');
//   }
  
//   async function makeRequestWithJWT() {
//     const options = {
//       method: 'post',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//       }
//     };
//     const response = await fetch('/protected', options);
//     const result = await response.json();
//     return result;
// }

export default AuthContext;