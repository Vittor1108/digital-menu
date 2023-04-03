import styled from "styled-components";


interface IProps {
    backgroundColor: string;
}

export const Header = styled.header`
    font-size: 16px;
    font-weight: bold;
    color: black;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 1.5rem;
`;


export const Main = styled.main`
    padding: 0rem 1.5rem 1.5rem 1.5rem;
`

export const Button = styled.button<IProps>`
    background-color: ${props => props.backgroundColor};
    color: white;
    padding: 5px 15px;
    font-size: 14px;
    border-radius: 3px;
    transition: opacity .3s;
    &:nth-child(1){
        margin-right: 10px;
    }

    &:hover {
        opacity: 0.5;
    }
`

export const Image = styled.img`
    width: 30px;
    border-radius: 50%;
    border: 2px solid #eee;
    padding: 2px;
    margin-right: 10px;
`;