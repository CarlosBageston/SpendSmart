import ScreenLayout from '@/components/scheenLayout';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';
import styled from 'styled-components';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { IoIosNotificationsOutline } from 'react-icons/io';

// Mapeamento de identificadores para componentes de ícone
const iconMap: Record<string, IconType> = {
    Notification: IoIosNotificationsOutline,
    FaExclamationCircle: FaExclamationCircle,
    FaCheckCircle: FaCheckCircle,
};

function Notification() {

    const table = [
        { description: 'Você tem uma conta a pagar, Você tem uma conta ', title: 'Lembrete', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 1', title: 'Lembrete 1', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 2', title: 'Lembrete 2', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 3', title: 'Lembrete 3', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 4', title: 'Lembrete 4', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 5', title: 'Lembrete 5', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 6', title: 'Lembrete 6', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 7', title: 'Lembrete 7', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 8', title: 'Lembrete 8', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 9', title: 'Lembrete 9', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 10', title: 'Lembrete 10', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 11', title: 'Lembrete 11', icon: 'Notification' },
        { description: 'Você tem uma conta a pagar 12', title: 'Lembrete 12', icon: 'Notification' },
    ];

    return (
        <>
            <ScreenLayout
                title="Notificação"
                showButton={false}
            >
                <GridContainer
                    style={{
                        display: 'block',
                        height: '73vh',
                    }}
                    className="hidden-scrollbar"
                >
                    {table.map((item, index) => {
                        const IconComponent = iconMap[item.icon];
                        return (
                            <Box key={index}>
                                {IconComponent && (
                                    <Span>
                                        <IconComponent size={30} />
                                    </Span>
                                )}
                                <div>
                                    <GridItem justifyContent='flex-start'>
                                        {item.title}
                                    </GridItem>
                                    <GridItem justifyContent='flex-start' paddingTop={0.2}>
                                        {item.description}
                                    </GridItem>
                                </div>
                            </Box>
                        );
                    })}
                </GridContainer>
            </ScreenLayout>
        </>
    );
}

export default Notification;

const Box = styled.div`
    width: 90%;
    margin-left: 8%;
    margin-bottom: 20px;
    padding: 8px 8px 8px 8px;
    border-bottom: 1px solid ${({ theme }) => theme.paletteColor.primaryGreen};
    display: flex;
    justify-content: flex-start;
`;

const Span = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    padding: 5px;
    background-color:  ${({ theme }) => theme.paletteColor.secundGreen};
    border-radius: 15px;
    margin-bottom: 30px;
`;