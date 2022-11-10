import styled from 'styled-components';

export const SubmitButton = styled.button`
    width: 180px;
    height: 3rem;
    border-radius: 2.5rem;
    background-color: white;
    font-weight: 800;
    border: solid 2px var(--main-color);
    color: var(--main-color);
    font-size: large;

    &:hover{
        background-color: var(--main-color);
        color: white
    }
`