import React from 'react';

function Login(props) {
    return (
        <div className='Login'>
            <form id="login" action="/login" method="post" className="input-group">
                <div>
                    <input type="text" name="id" className="input-field" placeholder="아이디" required></input>
                    <button>중복확인</button>
                </div>
                <input type="password" name="pw" className="input-field" placeholder="비밀번호" required></input>
                <input type="password" name="pw" className="input-field" placeholder="비밀번호 확인" required></input>
                <button className="submit">Login</button>
            </form>
            
        </div>
    );
}

export default Login;