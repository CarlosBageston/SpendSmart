import * as Yup from 'yup';
import { useState } from 'react';
import ScreenLayout from '@/components/scheenLayout';
import CustomSelect from '@/components/customselect';
import CustomInput from '@/components/custominput';
import { TransactionTypeEnum } from '@enums/transactionTypeEnum';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';
import FormPayments from './formPayments';
import DashboardHeader from './dashboardheader';
import { FixedCostsModel } from '@/page/fixedcosts/model';
import { useFormik } from 'formik';
import { FormPaymentsModel } from '../model/formPaymentsModel';
import { OperationPaymentsEnum } from '@/constants/enums/operationPaymentsEnum';
import dayjs from 'dayjs';
import { FormIncomeModel } from '../model/formIncomeModel';
import CustomDatePicker from '@/components/customdatepicker';
import { IncomeTypeEnum } from '@/constants/enums/incomeTypeEnum';
import useFormatCurrency from '@/hooks/formatCurrency';
import CustomSnackBar from '@/components/customsnackbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducer/store';
import useHomeLogic from '../logic';
import VoiceInput from '@/components/voiceInput/view/voiceInput';

export interface ItemsSelectProps {
    label: string;
    value: number;
}

function HomeScreen() {
    const [fixedCosts, setFixedCosts] = useState<FixedCostsModel | null>(null);
    const [TransactionType, setTransactionType] = useState<ItemsSelectProps>({ label: 'Despesas', value: TransactionTypeEnum.DESPESA });
    const [operationPayments, setOperationPayments] = useState<ItemsSelectProps | null>(null);
    const [income, setIncome] = useState<ItemsSelectProps | null>(null);
    const error = useSelector((state: RootState) => state.user.error)
    const loading = useSelector((state: RootState) => state.loading.getSumLoading)
    const { formatCurrencyRealTime } = useFormatCurrency();

    const typeTransaction: ItemsSelectProps[] = [
        { label: 'Despesas', value: TransactionTypeEnum.DESPESA },
        { label: 'Receita', value: TransactionTypeEnum.RECEITA }
    ];
    const incomeCategories: ItemsSelectProps[] = [
        { label: 'Renda Fixa', value: IncomeTypeEnum.FIXED_INCOME },
        { label: 'Renda Extra', value: IncomeTypeEnum.ADDITIONAL_INCOME }
    ];

    const operationPaymentsList: ItemsSelectProps[] = [
        { label: 'Fixa', value: OperationPaymentsEnum.CONTA_FIXA },
        { label: 'Variável', value: OperationPaymentsEnum.CONTA_VARIAVEL }
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
        onSubmit: () => onSubmitPayments()
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
        onSubmit: () => onSubmitIncome()
    })
    const {
        allItems,
        key,
        onSubmitIncome,
        onSubmitPayments,
        openSnackBar,
        saldo,
        sumVlIncome,
        sumVlPayments,
        setOpenSnackBar
    } = useHomeLogic({
        valuesIncome: formikFormIncome.values,
        resetFormIncome: formikFormIncome.resetForm,
        setFieldValueIncome: formikFormIncome.setFieldValue,

        valuesPayments: formikFormPayments.values,
        resetFormPayments: formikFormPayments.resetForm,
        setFieldValuePayments: formikFormPayments.setFieldValue,
    })

    function handleSubmitForm() {
        if (TransactionType.value === TransactionTypeEnum.RECEITA) {
            formikFormIncome.submitForm()
        } else {
            formikFormPayments.submitForm()
        }
    }
    return (
        <ScreenLayout
            styleHeader={{ padding: '20px', height: '220px' }}
            paddingButton='5px 30px 30px'
            buttonTitle='Salvar'
            onClickButton={() => handleSubmitForm()}
            childrenTitle={
                <DashboardHeader
                    despesas={sumVlPayments}
                    receita={sumVlIncome}
                    saldo={saldo}
                    title='Bem-Vindo(a) de Volta'
                    loading={loading}
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
                    <VoiceInput
                        valuesPayments={formikFormPayments.values}
                        setFieldValuePayments={formikFormPayments.setFieldValue}
                        setOperationPayments={setOperationPayments}
                        setFixedCosts={setFixedCosts}
                        setIncome={setIncome}
                        setTransactionType={setTransactionType}
                        setFieldValueIncome={formikFormIncome.setFieldValue}
                        handleSubmitPayments={formikFormPayments.handleSubmit}
                        handleSubmitIncome={formikFormIncome.handleSubmit}
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
                        key={key}
                        error={error}
                        openSnackBar={openSnackBar}
                        setOpenSnackBar={setOpenSnackBar}
                        operationPayments={operationPayments}
                        operationPaymentsList={operationPaymentsList}
                        setOperationPayments={setOperationPayments}
                    />
                ) : (
                    <>
                        <GridItem input>
                            <CustomSelect<ItemsSelectProps>
                                key={key}
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
                                key={key}
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
