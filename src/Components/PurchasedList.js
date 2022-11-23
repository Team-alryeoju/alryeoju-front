import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ReviewModal from "../Components/ReviewModal.js";
import styled from "styled-components";

const PurchasedListContainer = styled.ul`
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
`

const PurchasedCard = styled.li`
    list-style: none;
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
            margin-right: 10px;
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
    width: 5.5rem;
    height: 30px;
    padding: 5px;
    border-radius: 30px;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: 600;
`

const PurchasedList = ({ products }) => {
    
    //"c_id": 16,
    // "al_id": 257,
    // "al_name": "토박이 한산 소곡주",
    // "date": "2022.02.18",
    // "review_O": 0

    const [modalOpen , setModalOpen] = useState(false)
    const [product, setProduct] = useState()

    const openModalHandler = (alcohol) => {
        setModalOpen(true);
        setProduct(alcohol);
    }
    
    const closeModalHandler = () => {
        setModalOpen(false)
    }

    return (
        <>
            <PurchasedListContainer>
                {products.map((al, idx) => <PurchasedCard key={idx}>
                    <Link to={`/detail/${al.al_id}`}>{al.al_name}</Link>
                    <div>
                        <span className='purchased--date'>구매 날짜 : {al.date}</span>
                        {al.review_O ? <ReviewButton className='purchased--review' onClick={() => openModalHandler(al)}>리뷰 남기기</ReviewButton> : <span className='purchased--review'>리뷰 기간이 지났습니다.</span>}
                    </div>
                </PurchasedCard>)}
                {/* <PurchasedCard className='invisble'></PurchasedCard> */}
                {/* {products.length % 2 === 1 ? <PurchasedCard className='invisble'></PurchasedCard>: null} */}
            </PurchasedListContainer>
            { modalOpen? <ReviewModal modalClose={closeModalHandler} alcohol={product} /> : null}
            
        </>
    );
};

export default PurchasedList;