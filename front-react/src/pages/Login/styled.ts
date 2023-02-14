import styled from 'styled-components';

interface Props{
    isRed: boolean;
}

export const Title = styled.h1<Props>`
    background-color: red;
    color: ${props => props.isRed ? 'red' : 'blue'};
`;   