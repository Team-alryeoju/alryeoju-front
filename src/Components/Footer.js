import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;
    width: 100vw;
    height: 56px;
    padding: 0 10px 0 10px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
`
const Footer = () => {

    return (
        <FooterContainer>
            <p>footer가 들어갈 자리</p>
        </FooterContainer>
    )
}

export default Footer