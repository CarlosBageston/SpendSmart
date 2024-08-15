import * as Yup from 'yup';
import { useFormik } from 'formik';
import GridItem from '@/components/griditem';
import CustomInput from '@/components/custominput';
import CustomButton from '@/components/custombutton';
import { Typography, Checkbox, CircularProgress } from '@mui/material';
import ScreenLayout from '@/components/scheenLayout';
import GridContainer from '@/components/gridcontainer';
import { DivExpendCard, TitleCircule } from '@/page/fixedcosts/style';
import CustomSnackBar from '@/components/customsnackbar';
import { FixedCostsModel } from '@/page/fixedcosts/model';
import CustomDatePicker from '@/components/customdatepicker';
import ExpenseCard from '@/page/fixedcosts/view/expensecard';
import { useFixedCostsLogic } from '../logic';
import { SituacaoRegistroEnum } from '@/constants/enums/situacaoregistroenum';


function FixedCosts() {
    const validationSchema = Yup.object().shape({
        dsFixedCosts: Yup.string().required('Descrição é obrigatória'),
        dayVencimento: Yup.string().required('Dia de vencimento é obrigatório'),
        dtIndefinida: Yup.boolean(),
        dtVigencia: Yup.string().when('dtIndefinida', ([dtIndefinida], schema) => {
            return dtIndefinida
                ? schema.notRequired()
                : schema.required('Data de vigência é obrigatória');
        }),
    });

    const { values, handleBlur, handleChange, handleSubmit, touched, errors, resetForm, setFieldValue } = useFormik({
        initialValues: {
            dsFixedCosts: '',
            dtIndefinida: false,
            dayVencimento: '',
            dtVigencia: '',
        } as FixedCostsModel,
        validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: () => formatExpenseCard(),
    });

    const {
        openSnackBar,
        setOpenSnackBar,
        loading,
        dtIndefinida,
        key,
        addFixedCost,
        errorFixedCosts,
        formatExpenseCard,
        openSnackBarSuccess,
        setOpenSnackBarSuccess,
        errorQuery,
        fixedCostsList,
        handleExpenseClick,
        selected,
        handleDelete,
        loadingFireStore
    } = useFixedCostsLogic({ values, setFieldValue, resetForm });

    return (
        <ScreenLayout
            title='Tabela Despesas Mensais Fixas'
            buttonHref='/home'
            buttonTitle='Cadastrar'
            loadingButton={loading}
            onClickButton={() => addFixedCost()}
            paddingButton='0px 30px 30px 30px'
        >
            <GridContainer>
                <GridItem input paddingTopMuiGrid='20px'>
                    <CustomInput
                        label='Descrição'
                        name='dsFixedCosts'
                        value={values.dsFixedCosts}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.dsFixedCosts && Boolean(errors.dsFixedCosts)}
                        helperText={touched.dsFixedCosts && errors.dsFixedCosts}
                    />
                </GridItem>
                <GridItem input paddingTopMuiGrid='10px'>
                    <CustomDatePicker
                        key={`dia-${key}`}
                        label='Dia de Vencimento'
                        view={'day'}
                        onChange={(date) => setFieldValue('dayVencimento', date)}
                        error={touched.dayVencimento && Boolean(errors.dayVencimento)}
                        helperText={touched.dayVencimento && errors.dayVencimento}
                        value={values.dayVencimento}
                    />
                </GridItem>
                <GridItem input paddingTopMuiGrid='0px'>
                    <CustomDatePicker
                        key={`vigencia-${key}`}
                        label='Data de término do pagamento'
                        view={'monthYear'}
                        onChange={(date) => setFieldValue('dtVigencia', date)}
                        error={touched.dtVigencia && Boolean(errors.dtVigencia)}
                        helperText={touched.dtVigencia && errors.dtVigencia}
                        disabled={dtIndefinida}
                        value={values.dtVigencia}
                    />
                </GridItem>
                <GridItem alignItems='center' paddingTopMuiGrid='10px' marginTop={'-30px'}>
                    <Typography>Data de término Indefinida?</Typography>
                    <Checkbox
                        name='dtIndefinida'
                        checked={values.dtIndefinida}
                        onChange={(e) => {
                            setFieldValue('dtIndefinida', e.target.checked);
                            if (e.target.checked) setFieldValue('dtVigencia', '')
                        }}
                    />
                </GridItem>
                <GridItem>
                    <CustomButton
                        colorBackground='#2c95ff'
                        colorLabel='#f1f1f1'
                        type='Button'
                        onClick={() => handleSubmit()}
                        title={selected ? "Salvar" : "Adicionar"}
                        disabled={loading}
                    />
                </GridItem>
                <DivExpendCard>
                    <GridItem direction="column" marginLeft="20px">
                        {loadingFireStore ? (
                            <TitleCircule>
                                <CircularProgress size={25} />
                            </TitleCircule>
                        ) : (
                            fixedCostsList.map((expense, index) => (
                                expense.stRegistro !== SituacaoRegistroEnum.DELETE && (
                                    <ExpenseCard
                                        key={index}
                                        expense={expense}
                                        onClickEdit={() => handleExpenseClick(expense)}
                                        onClickDelete={() => handleDelete(expense)}
                                    />
                                )
                            ))
                        )}
                    </GridItem>
                </DivExpendCard>
            </GridContainer>
            <CustomSnackBar
                message={errorQuery ? errorQuery : errorFixedCosts}
                open={errorQuery !== null || openSnackBar}
                setOpen={setOpenSnackBar}
                errorAlert
            />
            <CustomSnackBar
                message={"Cadastrado Com Sucesso"}
                open={openSnackBarSuccess}
                setOpen={setOpenSnackBarSuccess}
            />
        </ScreenLayout>
    );
}

export default FixedCosts;
