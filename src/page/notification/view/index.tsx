import ScreenLayout from '@/components/scheenLayout';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';
import styled from 'styled-components';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsByQuery, updateItem } from '@/hooks/usefirestorequery';
import { UseTableKeys } from '@/hooks/usetablename';
import { NotificationModel } from '../model';
import { setError, setLoading } from '@/store/reducer/reducer';
import CustomSnackBar, { StateSnackBar } from '@/components/customsnackbar';
import { RootState } from '@/store/reducer/store';
import { CircularProgress } from '@mui/material';
import { DocumentData, orderBy } from 'firebase/firestore';

const iconMap: Record<string, IconType> = {
    Notification: IoIosNotificationsOutline,
    FaExclamationCircle: FaExclamationCircle,
    FaCheckCircle: FaCheckCircle,
};

function Notification() {
    const dispatch = useDispatch();
    const tableKey = UseTableKeys();
    const [openSnackBar, setOpenSnackBar] = useState<StateSnackBar>({ error: false, success: false });
    const [notificaitonData, setNotificationData] = useState<NotificationModel[]>([]);
    const error = useSelector((state: RootState) => state.user.error);
    const loading = useSelector((state: RootState) => state.user.loading);
    const [page, setPage] = useState<number>(10);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const [loadingBottom, setLoadingBottom] = useState<boolean>(false);
    const [lastVisibleDoc, setLastVisibleDoc] = useState<DocumentData | null>(null);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const scrollThreshold = 5;

        const scrollPosition = target.scrollTop;
        const totalScrollable = target.scrollHeight - target.clientHeight;

        if (totalScrollable - scrollPosition <= scrollThreshold && hasMoreData) {
            setPage(prevPage => prevPage + 10);
            setLoadingBottom(true)
        }
    };

    useEffect(() => {
        fetchNotificationData()
    }, [page]);

    const fetchNotificationData = async () => {
        if (!loadingBottom) dispatch(setLoading(true));

        const { data: fetchData, lastVisible } = await getItemsByQuery<NotificationModel>(
            tableKey.Notification,
            [orderBy('timestamp', 'desc')],
            dispatch,
            10,
            lastVisibleDoc,
        );

        if (fetchData.length < 10) {
            setHasMoreData(false);
        }

        if (fetchData.length > 0) {
            setNotificationData(prevData => {
                const newData = fetchData.filter(item => !prevData.some(existingItem => existingItem.id === item.id));
                return [...prevData, ...newData];
            });
            setLastVisibleDoc(lastVisible);
        } else {
            dispatch(setError("Erro ao buscar Notificações."));
            setOpenSnackBar(prevData => ({ ...prevData, error: true }));
        }

        dispatch(setLoading(false));
        setLoadingBottom(false);
    };
    useEffect(() => {
        if (notificaitonData.length > 0) {
            const notificationsToUpdate = notificaitonData.filter(item => !item.openNotification);
            notificationsToUpdate.forEach(item => {
                updateItem(tableKey.Notification, item.id ?? '', { ...item, openNotification: true }, dispatch);
            });
        }
    }, [notificaitonData])
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
                    onScroll={handleScroll}
                >
                    {!loading ? (
                        <>
                            {notificaitonData.map((item, index) => {
                                const IconComponent = iconMap[item.typeNotification];
                                return (
                                    <Box key={index}>
                                        {IconComponent && (
                                            <DivIcon>
                                                <Span>
                                                    <IconComponent size={30} />
                                                </Span>
                                                {!item.openNotification ? <OpenNotification></OpenNotification> : null}
                                            </DivIcon>
                                        )}
                                        <div>
                                            <GridItem justifyContent='flex-start'>
                                                {item.titleNotification}
                                            </GridItem>
                                            <GridItem justifyContent='flex-start' paddingTop={0.2}>
                                                {item.descriptionNotification}
                                            </GridItem>
                                        </div>
                                    </Box>
                                );
                            })}
                            <CustomSnackBar message={error} open={openSnackBar} setOpen={setOpenSnackBar} />
                            {loadingBottom ?
                                <GridItem paddingTopMuiGrid='0px'>
                                    <CircularProgress size={15} />
                                </GridItem>
                                :
                                null
                            }
                        </>
                    ) : (
                        <GridContainer style={{ height: '100%' }}>
                            <CircularProgress />
                        </GridContainer>
                    )}
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
    cursor: pointer;
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

const OpenNotification = styled.div`
    background-color: #ff8d00;
    width: 10px;
    height: 10px;
    margin-left: -10px;
    margin-top: -25px;
    margin-bottom: 8px;
    border-radius: 5px;
`;

const DivIcon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;