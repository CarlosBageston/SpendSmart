import styled from "styled-components";

export const DivExpendCard = styled.div`
width: 100%;
height: 13rem;
overflow-y: auto;
overflow-x: hidden;
margin-top: 10px;

  &::-webkit-scrollbar {
    width: 14px; 
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px; 
  }

  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.paletteColor.darkGreen};
    border-radius: 10px; 
    border: 3px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #093050; 
  }
`;

export const TitleCircule = styled('div')`
width: 100%;
height: 8rem;
display: flex;
align-items: center;
justify-content: center;
`;