import React from 'react';
import { Card, CardContent, Typography, IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FixedCostsModel } from '@/page/fixedcosts/model';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
interface ExpenseCardProps {
    expense: FixedCostsModel;
    onClickEdit?: () => void;
    onClickDelete?: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onClickEdit, onClickDelete }) => {
    return (
        <StyledCard >
            <CardContentMui>
                <TitleContainer>
                    <TitleBox onClick={onClickEdit}>
                        <Title>{expense.dsFixedCosts}</Title>
                        <IconButtonStyled>
                            <EditIcon color='info' />
                        </IconButtonStyled>
                    </TitleBox>
                    <IconButtonStyled onClick={onClickDelete}>
                        <DeleteForeverIcon color='error' />
                    </IconButtonStyled>
                </TitleContainer>
                <Subtitle>Dia de Venc.: {expense.dayVencimento.toString().substring(0, 2)}</Subtitle>
                <Subtitle>periodo de pagamento: {expense.dtIndefinida ? 'Indefinida' : expense.dtVigencia.substring(3)}</Subtitle>
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
    position: relative;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
    }
`;

const TitleBox = styled('div')`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 5px;
    cursor: pointer;
`;
const TitleContainer = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const Title = styled(Typography)`
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
`;

const Subtitle = styled(Typography)`
    font-size: 12px;
    color: #888;
    margin-bottom: 5px;
`;


const CardContentMui = styled(CardContent)`
    &&{
        padding: 10px;
    }
`;

const IconButtonStyled = styled(IconButton)`
    color: #888;
`;

export default ExpenseCard;
