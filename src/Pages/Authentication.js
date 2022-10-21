import React, { useState } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

const Authentication = () => {

    const [showSignIn , setShowSignIn] = useState(true) 


    return (
        <main className='Auth'>
            <div className='col-center'>
                <div className='button_container row'>
                    <button onClick={() => setShowSignIn(true)}>sign in</button>
                    <button onClick={() => setShowSignIn(false)}>sign up</button>
                </div>
                {/* true -> login / false -> 회원가입 */}
                { showSignIn ? <SignIn /> : <SignUp />}
                
            </div>
        </main>
    );
};

export default Authentication;