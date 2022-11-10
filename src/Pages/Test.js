import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import Header from '../Components/Header';
import TestResult from './TestResult';
import TestSurvey from './TestSurvey'

import "./Test.css"

const Test = () => {
    /** 답변이 저장된 배열 */
    const [answers, setAnswers] = useState([])

    return (
        <div className="Test">
            <Header />
            <div className="container col">
                <h1>나의 취향에 맞는 전통주 찾기</h1>
                <Routes>
                    {/* /test 에서 이어지는 주소 */}
                    <Route path='result' element={<TestResult answers={answers}/>}></Route>
                    <Route path='/' element={<TestSurvey answers={answers} setAnswers={setAnswers}/>}></Route>
                </Routes>
            </div>
        </div>
    );
};

export default Test;