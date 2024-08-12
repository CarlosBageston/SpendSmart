import React from 'react';
import { Typography } from '@mui/material';
import { IoIosNotificationsOutline } from 'react-icons/io';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';
import { IconContainer } from '@/page/home/style'


interface DashboardHeaderProps {
    title: string;
    receita: string;
    despesas: string;
    saldo: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, receita, despesas, saldo }) => {
    return (
        <GridContainer>
            <GridItem xs={10} justifyContent='flex-start' paddingTopMuiGrid='45px'>
                <Typography variant="h6">{title}</Typography>
            </GridItem>
            <GridItem xs={2} paddingTopMuiGrid='45px'>
                <IconContainer>
                    <IoIosNotificationsOutline size={30} />
                </IconContainer>
            </GridItem>
            <GridItem paddingTopMuiGrid={'10px'}>
                <GridItem direction="column" alignItems={'center'}>
                    <Typography variant="subtitle1">Receita do mês</Typography>
                    <Typography variant="subtitle1">{receita}</Typography>
                </GridItem>
                <GridItem>
                    <GridItem direction="column" alignItems={'center'} >
                        <Typography variant="subtitle1">Despesas do mês</Typography>
                        <Typography variant="subtitle1">{despesas}</Typography>
                    </GridItem>
                </GridItem>
            </GridItem>
            <GridItem direction="column" alignItems={'center'} paddingTopMuiGrid={'10px'}>
                <Typography variant="subtitle1">Saldo</Typography>
                <Typography variant="subtitle1">{saldo}</Typography>
            </GridItem>
        </GridContainer>
    );
};

export default DashboardHeader;
