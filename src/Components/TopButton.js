import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"

const TopBtn = styled.button`
  position: fixed;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 999px;
  background-color: var(--main-color);
  box-shadow: 2px 4px 7px 1px #00000012;
  bottom: 24px;
  right: 10px;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  &.hidden {
    display: none;
  }
  svg {
    color: white;
    opacity: 0.9;
  }
`

const TopButton = () => {

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <TopBtn onClick={goToTop}>
            <FontAwesomeIcon icon={faArrowUp} size="2x"/>
        </TopBtn>
    );
};

export default TopButton;