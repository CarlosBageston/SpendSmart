import { OperationPaymentsEnum } from '@enums/operationPaymentsEnum';
import GridItem from '@/components/griditem';
import CustomInput from '@/components/custominput';
import CustomSelect from '@/components/customselect';
import { FixedCostsModel } from '@/page/fixedcosts/model';
import { ItemsSelectProps } from '.';
import { useState } from 'react';
import CustomDatePicker from '@/components/customdatepicker';
import { FormikErrors, FormikHandlers, FormikTouched } from 'formik';
import { FormPaymentsModel } from '../model/formPaymentsModel';
import useFormatCurrency from '@/hooks/formatCurrency';

interface FormContentProps {
    fixedCosts: FixedCostsModel | null;
    dataTable: FixedCostsModel[];
    setFixedCosts: React.Dispatch<React.SetStateAction<FixedCostsModel | null>>
    values: FormPaymentsModel;
    handleBlur: (field: string) => void;
    handleChange: FormikHandlers['handleChange'];
    touched: FormikTouched<FormPaymentsModel>;
    errors: FormikErrors<FormPaymentsModel>
    setFieldValue: (field: string, value: any) => void;
}

function FormPayments({
    dataTable,
    fixedCosts,
    setFixedCosts,
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
    setFieldValue
}: FormContentProps) {
    const [operationPayments, setOperationPayments] = useState<ItemsSelectProps>({ label: 'Variável', value: OperationPaymentsEnum.CONTA_VARIAVEL });
    const { formatCurrencyRealTime } = useFormatCurrency()
    const operationPaymentsList: ItemsSelectProps[] = [
        { label: 'Fixa', value: OperationPaymentsEnum.CONTA_FIXA },
        { label: 'Variável', value: OperationPaymentsEnum.CONTA_VARIAVEL }
    ];

    return (
        <>
            <GridItem paddingTopMuiGrid='15px'>
                <CustomSelect<ItemsSelectProps>
                    selectedValue={operationPayments}
                    onValueChange={(item) => {
                        setOperationPayments(item)
                        setFieldValue('operationPayments', item.value)
                    }}
                    items={operationPaymentsList}
                    getLabel={(item) => item.label}
                    getValue={(item) => item.value ?? ''}
                    placeholder='Selecione...'
                />
            </GridItem>
            {operationPayments.value === OperationPaymentsEnum.CONTA_VARIAVEL ? (
                <>
                    <GridItem input>
                        <CustomInput
                            name='dsPayments'
                            label='Descrição'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dsPayments}
                            error={touched.dsPayments && Boolean(errors.dsPayments)}
                            helperText={touched.dsPayments && errors.dsPayments}
                        />
                    </GridItem>
                    <GridItem input>
                        <CustomDatePicker
                            label='Data do Pagamento'
                            view={'date'}
                            name='dtPayments'
                            onChange={handleChange}
                            error={touched.dtPayments && Boolean(errors.dtPayments)}
                            helperText={touched.dtPayments && errors.dtPayments}
                            value={values.dtPayments}
                        />
                    </GridItem>
                    <GridItem input>
                        <CustomInput
                            label='Valor Pago'
                            onChange={(e) => setFieldValue('vlPayments', formatCurrencyRealTime(e.target.value))}
                            onBlur={handleBlur}
                            value={values.vlPayments}
                            error={touched.vlPayments && Boolean(errors.vlPayments)}
                            helperText={touched.vlPayments && errors.vlPayments}
                            name='vlPayments'
                        />
                    </GridItem>
                </>
            ) : (
                <>
                    <GridItem paddingTopMuiGrid='15px'>
                        <CustomSelect<FixedCostsModel>
                            selectedValue={fixedCosts}
                            onValueChange={(item) => setFixedCosts(item)}
                            items={dataTable}
                            getLabel={(item) => item.dsFixedCosts}
                            getValue={(item) => item.id ?? ''}
                            placeholder='Selecione...'
                        />
                    </GridItem>
                    <GridItem input paddingTopMuiGrid='15px'>
                        <CustomInput
                            label='Dia do Vencimento'
                            onChange={() => { }}
                            value={fixedCosts ? fixedCosts.dayVencimento.substring(0, 2) : ''}
                            name='dayVencimento'
                            disabled
                        />
                    </GridItem>
                    <GridItem input paddingTopMuiGrid='15px'>
                        <CustomDatePicker
                            // key={`date-${key}`}
                            label='Data do Pagamento'
                            view={'date'}
                            name='dtPayments'
                            onChange={handleChange}
                            error={touched.dtPayments && Boolean(errors.dtPayments)}
                            helperText={touched.dtPayments && errors.dtPayments}
                            value={values.dtPayments}
                        />
                    </GridItem>
                    <GridItem input paddingTopMuiGrid='15px'>
                        <CustomInput
                            label='Valor Pago'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.vlPayments}
                            error={touched.vlPayments && Boolean(errors.vlPayments)}
                            helperText={touched.vlPayments && errors.vlPayments}
                            name='vlPayments'
                        />
                    </GridItem>
                </>
            )}
        </>
    );
}

export default FormPayments;
