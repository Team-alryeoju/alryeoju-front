import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TestResult = ({answers}) => {
    // answers가 정답임 -> 서버로 post 하는 작업 필요
    // loading 화면 일부로 추가하면 좋을듯 (연산하는 느낌이 들게)
    // survey 하지 않고 다른 경로로 접속해서 들어오지 못하게 하는 경우 추가 필요
        // -> 이 경우 answers가 빈 배열일 것이다.

    const navigate = useNavigate()

    useEffect(() => {
        if(answers.length === 0) {
            navigate('/test')
        }


    },[])

    return (
        <div>
            <h2>결과 페이지~</h2>
            {answers.map((el,idx) => <div key={idx}>{`${idx+1}의 답은 ${el}`}</div>)}
        </div>
    );
};

export default TestResult;