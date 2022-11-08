import React from 'react';

const TestResult = ({answers}) => {
    // answers가 정답임 -> 서버로 post 하는 작업 필요
    // loading 장면 일부로 추가하면 좋을듯 (연산하는 느낌이 들게)
    // survey 하지 않고 직접적으로 검색해서 들어오지 못하게 하는 경우 추가 필요
    return (
        <div>
            <h2>결과 페이지~</h2>
            {answers.map((el) => <div>{el}</div>)}
        </div>
    );
};

export default TestResult;