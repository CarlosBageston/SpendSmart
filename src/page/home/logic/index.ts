import { FixedCostsModel } from "@/page/fixedcosts/model";
import dayjs from "dayjs";
import { addDoc, collection, where } from "firebase/firestore";
import { FormIncomeModel } from "../model/formIncomeModel";
import { FormPaymentsModel } from "../model/formPaymentsModel";
import { UseTableKeys } from "@/hooks/usetablename";
import { useEffect, useState } from "react";
import useFormatCurrency from "@/hooks/formatCurrency";
import { db } from "@/config/firebase";
import { useDispatch } from "react-redux";
import { setError } from "@/store/reducer/reducer";
import { StateSnackBar } from "@/components/customsnackbar";
import { getAllItems, getSum } from "@/hooks/usefirestorequery";


interface UseHomeLogicParams {
    valuesPayments: FormPaymentsModel;
    setFieldValuePayments: (field: string, value: any) => void;
    resetFormPayments: () => void;
    
    valuesIncome: FormIncomeModel;
    setFieldValueIncome: (field: string, value: any) => void;
    resetFormIncome: () => void;
}
const constraintsPayments = [
    where('dtPayments', '>=', dayjs().startOf('month').format('DD/MM/YYYY')),
    where('dtPayments', '<=', dayjs().endOf('month').format('DD/MM/YYYY')),
];
const constraintsIncome = [
    where('dtIncome', '>=', dayjs().startOf('month').format('DD/MM/YYYY')),
    where('dtIncome', '<=', dayjs().endOf('month').format('DD/MM/YYYY')),
];
function useHomeLogic({resetFormIncome, resetFormPayments, setFieldValueIncome, setFieldValuePayments,valuesIncome,valuesPayments}: UseHomeLogicParams) {
    const tableKey = UseTableKeys();
    const dispatch = useDispatch();
    const [recarregue, setRecarregue] = useState<boolean>(true);
    const [saldo, setSaldo] = useState<number>(0);
    const [sumVlPayments, setSumVlPayments] = useState<number>(0);
    const [sumVlIncome, setSumVlIncome] = useState<number>(0);
    const [key, setKey] = useState<number>(0);
    const { convertToNumber } = useFormatCurrency();
    const [openSnackBar, setOpenSnackBar] = useState<StateSnackBar>({ error: false, success: false });
    const [allItems, setAllItems] = useState<FixedCostsModel[]>([])

    useEffect(() => {
        // Buscar todos os itens
        const fetchItems = async () => {
            const allData = await getAllItems<FixedCostsModel>(tableKey.FixedCosts, dispatch);
            setAllItems(allData);
        };
        
        fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sumPayments = await fetchDataPayments();
                const sumIncome = await fetchDataIncome();

                if (sumIncome !== undefined && sumPayments !== undefined) {
                    setSumVlPayments(sumPayments)
                    setSumVlIncome(sumIncome)
                    setSaldo(sumIncome - sumPayments);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setRecarregue(false);
            }
        };
        if(recarregue) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recarregue])
    
    const fetchDataPayments = async () => {
        try {
            const sumVlPayments = await getSum(tableKey.Payments, constraintsPayments,'vlPayments', dispatch);
            return sumVlPayments
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };
    const fetchDataIncome = async () => {
        try {
            const sumVlIncome = await getSum(tableKey.Income, constraintsIncome,'vlIncome', dispatch);
            return sumVlIncome
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };

    async function onSubmitPayments() {
        const valuesUpdate: FormPaymentsModel = {
            ...valuesPayments,
            dtPayments: dayjs(valuesPayments.dtPayments).format('DD/MM/YYYY'),
            vlPayments: convertToNumber(valuesPayments.vlPayments as string)
        };
        try {
            await addDoc(collection(db, tableKey.Payments), {
                ...valuesUpdate
            })
            resetFormPayments();
            cleanState();
            setOpenSnackBar(prev => ({ ...prev, success: true }));
            setRecarregue(true);
        } catch (error) {
            dispatch(setError('Erro ao salvar, verifique sua conexão e tente novamente.'));
            setOpenSnackBar(prev => ({ ...prev, error: true }));
        }
    }
    async function onSubmitIncome() {
        const valuesUpdate: FormIncomeModel = {
            ...valuesIncome,
            dtIncome: dayjs(valuesIncome.dtIncome).format('DD/MM/YYYY'),
            vlIncome: convertToNumber(valuesIncome.vlIncome as string)
        };
        try {
            await addDoc(collection(db, tableKey.Income), {
                ...valuesUpdate
            })
            resetFormIncome();
            cleanState();
            setOpenSnackBar(prev => ({ ...prev, success: true }));
            setRecarregue(true);
        } catch (error) {
            dispatch(setError('Erro ao salvar, verifique sua conexão e tente novamente.'));
            setOpenSnackBar(prev => ({ ...prev, error: true }));
        }
    }



    function cleanState() {
        setFieldValueIncome('vlIncome', null)
        setFieldValueIncome('stIncome', null)
        setFieldValueIncome('dtIncome', dayjs())
        // setIncome(null)

        setFieldValuePayments('dtPayments', dayjs())
        setFieldValuePayments('vlPayments', null)
        setFieldValuePayments('dsPayments', '')
        // setFixedCosts(null)
        setKey(Math.random())
    }
    return {
        saldo,
        key,
        openSnackBar,
        allItems,
        onSubmitPayments,
        onSubmitIncome,
        sumVlPayments,
        sumVlIncome,
        setOpenSnackBar
    }
}

export default useHomeLogic