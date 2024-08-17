import * as Yup from 'yup';
import { useState } from 'react';
import ScreenLayout from '@/components/scheenLayout';
import CustomSelect from '@/components/customselect';
import CustomInput from '@/components/custominput';
import { TransactionTypeEnum } from '@enums/transactionTypeEnum';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';
import FormPayments from './formPayments';
import DashboardHeader from './dashboardHeader';
import { UseFirestoreQuery } from '@/hooks/usefirestorequery';
import { FixedCostsModel } from '@/page/fixedcosts/model';
import { UseTableKeys } from '@/hooks/usetablename';
import { useFormik } from 'formik';
import { FormPaymentsModel } from '../model/formPaymentsModel';
import { OperationPaymentsEnum } from '@/constants/enums/operationPaymentsEnum';
import dayjs from 'dayjs';
import { FormIncomeModel } from '../model/formIncomeModel';
import CustomDatePicker from '@/components/customdatepicker';
import { IncomeTypeEnum } from '@/constants/enums/incomeTypeEnum';
import useFormatCurrency from '@/hooks/formatCurrency';
import { addDoc, collection, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import CustomSnackBar, { StateSnackBar } from '@/components/customsnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '@/store/reducer/reducer';
import { RootState } from '@/store/reducer/store';
import { endOfMonth, startOfMonth } from 'date-fns';

export interface ItemsSelectProps {
    label: string;
    value: number;
}
function HomeScreen() {
    const dispatch = useDispatch();
    const [fixedCosts, setFixedCosts] = useState<FixedCostsModel | null>(null);
    const [TransactionType, setTransactionType] = useState<ItemsSelectProps>({ label: 'Despesas', value: TransactionTypeEnum.DESPESA });
    const [income, setIncome] = useState<ItemsSelectProps | null>(null);
    const error = useSelector((state: RootState) => state.user.error)
    const [openSnackBar, setOpenSnackBar] = useState<StateSnackBar>({ error: false, success: false });
    const tableKey = UseTableKeys();
    const { data: allItems } = UseFirestoreQuery<FixedCostsModel>(
        { collectionName: tableKey.FixedCosts, useCache: true });
    const { formatCurrencyRealTime, convertToNumber } = useFormatCurrency()

    const typeTransaction: ItemsSelectProps[] = [
        { label: 'Despesas', value: TransactionTypeEnum.DESPESA },
        { label: 'Receita', value: TransactionTypeEnum.RECEITA }
    ];
    const incomeCategories: ItemsSelectProps[] = [
        { label: 'Renda Fixa', value: IncomeTypeEnum.FIXED_INCOME },
        { label: 'Renda Extra', value: IncomeTypeEnum.ADDITIONAL_INCOME }
    ];

    const formikFormPayments = useFormik<FormPaymentsModel>({
        initialValues: {
            dtPayments: dayjs(),
            operationPayments: OperationPaymentsEnum.CONTA_VARIAVEL,
            vlPayments: null,
            dsPayments: '',
        },
        validationSchema: Yup.object().shape({
            dtPayments: Yup.string().required('Dia de vencimento é obrigatório'),
            vlPayments: Yup.string().required('Valor Pago é obrigatório'),
            dsPayments: Yup.string().required('descrição é obrigatório'),
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: onSubmitPayments
    })

    const formikFormIncome = useFormik<FormIncomeModel>({
        initialValues: {
            dtIncome: dayjs(),
            vlIncome: null,
            stIncome: null
        },
        validationSchema: Yup.object().shape({
            dtIncome: Yup.string().required('Data Recebido é obrigatória'),
            vlIncome: Yup.string().required('Valor Recebido é obrigatório'),
            stIncome: Yup.string().required('Categoria Recebida é obrigatório'),
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: onSubmitIncome
    })
    async function onSubmitPayments() {
        const valuesUpdate: FormPaymentsModel = {
            ...formikFormPayments.values,
            dtPayments: dayjs(formikFormPayments.values.dtPayments).format('DD/MM/YYYY'),
            vlPayments: convertToNumber(formikFormPayments.values.vlPayments as string)
        };
        try {
            await addDoc(collection(db, tableKey.Payments), {
                ...valuesUpdate
            })
            formikFormPayments.resetForm()
            setOpenSnackBar(prev => ({ ...prev, success: true }))
        } catch (error) {
            dispatch(setError('Erro ao salvar, verifique sua conexão e tente novamente.'))
            setOpenSnackBar(prev => ({ ...prev, error: true }))
        }
    }
    async function onSubmitIncome() {
        const valuesUpdate: FormIncomeModel = {
            ...formikFormIncome.values,
            dtIncome: dayjs(formikFormIncome.values.dtIncome).format('DD/MM/YYYY'),
            vlIncome: convertToNumber(formikFormIncome.values.vlIncome as string)
        };
        try {
            await addDoc(collection(db, tableKey.Income), {
                ...valuesUpdate
            })
            formikFormIncome.resetForm()
            setOpenSnackBar(prev => ({ ...prev, success: true }))
        } catch (error) {
            dispatch(setError('Erro ao salvar, verifique sua conexão e tente novamente.'))
            setOpenSnackBar(prev => ({ ...prev, error: true }))
        }
    }
    function handleSubmitForm() {
        if (TransactionType.value === TransactionTypeEnum.RECEITA) {
            formikFormIncome.submitForm()
        } else {
            formikFormPayments.submitForm()
        }
    }
    return (
        <ScreenLayout
            styleHeader={{ padding: '20px', height: '185px' }}
            buttonTitle='Salvar'
            onClickButton={() => handleSubmitForm()}
            childrenTitle={
                <DashboardHeader
                    despesas='4.544,88'
                    receita='8.255,25'
                    saldo='3.710,37'
                    title='Bem-Vindo(a) de Volta'
                />
            }
        >
            <GridContainer style={{ height: '26rem', display: 'block' }}>
                <GridItem>
                    <CustomSelect<ItemsSelectProps>
                        selectedValue={TransactionType}
                        onValueChange={(item) => setTransactionType(item)}
                        items={typeTransaction}
                        getLabel={(item) => item.label}
                        getValue={(item) => item.value}
                    />
                </GridItem>
                {TransactionType.value === TransactionTypeEnum.DESPESA ? (
                    <FormPayments
                        errors={formikFormPayments.errors}
                        handleBlur={formikFormPayments.handleBlur}
                        handleChange={formikFormPayments.handleChange}
                        touched={formikFormPayments.touched}
                        values={formikFormPayments.values}
                        dataTable={allItems}
                        fixedCosts={fixedCosts}
                        setFixedCosts={setFixedCosts}
                        setFieldValue={formikFormPayments.setFieldValue}
                    />
                ) : (
                    <>
                        <GridItem input>
                            <CustomSelect<ItemsSelectProps>
                                selectedValue={income}
                                onValueChange={(item) => {
                                    setIncome(item)
                                    formikFormIncome.setFieldValue('stIncome', item.value)
                                }}
                                items={incomeCategories}
                                getLabel={(item) => item.label}
                                getValue={(item) => item.value ?? ''}
                                error={formikFormIncome.touched.stIncome && Boolean(formikFormIncome.errors.stIncome)}
                                helperText={formikFormIncome.errors.stIncome}
                            />
                        </GridItem>
                        <GridItem input>
                            <CustomDatePicker
                                label='Data Recebido'
                                view={'date'}
                                name='dtIncome'
                                onChange={formikFormIncome.handleChange}
                                error={formikFormIncome.touched.dtIncome && Boolean(formikFormIncome.errors.dtIncome)}
                                helperText={formikFormIncome.touched.dtIncome && formikFormIncome.errors.dtIncome}
                                value={formikFormIncome.values.dtIncome}
                            />
                        </GridItem>
                        <GridItem input>
                            <CustomInput
                                label='Valor Recebido'
                                name='vlIncome'
                                onChange={(e) => { formikFormIncome.setFieldValue('vlIncome', formatCurrencyRealTime(e.target.value)) }}
                                value={formikFormIncome.values.vlIncome}
                                error={formikFormIncome.touched.vlIncome && Boolean(formikFormIncome.errors.vlIncome)}
                                helperText={formikFormIncome.touched.vlIncome && formikFormIncome.errors.vlIncome}
                            />
                        </GridItem>
                        <CustomSnackBar
                            message={error ? error : "Cadastrado Com Sucesso"}
                            open={openSnackBar}
                            setOpen={setOpenSnackBar}
                        />
                    </>
                )}
            </GridContainer>
        </ScreenLayout>
    );
}

export default HomeScreen;
