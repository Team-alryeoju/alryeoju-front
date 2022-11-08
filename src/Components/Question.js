import React, { useState } from 'react';
import styled from 'styled-components';

const Option = styled.button`

    &.selected{
        background-color: red;
    }
`

const Question = ({question, answer, selectAnswer}) => {

    return (
        <div className="Question">
            <h2>{question.title}</h2>
            <span>{`최대 선택 개수 : ${question.max}`}</span>
            <ul>
                {question.options.map((el, idx) => (
                    <li>
                       <Option className={answer.includes(idx)? "selected" : ""} onClick={()=>{selectAnswer(idx)}}>{el}</Option>
                    </li>
                ))
                }
            </ul>
        </div>
    );
};

export default Question;