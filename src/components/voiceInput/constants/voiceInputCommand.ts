
import { OperationPaymentsEnum } from '@/constants/enums/operationPaymentsEnum';
import { getItemsByQuery } from '@/hooks/usefirestorequery';
import { where } from 'firebase/firestore';
import { FixedCostsModel } from '@/page/fixedcosts/model';
import { IncomeTypeEnum } from '@/constants/enums/incomeTypeEnum';
import { TransactionTypeEnum } from '@/constants/enums/transactionTypeEnum';
import { Dispatch, AnyAction } from 'redux';
import { ItemsSelectProps } from '@/page/home/view';

interface RecognitionHandlerParams {
    speak: (message: string, callback?: () => void) => void;
    setStep: (step: number) => void;
    recognition: any;
    setLoading: (loading: boolean) => void;
    setTransactionType?: React.Dispatch<React.SetStateAction<ItemsSelectProps>>
    noUnderstendSpeech?: (numberStep: number, message?: string) => void
    setFieldValue?: (field: string, value: any) => void;
    setOperationPayments?: React.Dispatch<React.SetStateAction<ItemsSelectProps | null>>
    setFixedCosts?: React.Dispatch<React.SetStateAction<FixedCostsModel | null>>
    tableKey?: Record<string, string>;
    dispatch?:  Dispatch<AnyAction>
    valuesPayments?: {
        operationPayments: OperationPaymentsEnum;
    };
    convertToNumber?: (value: string) => number;
    formatNumber?: (value: number) => string;
    recognitionStop?: () => void;
    setIncome?: React.Dispatch<React.SetStateAction<ItemsSelectProps | null>>
    setFieldValueIncome?: (field: string, value: any) => void;
    handleSubmitPayments?: () => void;
    handleSubmitIncome?: () => void;
    setHasError?: React.Dispatch<React.SetStateAction<boolean>>
}

type RecognitionHandler = (result: string, params: RecognitionHandlerParams) => Promise<void>;

const voiceInputCommand: Record<number, RecognitionHandler> = {
    0: async (result, { speak, setStep, recognition, setLoading, setTransactionType, noUnderstendSpeech, setHasError }) => {
        setHasError?.(false);
        if (result.includes('despes')) {
            speak('Qual é o tipo de despesa que você quer pagar, fixa ou variavel?', () => {
                setLoading(true);
                setStep(1);
                recognition.start();
            });
        } else if (result.includes('receit')) {
            setTransactionType?.({ label: 'Receita', value: TransactionTypeEnum.RECEITA });
            speak('É uma Extra ou Fixa ?', () => {
                setLoading(true);
                setStep(5);
                recognition.start();
            });
        } else {
            noUnderstendSpeech?.(0);
        }
    },
    1: async (result, { speak,setHasError, setStep, recognition, setFieldValue, setOperationPayments, setLoading, noUnderstendSpeech }) => {
        setHasError?.(false);
        if (result.includes('fix')) {
            speak('Qual é o nome da despesa?', () => {
                setFieldValue?.('operationPayments', OperationPaymentsEnum.CONTA_FIXA);
                setOperationPayments?.({ label: 'Fixa', value: OperationPaymentsEnum.CONTA_FIXA });
                setStep(2);
                setLoading(true);
                recognition.start();
            });
        } else if (result.includes('variável')) {
            speak('Qual é o nome da despesa?', () => {
                setFieldValue?.('operationPayments', OperationPaymentsEnum.CONTA_VARIAVEL);
                setOperationPayments?.({ label: 'Variável', value: OperationPaymentsEnum.CONTA_VARIAVEL });
                setStep(2);
                setLoading(true);
                recognition.start();
            });
        } else {
            noUnderstendSpeech?.(0);
        }
    },
    2: async (result, { speak,setHasError, setStep, setFixedCosts, setFieldValue, tableKey, dispatch, setLoading, recognition, valuesPayments, noUnderstendSpeech }) => {
        setHasError?.(false);
        if (valuesPayments?.operationPayments === OperationPaymentsEnum.CONTA_FIXA) {
            speak('Aguarde, procurando despesa.', async () => {
                try {
                    const { data } = await getItemsByQuery<FixedCostsModel>(
                        tableKey!.FixedCosts,
                        [where("dsFixedCostsFormatted", "==", result)],
                        dispatch!
                    );
                    if (data.length === 0) {
                        speak('Nenhuma despesa encontrada. Tentar de novo? sim ou não', () => {
                            setStep(4);
                            setLoading(true);
                            recognition.start();
                        });
                        return;
                    }
                    setFixedCosts?.(data[0]);
                    setFieldValue?.('dsPayments', result);
                    speak('Despesa encontrada, Qual é o valor desta despesa?', () => {
                        setStep(3);
                        setLoading(true);
                        recognition.start();
                    });
                } catch (error) {
                    noUnderstendSpeech?.(4, 'Ocorreu um erro ao tentar buscar a despesa fixa. Você gostaria de tentar novamente?');
                }
            });
        } else {
            setFieldValue?.('dsPayments', result);
            speak('Qual é o valor desta despesa?', () => {
                setStep(3);
                setLoading(true);
                recognition.start();
            });
        }
    },
    3: async (result, { speak, setHasError, setStep, setLoading, recognition, setFieldValue, formatNumber, convertToNumber }) => {
        setHasError?.(false)
        const numericString = result.replace(/[^\d,]/g, '');
        const numericValue = convertToNumber?.(numericString) ?? 0;
        const formattedValue = formatNumber?.(numericValue) ?? '';
        setFieldValue?.('vlPayments', formattedValue);
        speak('Verifique os dados e me diga se posso salvar, sim ou não ?', () => {
            setStep(7);
            setLoading(true);
            recognition.start();
        });
    },
    4: async (result, { speak, setStep, setHasError, recognition, setLoading, recognitionStop }) => {
        setHasError?.(false)
        if (result.includes('sim')) {
            speak('Ok, vamos tentar novamente', () => {
                setStep(1);
                setLoading(true);
                recognition.start();
            });
        } else {
            speak('Operação finalizada.', () => {
                recognitionStop?.();
            });
        }
    },
    5: async (result, { speak, setHasError, setStep, recognition, setLoading, setIncome, setFieldValueIncome, noUnderstendSpeech }) => {
        setHasError?.(false)
        if (result.includes('fix')) {
            setIncome?.({ label: 'Renda Fixa', value: IncomeTypeEnum.FIXED_INCOME });
            setFieldValueIncome?.('stIncome', IncomeTypeEnum.FIXED_INCOME);
            speak('Qual foi o valor Recebido ?', () => {
                setStep(6);
                setLoading(true);
                recognition.start();
            });
        } else if (result.includes('xtr')) {
            setIncome?.({ label: 'Renda Extra', value: IncomeTypeEnum.ADDITIONAL_INCOME });
            setFieldValueIncome?.('stIncome', IncomeTypeEnum.ADDITIONAL_INCOME);
            speak('Qual foi o valor Recebido ?', () => {
                setStep(6);
                setLoading(true);
                recognition.start();
            });
        } else {
            noUnderstendSpeech?.(5);
        }
    },
    6: async (result, { speak, setHasError, convertToNumber, formatNumber, setFieldValueIncome, setStep, setLoading, recognition }) => {
        setHasError?.(false)
        const numericString = result.replace(/[^\d,]/g, '');
        const numericValue = convertToNumber?.(numericString) ?? 0;
        const formattedValue = formatNumber?.(numericValue) ?? '';
        setFieldValueIncome?.('vlIncome', formattedValue);
        speak('Verifique os dados e me diga se posso salvar, sim ou não ?', () => {
            setStep(8);
            setLoading(true);
            recognition.start();
        });
    },
    7: async (result, { speak, setHasError, handleSubmitPayments, recognitionStop, setOperationPayments, setFixedCosts, noUnderstendSpeech }) => {
        setHasError?.(false)
        if (result.includes('sim')) {
            speak('Ok, salvando dados');
            handleSubmitPayments?.();
            setOperationPayments?.(null);
            setFixedCosts?.(null);
            recognitionStop?.();
        } else if (result.includes('não')) {
            noUnderstendSpeech?.(1, 'Ok, vamos refazer. é uma despesa fixa ou variavel ?');
        }else {
            noUnderstendSpeech?.(7);
        }
    },
    8: async (result, { speak, setHasError, handleSubmitIncome, recognitionStop, setIncome, setTransactionType, noUnderstendSpeech  }) => {
        setHasError?.(false)
        if (result.includes('sim')) {
            speak('Ok, salvando dados');
            handleSubmitIncome?.();
            setIncome?.(null);
            setTransactionType?.({ label: 'Despesas', value: TransactionTypeEnum.DESPESA });
            recognitionStop?.();
        } else if (result.includes('não')) {
            noUnderstendSpeech?.(5, 'Ok, vamos refazer. é uma Receita Extra ou Fixa ?');
        }else {
            noUnderstendSpeech?.(8);
        }
    }
};

export default voiceInputCommand;
