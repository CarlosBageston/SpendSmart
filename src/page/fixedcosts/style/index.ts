import styled from "styled-components";

export const DivExpendCard = styled.div`
width: 100%;
height: 7rem;
overflow-y: auto;
overflow-x: hidden;

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