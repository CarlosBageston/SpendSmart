import React from 'react';
import styled from 'styled-components';
import { Typography, LinearProgress, Box, CircularProgress } from '@mui/material';
import { IoIosNotificationsOutline } from 'react-icons/io';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';
import useFormatCurrency from '@/hooks/formatCurrency';
import { IconContainer } from '../style';
import ExpenseIcon from '@/assets/icons/Expenses.png';
import IncomeIcon from '@/assets/icons/Income.png';

// Helper function to interpolate between two colors based on a percentage
const interpolateColor = (startColor: string, endColor: string, percent: number) => {
    const start = parseInt(startColor.slice(1), 16);
    const end = parseInt(endColor.slice(1), 16);

    const r1 = (start >> 16) & 0xff;
    const g1 = (start >> 8) & 0xff;
    const b1 = start & 0xff;

    const r2 = (end >> 16) & 0xff;
    const g2 = (end >> 8) & 0xff;
    const b2 = end & 0xff;

    const r = Math.round(r1 + percent * (r2 - r1));
    const g = Math.round(g1 + percent * (g2 - g1));
    const b = Math.round(b1 + percent * (b2 - b1));

    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
};

const TitleTypography = styled(Typography)`
    && {
        font-weight: 600;
        color: ${({ theme }) => theme.paletteColor.darkGreen};
    }
`;

const InfoTypography = styled(Typography)`
    && {
        color: ${({ theme }) => theme.paletteColor.darkGreen};
        font-weight: 700;
    }
`;

const DivBox = styled.div`
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

const ValueTypography = styled(Typography) <{ error?: boolean }>`
    && {
        font-size: 1.2rem;
        font-weight: 700;
        color: ${props => props.error ? props.theme.paletteColor.error : props.theme.paletteColor.darkGreen};
    }
`;

const NotificationIcon = styled(IoIosNotificationsOutline)`
    color: ${({ theme }) => theme.paletteColor.secundGreen};
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
        color: ${({ theme }) => theme.paletteColor.primaryGreen};
    }
`;

const IconImage = styled.img`
    height: 24px;
    margin-bottom: 8px;
`;
const DivLoading = styled.div`
    padding-bottom: 2px;
`;

const ProgressContainer = styled(Box)`
    width: 95%;
    position: relative;
`;

const CustomLinearProgress = styled(LinearProgress)`
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

const PercentageTypography = styled(Typography) <{ color: string }>`
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

const SaldoTypography = styled(Typography) <{ color: string }>`
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

interface DashboardHeaderProps {
    title: string;
    receita: number;
    despesas: number;
    saldo: number;
    loading: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, receita, despesas, saldo, loading }) => {
    const { formatNumber } = useFormatCurrency();
    const progresso = receita > 0 ? (despesas / receita) * 100 : 0;

    const percentageColor = progresso <= 9
        ? interpolateColor('#000000', '#FFFFFF', progresso / 9)
        : 'white';

    const saldoColor = saldo < 0
        ? 'red'
        : progresso > 80
            ? interpolateColor('#000000', '#FFFFFF', (progresso - 80) / 10)
            : 'black';

    const getStatusMessage = (progresso: number): string => {
        if (progresso <= 45) {
            return "Tudo sob controle, ainda dá pra curtir!";
        } else if (progresso > 45 && progresso <= 80) {
            return "Fique esperto, os gastos estão subindo.";
        } else {
            return "Alerta vermelho! Tá na hora de frear.";
        }
    };
    return (
        <GridContainer>
            <GridItem xs={10} justifyContent='flex-start' paddingTopMuiGrid='30px'>
                <TitleTypography variant="h6">{title}</TitleTypography>
            </GridItem>
            <GridItem xs={2} paddingTopMuiGrid='30px'>
                <IconContainer>
                    <NotificationIcon size={30} />
                </IconContainer>
            </GridItem>
            <GridItem paddingTopMuiGrid={'10px'}>
                <GridItem direction="column" alignItems={'center'}>
                    <DivBox>
                        <IconImage src={IncomeIcon} alt="Income Icon" />
                        <InfoTypography variant="subtitle1">Receita do mês</InfoTypography>
                        {loading ?
                            <DivLoading><CircularProgress size={25} /></DivLoading> :
                            <ValueTypography variant="subtitle1">{formatNumber(receita)}</ValueTypography>
                        }
                    </DivBox>
                </GridItem>
                <GridItem>
                    <GridItem direction="column" alignItems={'center'}>
                        <DivBox>
                            <IconImage src={ExpenseIcon} alt="Expense Icon" />
                            <InfoTypography variant="subtitle1">Despesas do mês</InfoTypography>
                            {loading ?
                                <DivLoading><CircularProgress size={25} /></DivLoading> :
                                <ValueTypography variant="subtitle1" error>{formatNumber(despesas)}</ValueTypography>
                            }
                        </DivBox>
                    </GridItem>
                </GridItem>
            </GridItem>
            <GridItem direction="column" alignItems={'center'} paddingTopMuiGrid={'15px'}>
                <ProgressContainer>
                    <CustomLinearProgress variant="determinate" value={100 - progresso} />
                    <PercentageTypography color={percentageColor}>{Math.round(progresso)}%</PercentageTypography>
                    <SaldoTypography color={saldoColor}>{formatNumber(saldo)}</SaldoTypography>
                </ProgressContainer>
                <InfoTypography fontSize={12} paddingTop={0.4}>{`${progresso.toFixed(0)}% Gasto, ${getStatusMessage(progresso)}`}</InfoTypography>
            </GridItem>
        </GridContainer>
    );
};

export default DashboardHeader;
