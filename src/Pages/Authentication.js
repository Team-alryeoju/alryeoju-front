import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import axios from '../api/axios'

const Authentication = () => {
    const textDecoNone = {
        textDecoration: 'none'
    };


    return (
        <main className='Auth'>
            <div className='col-center'>
                <div className='row'>
                    <Link to="signin" style={textDecoNone}><div className="mypage-link">Sign In</div></Link>
                    <Link to="signup" style={textDecoNone}><div className="login-link">Sign Up</div></Link>
                </div>
                {/* true -> login / false -> 회원가입 */}
                <Routes>
                    <Route path='signin' element={<SignIn />}></Route>
                    <Route path='signup' element={<SignUp />}></Route>
                    <Route path='*' element={<SignIn />}></Route>
                </Routes>
                
            </div>
        </main>
    );
};

export default Authentication;