import styled from "styled-components";

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 15px;
    background-color: ${props => props.theme.paletteColor.lightGreen};
    cursor: pointer;
`;