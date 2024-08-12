import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';

export interface Expense {
    description: string;
    dueDate: string;
    amount: string;
}

interface ExpenseCardProps {
    expense: Expense;
}


const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
    return (
        <StyledCard>
            <CardContentMui>
                <Title>{expense.description}</Title>
                <Subtitle>Data de Venc.: {expense.dueDate}</Subtitle>
                <Amount>Valor a Pagar: {expense.amount}</Amount>
            </CardContentMui>
        </StyledCard>
    );
};

const StyledCard = styled(Card)`
    background-color: #fff;
    border-radius: 10px;
    margin: 10px auto;
    width: 70%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Typography)`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Subtitle = styled(Typography)`
    font-size: 12px;
    color: #888;
    margin-bottom: 5px;
`;

const Amount = styled(Typography)`
    font-size: 12px;
    color: #00D09E;
`;

const CardContentMui = styled(CardContent)`
    &&{
        padding: 10px;
    }
`;

export default ExpenseCard;
