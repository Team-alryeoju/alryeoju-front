import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../Components/Header.js';
import TestResult from './TestResult.js';
import TestSurvey from './TestSurvey.js'

import "./Test.css"

const Test = () => {
    /** 답변이 저장된 배열 */
    const [answers, setAnswers] = useState([])
    
    return (
        <div className="Test">
            <Header />
            <div className="container col">
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