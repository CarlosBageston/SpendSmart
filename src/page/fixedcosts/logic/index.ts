import { db } from "@/config/firebase";
import { FixedCostsModel } from "../model";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, writeBatch } from "firebase/firestore";
import { setError, setLoading } from "@/store/reducer/reducer";
import { UseTableKeys } from "@/hooks/usetablename";
import { getAllItems } from "@/hooks/usefirestorequery";
import { SituacaoRegistroEnum } from "@/constants/enums/situacaoregistroenum";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "@/store/reducer/store";
import { StateSnackBar } from "@/components/customsnackbar";


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

    /**
     * Função para atualizar o estado local que indica se há mudanças não salvas.
     */
    setDirtyLocal: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * Função para atualizar o estado que indica se deve Mostrar a modal de Exclusão.
     */
    setShowModalDelete:  React.Dispatch<React.SetStateAction<FixedCostsModel | undefined>>
}

/**
 * Hook personalizado para gerenciar a lógica de custos fixos.
 *
 * @param {UseFixedCostsLogicParams} params - Os parâmetros para a lógica de custos fixos.
 * @returns {object} - Um objeto contendo estados e funções úteis para o gerenciamento de custos fixos.
 */
export function useFixedCostsLogic({ values, setFieldValue, resetForm, setDirtyLocal, setShowModalDelete }: UseFixedCostsLogicParams) {
    const dispatch = useDispatch();
    const [key, setKey] = useState<number>(0);
    const [openSnackBar, setOpenSnackBar] = useState<StateSnackBar>({error: false, success: false});
    const [dtIndefinida, setdtIndefinida] = useState<boolean>(false);
    const [fixedCostsList, setFixedCostsList] = useState<FixedCostsModel[]>([]);
    const [selected, setSelected] = useState<FixedCostsModel>();

    const tableKey = UseTableKeys();
    const loading = useSelector((state: RootState) => state.user.loading);
    const loadingAllItem = useSelector((state: RootState) => state.loading.getAllItemsLoading);
    const errorFixedCosts = useSelector((state: RootState) => state.user.error);
        useEffect(() => {
            // Buscar todos os itens
            const fetchItems = async () => {
                const allData = await getAllItems<FixedCostsModel>(tableKey.FixedCosts, dispatch);
                setFixedCostsList(allData);
            };
            
            fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    

        
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
            setOpenSnackBar(prev => ({...prev, success: true}))
        } catch (error) {
            dispatch(setError('Erro ao salvar, verifique sua conexão e tente novamente.'))
            setOpenSnackBar(prev => ({...prev, error: true}))
            dispatch(setLoading(false))
            throw error;
        }
    };
    /**
     * adiciona à lista de despesas.
     */
    const formatExpenseCard = () => {
        if(selected){
            if (JSON.stringify(selected) !== JSON.stringify(values)){
                const updatedValues = {
                    ...values,
                    dayVencimento: dayjs(values.dayVencimento).format('DD/MM/YYYY'),
                    dtVigencia: values.dtIndefinida ? '' : dayjs(values.dtVigencia).format('DD/MM/YYYY'),
                    stRegistro: values.stRegistro === SituacaoRegistroEnum.CREATE ? 
                    SituacaoRegistroEnum.CREATE : SituacaoRegistroEnum.UPDATE,
                };
                const updatedList = fixedCostsList.map(cost => cost.id === updatedValues.id ? updatedValues : cost);
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
            setFixedCostsList([...fixedCostsList, newFixedCost]);
        }
        setSelected(undefined)
        resetForm();
        dispatch(setLoading(false))
    }

    const handleDelete = (expense: FixedCostsModel) => {
        setDirtyLocal(true);
        setShowModalDelete(undefined)
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
        fixedCostsList,
        handleExpenseClick,
        selected,
        handleDelete,
        loadingAllItem
    };
}