import { Box, LinearProgress, Typography } from "@mui/material";
import styled from "styled-components";


export const TitleTypography = styled(Typography)`
    && {
        font-weight: 600;
        color: ${({ theme }) => theme.paletteColor.darkGreen};
    }
`;

export const InfoTypography = styled(Typography)`
    && {
        color: ${({ theme }) => theme.paletteColor.darkGreen};
        font-weight: 700;
    }
`;

export const DivBox = styled.div`
    background-color: ${({ theme }) => theme.paletteColor.neutral};
    height: 6rem;
    width: 90%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 8px;
`;

export const ValueTypography = styled(Typography) <{ error?: boolean }>`
    && {
        font-size: 1.2rem;
        font-weight: 700;
        color: ${props => props.error ? props.theme.paletteColor.error : props.theme.paletteColor.darkGreen};
    }
`;

export const IconImage = styled.img`
    height: 24px;
    margin-bottom: 8px;
`;
export const DivLoading = styled.div`
    padding-bottom: 2px;
`;

export const ProgressContainer = styled(Box)`
    width: 95%;
    position: relative;
`;

export const CustomLinearProgress = styled(LinearProgress)`
    && {
        height: 20px;
        border-radius: 50px;
        background-color: #052224;
        transform: rotate(180deg);
        .MuiLinearProgress-bar {
            border-radius: 50px;
            background-color: ${({ theme }) => theme.paletteColor.neutral};
        }
    }
`;

export const PercentageTypography = styled(Typography) <{ color: string }>`
    && {
        position: absolute;
        top: 50%;
        left: 8%;
        transform: translate(-50%, -50%);
        font-weight: 700;
        font-size: 0.9rem;
        color: ${(props) => props.color};
        white-space: nowrap;
    }
`;

export const SaldoTypography = styled(Typography) <{ color: string }>`
    && {
        position: absolute;
        top: 50%;
        left: 86%;
        transform: translate(-50%, -50%);
        font-weight: 700;
        font-size: 0.9rem;
        color: ${(props) => props.color === 'red' ? props.theme.paletteColor.error : props.color};
        white-space: nowrap;
    }
`;