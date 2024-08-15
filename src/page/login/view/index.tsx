import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import ScreenLayout from '@/components/scheenLayout';
import CustomInput from '@/components/custominput';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';
import CustomButton from '@/components/custombutton';
import { State } from '@/store/reducer/reducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginModel } from '@/page/login/model';
import CustomSnackBar from '@/components/customsnackbar';
import useLoginLogic from '../logic';


function Login() {
    const errorLogin = useSelector((state: State) => state.user.error);
    const { checkLogin, openError, setOpenError, loading } = useLoginLogic();

    // Validação do formulário com Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('E-mail é obrigatório')
            .email('E-mail inválido'),
        password: Yup.string()
            .required('Senha é obrigatória')
            .min(8, 'Senha deve ter no mínimo 8 caracteres'),
    });

    // Configuração do Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        } as LoginModel,
        validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: checkLogin,
    });


    return (
        <>
            <ScreenLayout
                showFooter={false}
                title="Faça login em sua conta Spend Smart"
                typeButton='Button'
                onClickButton={() => { formik.handleSubmit() }}
                buttonTitle='Entrar'
                loadingButton={loading}
            >
                <GridContainer>
                    <GridItem>
                        <Typography variant="h5">
                            Faça Login em sua conta Spend Smart
                        </Typography>
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            keyboardType="email"
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            label="Senha"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            secureTextEntry
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </GridItem>
                    <GridItem direction='column' alignItems={'center'}>
                        <Typography variant='subtitle2' fontWeight={'bold'}>
                            Não possui cadastro?
                        </Typography>
                        <CustomButton
                            buttonStyle={{
                                width: '35%',
                                height: '2rem',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                            disabled={loading}
                            title='Criar Conta'
                            type='Link'
                            href='/signup'
                        />
                    </GridItem>
                    <GridItem>
                        <CustomSnackBar message={errorLogin} open={openError} setOpen={setOpenError} errorAlert />
                    </GridItem>
                </GridContainer>
            </ScreenLayout>
        </>
    );
}

export default Login;
