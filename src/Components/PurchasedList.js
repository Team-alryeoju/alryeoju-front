import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const PurchasedListContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
`

const PurchasedCard = styled.li`
    list-style: none;
    flex: 0 1 350px;
    height: 100px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;


    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    &.invisble{
        opacity: 0;
    }
    
    > div{
        display: flex;
        justify-content: end;
        align-items: center;

        > .purchased--date{
            font-size: 0.9rem;
            margin-right: 5px;
            color: var(--grey-font-color);
        }
        > .purchased--review{
            font-size: 0.9rem;
        }
    }

    > a{
        color: var(--basic-font-color);
        font-size: 1.2rem;
        font-weight: 500;
        
        &:hover{
            color: var(--main-color);
        }

    }
`

const ReviewButton = styled.button`
    background-color: var(--emphasize-color);
    width: 5rem;
    height: 25px;
    border-radius: 25px;
    border: none;
    color: white;
    font-weight: 500;
`

const PurchasedList = ({ products }) => {

    const handleReview = () => {

    }
    
    //"c_id": 16,
    // "al_id": 257,
    // "al_name": "토박이 한산 소곡주",
    // "date": "2022.02.18",
    // "review_O": 0
    return (
        <PurchasedListContainer>
            {products.map((al) => <PurchasedCard>
                <Link to={`/detail/${al.al_id}`}>{al.al_name}</Link>
                <div>
                    <span className='purchased--date'>구매 날짜 : {al.date}</span>
                    {al.review_O ? <ReviewButton className='purchased--review' onClick={handleReview}>리뷰 남기기</ReviewButton> : <span className='purchased--review'>리뷰 작성 완료</span>}
                </div>
            </PurchasedCard>)}
            {/* <PurchasedCard className='invisble'></PurchasedCard> */}
            {/* {products.length % 2 === 1 ? <PurchasedCard className='invisble'></PurchasedCard>: null} */}
        </PurchasedListContainer>
    );
};

export default PurchasedList;