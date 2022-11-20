import React from 'react';


import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

const QuestionContainer = styled.div`
    width: 80%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
    & > h2{
        font-size: 1.2rem;
        color: var(--basic-font-color);
    }
`
const OptionContainer = styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const Option = styled.button`
    flex: 0 1 250px;
    padding: 10px;
    border-radius: 20px;
    background-color: white;
    border: 3px solid #f3f3f4;
    margin: 10px;
    font-size: 1.2rem;
    font-weight: 700;
    color: #737373;
    
    
    &:hover{
        border: 3px solid var(--main-color);
        color: var(--main-color);
        & > .keyword{
            color: var(--emphasize-color);
            font-size: 1.3rem;
            font-weight: 800;
        }
    }
    &.selected{
        background-color: var(--main-color);
        border: 3px solid var(--main-color);
        color: white;
        transition: 0.2s;
        & > .keyword{
            color: var(--emphasize-color);
            font-size: 1.3rem;
            font-weight: 800;
        }
    }
`

const SurveyButtonContainer = styled.div`
    width: 80%;
    align-items: center;
    justify-content: space-between;
`
const SurveyButton = styled.button`
    width: 50px;
    background-color: white;
    border: none;
    font-size: 1.2rem;
    
    &:disabled{
        opacity: 0.5;
        cursor: default;
    }

    &.surveyPrevBtn{
        margin-left: 10px;
    }

    &.surveyNextBtn{
        margin-right: 10px;
    }
`

const Question = ({questions, questionIdx, curAnswer, selectAnswer, handleNextBtn, handlePrevBtn}) => {
    
    return (
        <QuestionContainer>
            <h2>{questions[questionIdx].title}</h2>
            {/* <span>{`최대 선택 개수 : ${questions[questionIdx].max}`}</span> */}
            <OptionContainer>
                {questions[questionIdx].options.map((el, idx) => (
                    <Option key={idx} className={curAnswer.includes(idx)? "selected" : ""} 
                        onClick={()=>{selectAnswer(idx)}}>
                            {el.option.map((op,idx)=>{
                                if(idx === el.keyword) return (<div key={idx} className='keyword'>{op}</div>)
                                return (<div key={idx}>{op}</div>)
                            })}
                    </Option>
                ))
                }
            </OptionContainer>
            <SurveyButtonContainer className='row'>
                <SurveyButton disabled={questionIdx === 0} className='surveyPrevBtn' onClick={handlePrevBtn}><FontAwesomeIcon icon={faAngleLeft} />이전</SurveyButton>
                <SurveyButton disabled={questionIdx === questions.length-1} className='surveyNextBtn' onClick={handleNextBtn}>다음<FontAwesomeIcon icon={faAngleRight} /></SurveyButton>
            </SurveyButtonContainer>
        </QuestionContainer>
    );
};

export default Question;