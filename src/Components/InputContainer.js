import styled from 'styled-components';

export const InputContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    width: 250px;

    > input {
        border: solid 1px #f3f3f4;
        background-color: #f3f3f4;
        border-radius: 3px;
        width: 100%;
        height: 2.5rem;
        padding: 0.5rem;

        &:focus{
            border: none;
            outline: solid 2px var(--main-color);
            background-color: white;
        }
    }

    > p {
        font-size: 0.8rem;
        padding: 0.2rem;
        width: 100%;

        &.valid{
            color: green;
        }

        &.invalid{
            color: red;
        }

        &.hide{
            display: none;
        }
    }
`