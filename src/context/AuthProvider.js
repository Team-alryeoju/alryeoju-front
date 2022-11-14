import { createContext, useEffect, useState } from "react";

// Context 생성 
const AuthContext = createContext({}); // 기본값은 {}

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    
    // refresh 할 때마다 실행됨.
    useEffect(() => {
        // Session Storage 에 저장된 User 정보를 가져온다.
        const user = JSON.parse(sessionStorage.getItem("user"))
        setAuth(user)
    },[])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
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