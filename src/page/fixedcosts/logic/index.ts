import { db } from "@/config/firebase";
import { FixedCostsModel } from "../model";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, writeBatch } from "firebase/firestore";
import { setError, setLoading, State } from "@/store/reducer/reducer";
import { UseTableKeys } from "@/hooks/usetablename";
import { UseFirestoreQuery } from "@/hooks/usefirestorequery";
import { SituacaoRegistroEnum } from "@/constants/enums/situacaoregistroenum";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';


/**
 * Parâmetros para a lógica de custos fixos.
 */
interface UseFixedCostsLogicParams {
    /**
     * Os valores do modelo de custos fixos.
     */
    values: FixedCostsModel;

    /**
     * Função para definir o valor de um campo específico no formulário.
     */
    setFieldValue: (field: string, value: any) => void;

    /**
     * Função para redefinir o formulário.
     */
    resetForm: () => void;
}

/**
 * Hook personalizado para gerenciar a lógica de custos fixos.
 *
 * @param {UseFixedCostsLogicParams} params - Os parâmetros para a lógica de custos fixos.
 * @returns {object} - Um objeto contendo estados e funções úteis para o gerenciamento de custos fixos.
 */
export function useFixedCostsLogic({ values, setFieldValue, resetForm }: UseFixedCostsLogicParams) {
    const dispatch = useDispatch();
    const [key, setKey] = useState<number>(0);
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [dtIndefinida, setdtIndefinida] = useState<boolean>(false);
    const [fixedCostsList, setFixedCostsList] = useState<FixedCostsModel[]>([]);
    const [selected, setSelected] = useState<FixedCostsModel>();
    const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState<boolean>(false);

    const tableKey = UseTableKeys();
    const loading = useSelector((state: State) => state.user.loading);
    const errorFixedCosts = useSelector((state: State) => state.user.error);
    const { data: allItems, error: errorQuery, loading: loadingFireStore } = UseFirestoreQuery<FixedCostsModel>(
        {collectionName: tableKey.FixedCosts, useCache:true});

    useEffect(() => {
        if (allItems) {
            setFixedCostsList(allItems);
        }
    }, [allItems]);

        
    function isLocalId(id: string): boolean {
        return id.endsWith('-Temp');
      }

    /**
     * Função para adicionar custos Fixos no banco de dados.
     *
     * @returns {Promise<void>} - Uma promessa que resolve quando o custo fixo for adicionado.
     */
    const addFixedCost = async (): Promise<void> => {
        dispatch(setLoading(true))
        try {
            const userFixedCostsCollection = collection(db, tableKey.FixedCosts);
            const batch = writeBatch(db);
            
            fixedCostsList.forEach(cost => {
               if(cost.stRegistro === SituacaoRegistroEnum.CREATE){
                    delete cost.id;
                    delete cost.stRegistro;
                    const docRef = doc(userFixedCostsCollection);
                    batch.set(docRef, {...cost});
               } else if(cost.stRegistro === SituacaoRegistroEnum.UPDATE){
                    if(isLocalId(cost.id ?? '')) delete cost.id
                    const docRef = doc(userFixedCostsCollection, cost.id);
                    delete cost.stRegistro
                    batch.update(docRef, {...cost});
               } else if(cost.stRegistro === SituacaoRegistroEnum.DELETE){
                    const docRef = doc(userFixedCostsCollection, cost.id);
                    batch.delete(docRef);
               }
            });

            await batch.commit();
            dispatch(setLoading(false))
            setOpenSnackBarSuccess(true)
        } catch (error) {
            console.log(error)
            dispatch(setError('Erro ao salvar, tente novamente.'))
            setOpenSnackBar(true)
            dispatch(setLoading(false))
        }
    };
    /**
     * adiciona à lista de despesas.
     */
    const formatExpenseCard = () => {
        if(selected){
            if (JSON.stringify(selected) !== JSON.stringify(values)){
                console.log('values', values)
                const updatedValues = {
                    ...values,
                    dayVencimento: dayjs(values.dayVencimento).format('DD/MM/YYYY'),
                    dtVigencia: values.dtIndefinida ? '' : dayjs(values.dtVigencia).format('DD/MM/YYYY'),
                    stRegistro: values.stRegistro === SituacaoRegistroEnum.CREATE ? 
                    SituacaoRegistroEnum.CREATE : SituacaoRegistroEnum.UPDATE,
                };
                console.log('values11', updatedValues)
                const updatedList = fixedCostsList.map(cost => cost.id === updatedValues.id ? updatedValues : cost);
                console.log('valuplist', updatedList)
                setFixedCostsList(updatedList);
            }
        } else {
            const newFixedCost: FixedCostsModel = {
                ...values,
                id: `${uuidv4()}-Temp`,
                dayVencimento: dayjs(values.dayVencimento).format('DD/MM/YYYY'),
                dtVigencia: values.dtIndefinida ? '' : dayjs(values.dtVigencia).format('DD/MM/YYYY'),
                stRegistro: SituacaoRegistroEnum.CREATE
            };
            console.log('newFixedCost', newFixedCost)
            setFixedCostsList([...fixedCostsList, newFixedCost]);
        }
        setSelected(undefined)
        resetForm();
        dispatch(setLoading(false))
    }

    const handleDelete = (expense: FixedCostsModel) => {
        if (expense.stRegistro === SituacaoRegistroEnum.CREATE) {
            setFixedCostsList(fixedCostsList.filter(cost => cost.id !== expense.id));
        } else {
            const updatedList = fixedCostsList.map(cost => 
                cost.id === expense.id ? { ...cost, stRegistro: SituacaoRegistroEnum.DELETE } : cost
            );
            setFixedCostsList(updatedList);
        }
    };
    

    const handleExpenseClick = (expense: FixedCostsModel) => {
        setSelected(expense)
        setFieldValue('id', expense.id)
        setFieldValue('dsFixedCosts', expense.dsFixedCosts);
        setFieldValue('dayVencimento', dayjs(expense.dayVencimento, 'DD/MM/YYYY'));
        setFieldValue('dtIndefinida', expense.dtIndefinida);
        setFieldValue('dtVigencia', dayjs(expense.dtVigencia, 'DD/MM/YYYY'));
        setFieldValue('stRegistro', !expense.stRegistro? expense.stRegistro : undefined);
        setKey(Math.random())
    };


    useEffect(() => {
        if (values.dtIndefinida) {
            setdtIndefinida(true)
            setFieldValue('dtVigencia', '')
            setKey(Math.random())
        } else { setdtIndefinida(false) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.dtIndefinida])

    return {
        openSnackBar,
        setOpenSnackBar,
        loading,
        dtIndefinida,
        key,
        addFixedCost,
        formatExpenseCard,
        errorFixedCosts,
        openSnackBarSuccess,
        setOpenSnackBarSuccess,
        errorQuery,
        fixedCostsList,
        handleExpenseClick,
        selected,
        handleDelete,
        loadingFireStore
    };
}