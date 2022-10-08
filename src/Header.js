import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const textDecoNone = {
        textDecoration: 'none'
    };

    return (
        <header>
            <Link to="/" style={textDecoNone}><div className="home-link">Home</div></Link>
            <div className="row">
                <Link to="/mypage" style={textDecoNone}><div className="mypage-link">MyPage</div></Link>
                <Link to="/login" style={textDecoNone}><div className="login-link">login</div></Link>
            </div>
        </header>
    )
}

export default Header