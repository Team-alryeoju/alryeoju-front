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


export default AuthContext;