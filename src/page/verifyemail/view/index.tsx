import { Typography } from '@mui/material';
import ScreenLayout from '@/components/scheenLayout';
import GridContainer from '@/components/gridcontainer';
import CustomButton from '@/components/custombutton';
import GridItem from '@/components/griditem';
import CustomSnackBar from '@/components/customsnackbar';
import useVerifiEmailLogic from '../logic';

function VerifyEmail() {
    const { isButtonDisabled, open, resendVerificationEmail, timeLeft, setOpen } = useVerifiEmailLogic();

    return (
        <ScreenLayout title='Verificar E-mail' showButton={false} showFooter={false}>
            <GridContainer>
                <GridItem>
                    <Typography variant="h5" textAlign={'center'}>
                        Um email de verificação foi enviado para seu endereço. Verifique sua caixa de entrada e siga as instruções para confirmar seu email.
                    </Typography>
                </GridItem>
                <GridItem>
                    <CustomButton
                        buttonStyle={{
                            width: '75%',
                            height: '3rem',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                        title={isButtonDisabled ? `Reenviar Email de Verificação (${timeLeft}s)` : 'Reenviar Email de Verificação'}
                        type='Button'
                        onClick={resendVerificationEmail}
                        disabled={isButtonDisabled}
                    />
                </GridItem>
                <GridItem>
                    <CustomButton
                        buttonStyle={{
                            width: '75%',
                            height: '3rem',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                        title='Voltar para Login'
                        type='Link'
                        href='/'
                    />
                </GridItem>
                <CustomSnackBar message='Reenviado E-mail' open={open} setOpen={setOpen} />
            </GridContainer>
        </ScreenLayout>
    );
}

export default VerifyEmail;
