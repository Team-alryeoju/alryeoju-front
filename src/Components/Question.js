import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: red;
    margin-top: 20px;

`
const OptionContainer = styled.div`
    width: 60%;
    height: 70%;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const Option = styled.button`
    flex: 0 1 200px;
    margin: 10px;
    &.selected{
        background-color: var(--emphasize-color);
    }
`

const Question = ({question, curAnswer, selectAnswer}) => {
    
    return (
        <QuestionContainer>
            <h2>{question.title}</h2>
            <span>{`최대 선택 개수 : ${question.max}`}</span>
            <OptionContainer>
                {question.options.map((el, idx) => (
                    <Option key={idx} className={curAnswer.includes(idx)? "selected" : ""} onClick={()=>{selectAnswer(idx)}}>{el}</Option>
                ))
                }
            </OptionContainer>
        </QuestionContainer>
    );
};

export default Question;