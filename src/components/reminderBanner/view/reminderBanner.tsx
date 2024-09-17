import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getItemsByQuery } from '@/hooks/usefirestorequery';
import { UseTableKeys } from '@/hooks/usetablename';
import { collection, doc, Timestamp, where, writeBatch } from 'firebase/firestore';
import moment from 'moment'
import { FixedCostsModel } from '@/page/fixedcosts/model';
import { NotificationModel } from '@/page/notification/model';
import { useNavigate } from 'react-router-dom';
import { db } from '@/config/firebase';

interface Notification {
    title: string;
    message: string;
    details: string
}

const ReminderBanner = () => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const tableKey = UseTableKeys();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { transform } = useSpring({
        transform: showBanner ? 'translateY(0%)' : 'translateY(-150%)',
        config: { tension: 220, friction: 120 },
    });
    /**
     * Formata as datas de hoje e de 3 dias depois no formato "YYYY-MM-DD".
     * @returns Um objeto contendo as datas de hoje e de três dias depois.
     */
    const formatDates = () => {
        const today = moment().format("YYYY-MM-DD");
        const threeDaysLater = moment().add(3, 'days').format("YYYY-MM-DD");
        return { today, threeDaysLater };
    };

    /**
     * Busca itens da tabela `FixedCosts` que possuem o vencimento entre hoje e os próximos 3 dias.
     * 
     * @param today - A data de hoje no formato "YYYY-MM-DD".
     * @param threeDaysLater - A data de 3 dias depois no formato "YYYY-MM-DD".
     * @param dispatch - A função dispatch para gerenciar o estado global.
     * @returns Uma lista de itens que satisfazem a query.
     */
    const fetchItems = async (today: string, threeDaysLater: string, dispatch: any) => {
        return await getItemsByQuery<FixedCostsModel>(
            tableKey.FixedCosts,
            [
                where("dayVencimento", ">=", today),
                where("dayVencimento", "<=", threeDaysLater),
            ],
            dispatch
        );
    };

    /**
     * Define e exibe a notificação no sistema, com base na quantidade de itens encontrados.
     * 
     * @param response - A lista de itens retornados pela consulta.
     */
    const setNotificationDetails = (response: FixedCostsModel[]) => {
        setNotification({
            title: "Fica Esperto Fi",
            message: `Você tem ${response.length} ${response.length === 1 ? "divida" : "dividas"} para pagar nos próximos 3 dias.`,
            details: `Clique para ver mais detalhes ${response.length === 1 ? "da divida" : "de cada divida"}.`
        });
        setShowBanner(true);
        setTimeout(() => {
            setShowBanner(false);
        }, 6000);
    };

    /**
     * Adiciona notificações ao banco de dados com base nos itens recebidos.
     * 
     * @param response - A lista de itens retornados pela consulta, cada um representando um custo fixo.
     * @returns Uma promise que confirma a operação no banco de dados.
     */
    const addNotificationsToDB = async (response: FixedCostsModel[]) => {
        const batch = writeBatch(db);
        let timeIncrement = 0;

        response.forEach((item) => {
            const timestamp = Timestamp.fromDate(new Date(Date.now() + timeIncrement));
            const notif: NotificationModel = {
                titleNotification: item.dsFixedCosts,
                descriptionNotification: `Você possui uma dívida para ser paga no dia ${item.dayVencimento.substring(8, 10)}`,
                typeNotification: 'Notification',
                openNotification: false,
                timestamp: timestamp
            };
            const docRef = doc(collection(db, tableKey.Notification));
            batch.set(docRef, notif);
            timeIncrement += 1000;
        });

        await batch.commit();
    };

    /**
    * Função principal para buscar e processar notificações. Ela faz a busca de itens com vencimentos
    * próximos e cria notificações no sistema, além de exibir um banner para o usuário.
    */
    const fetchNotification = async () => {
        const { today, threeDaysLater } = formatDates();
        const { data } = await fetchItems(today, threeDaysLater, dispatch);

        if (data.length > 0) {
            setNotificationDetails(data);
            await addNotificationsToDB(data);
        }
    };

    useEffect(() => {
        const lastRun = localStorage.getItem('lastReminderShownDate');
        const now = moment().format('YYYY-MM-DD');

        if (lastRun !== now) {
            fetchNotification();
            localStorage.setItem('lastReminderShownDate', now);
        }
    }, []);

    return (
        <>
            {notification && (
                <ReminderContainer style={{ transform }} onClick={() => navigate("/notification")}>
                    <TitleNotification>{notification.title}</TitleNotification>
                    <MessageNotification>{notification.message}</MessageNotification>
                    <DetailsNotification>{notification.details}</DetailsNotification>
                </ReminderContainer>
            )}
        </>
    );
};

export default ReminderBanner;
const ReminderContainer = styled(animated.div)`
    position: fixed;
    top: 20px;
    transform: translateX(-50%);
    width: 80%;
    max-width: 500px;
    padding: 15px 20px;
    background: #fffffff2;
    color: #2C3E50;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.171);
    z-index: 9999;
    transform: translateY(-100%);
    transition: transform 0.4s ease, opacity 0.4s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const TitleNotification = styled.h3`
    font-size: 1.2rem;
    color: #4A90E2; 
    margin-bottom: 8px;
    font-weight: 600;
`;

const MessageNotification = styled.p`
    font-size: 1rem;
    color: #34495E;
    margin-bottom: 8px;
`;

const DetailsNotification = styled.p`
    font-size: 0.9rem;
    color: #7F8C8D;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: #4A90E2;
    }
`;