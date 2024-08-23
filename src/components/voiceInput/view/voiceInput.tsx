import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UseTableKeys } from '@/hooks/usetablename';
import { ItemsSelectProps } from '@/page/home/view';
import { FixedCostsModel } from '@/page/fixedcosts/model';
import styled, { css, keyframes } from 'styled-components';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import { FormPaymentsModel } from '@/page/home/model/formPaymentsModel';
import { errorMessages } from '../constants/errorMessages';
import voiceInputCommand from '../constants/voiceInputCommand';
import useFormatCurrency from '@/hooks/formatCurrency';
import { FaAssistiveListeningSystems } from "react-icons/fa";



interface VoiceInputProps {
    setFieldValuePayments: (field: string, value: any) => void;
    setFieldValueIncome: (field: string, value: any) => void;
    setOperationPayments: React.Dispatch<React.SetStateAction<ItemsSelectProps | null>>
    setFixedCosts: React.Dispatch<React.SetStateAction<FixedCostsModel | null>>
    valuesPayments: FormPaymentsModel;
    setIncome: React.Dispatch<React.SetStateAction<ItemsSelectProps | null>>
    setTransactionType: React.Dispatch<React.SetStateAction<ItemsSelectProps>>
    handleSubmitPayments: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
    handleSubmitIncome: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

function VoiceInput({
    setFieldValuePayments: setFieldValue,
    setOperationPayments,
    setFixedCosts,
    valuesPayments: valuesPayments,
    setIncome,
    setTransactionType,
    setFieldValueIncome,
    handleSubmitPayments,
    handleSubmitIncome
}: VoiceInputProps) {
    const [isListening, setIsListening] = useState(false);
    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const tableKey = UseTableKeys();
    const dispatch = useDispatch();
    const [expand, setExpand] = useState(true);
    const { formatNumber, convertToNumber } = useFormatCurrency();

    useEffect(() => {
        const timer = setTimeout(() => {
            setExpand(false);
        }, 3000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initializeRecognition = () => {
        try {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const SpeechSynthesis = window.speechSynthesis;

            if (!SpeechRecognition || !SpeechSynthesis) {
                speak('A funcionalidade de reconhecimento de voz não está disponível neste navegador.');
                return null;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = 'pt-BR';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            const recognitionStop = () => {
                setIsListening(false);
                setStep(0);
                recognition.stop();
                setLoading(false);
            }
            const noUnderstendSpeech = (numberStep: number, message?: string) => {
                speak(message ? message : 'Desculpa, não entendi, poderia repetir ?', () => {
                    setStep(numberStep);
                    setLoading(true);
                    recognition.start();
                });
            }
            recognition.onresult = async (event: any) => {
                try {
                    setLoading(false);
                    const result = event.results[0][0].transcript.toLowerCase() as string;
                    console.log(result);
                    console.log(step);

                    if (result.includes('cancelar') || result.includes('parar')) {
                        speak('Operação cancelada.');
                        recognitionStop()
                        return;
                    }
                    startCommand(result, recognition, recognitionStop, noUnderstendSpeech)
                } catch (error) {
                    console.error('Erro ao processar o resultado do reconhecimento:', error);
                    speak('Houve um erro ao processar sua fala. Tente novamente.');
                    setLoading(false);
                }
            };

            recognition.onerror = (event: any) => {
                console.error('Erro ao reconhecer fala:', event.error);
                speak(errorMessages[event.error]?.speak || 'Houve um erro inesperado.');
                setLoading(false);
            };

            return recognition;
        } catch (error) {
            console.error('Erro ao inicializar reconhecimento de fala:', error);
            speak('Ocorreu um erro ao inicializar o reconhecimento de fala.');
            setLoading(false);
            return null;
        }
    };

    useEffect(() => {
        let recognition: any = null;

        if (isListening) {
            recognition = initializeRecognition();
            if (recognition) {
                if (step === 0) {
                    speak('Olá, pretende adicionar uma receita ou uma despesa ?', () => {
                        setLoading(true);
                        recognition.start();
                    });
                } else {
                    try {
                        setLoading(true);
                        recognition.start();
                    } catch (error) {
                        console.error('Erro ao iniciar reconhecimento de fala:', error);
                        speak('Ocorreu um erro ao iniciar o reconhecimento de fala.');
                        setLoading(false);
                    }
                }
            }
        } else {
            if (recognition) {
                try {
                    recognition.stop();
                } catch (error) {
                    console.error('Erro ao parar reconhecimento de fala:', error);
                }
            }
        }

        return () => {
            if (recognition) {
                try {
                    recognition.stop();
                } catch (error) {
                    console.error('Erro ao parar reconhecimento de fala:', error);
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListening, step]);

    const speak = (text: string, callback?: () => void) => {
        const SpeechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = SpeechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.lang === 'pt-BR' && voice.name.includes('Google português do Brasil')) || null;
        utterance.rate = 1.2;
        utterance.pitch = 0.8;
        utterance.onend = () => {
            if (callback) callback();
        };
        SpeechSynthesis.speak(utterance);
    };

    const startCommand = async (
        result: string,
        recognition: any,
        recognitionStop: () => void,
        noUnderstendSpeech: (numberStep: number, message?: string) => void
    ) => {
        const handler = voiceInputCommand[step];
        if (handler) {
            await handler(result, {
                speak,
                setStep,
                recognition,
                setLoading,
                setFieldValue,
                setOperationPayments,
                setFixedCosts,
                tableKey,
                dispatch,
                valuesPayments,
                formatNumber,
                convertToNumber,
                recognitionStop,
                setIncome,
                setTransactionType,
                setFieldValueIncome,
                handleSubmitPayments,
                handleSubmitIncome,
                noUnderstendSpeech
            });
        } else {
            speak('Comando não reconhecido. Tente novamente.', () => {
                setStep(0);
                setLoading(false);
                recognition.start();
            });
        }
    }

    return (
        <>
            <IconWrapper expand={expand} onClick={() => setIsListening(!isListening)}>
                {loading ? (
                    <StyledIconListening />
                ) : (
                    <StyledIconSpeaking />
                )}
                {expand && <Tooltip expand={expand}>Fale com o assistente</Tooltip>}
            </IconWrapper>
        </>
    );
}

export default VoiceInput

const expands = keyframes`
  0% {
    width: 55px;
    height: 55px;
  }
  100% {
    width: 220px;
    height: 55px;
  }
`;

const shrink = keyframes`
  0% {
    width: 220px;
    height: 55px;
  }
  100% {
    width: 55px;
    height: 55px;
  }
`;

const StyledIconSpeaking = styled(SpatialAudioOffIcon)`
    color: #ffffff;
    cursor: pointer;
    &:hover {
        color: #ececec;
    }
`;
const StyledIconListening = styled(FaAssistiveListeningSystems)`
    color: #ffffff;
    cursor: pointer;
    width: 27px;
    height: 27px;
    &:hover {
        color: #ececec;
    }
`;

const Tooltip = styled.div<{ expand: boolean }>`
    color: #ffffff;
    margin-left: 1rem;
    white-space: nowrap;
    padding-top: 1rem;
    ${({ expand }) =>
        expand
            ? css`
          animation: ${expands} 0.8s forwards;
        `
            : css`
          animation: ${shrink} 0.8s forwards;
        `}
`;

const IconWrapper = styled.div<{ expand: boolean }>`
    position: fixed;
    bottom: 8rem;
    right: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 20px;
    background-color: ${props => props.theme.paletteColor.secundGreen};
    ${({ expand }) =>
        expand
            ? css`
          animation: ${expands} 0.8s forwards;
        `
            : css`
          animation: ${shrink} 0.8s forwards;
        `}
`;
