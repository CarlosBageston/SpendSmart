import CustomInput from "@/components/custominput";
import GridContainer from "@/components/gridcontainer";
import GridItem from "@/components/griditem";
import ScreenLayout from "@/components/scheenLayout";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { SignupModel } from '@/page/signup/model';
import { State } from "@/store/reducer/reducer";
import { useSelector } from "react-redux";
import CustomSnackBar from "@/components/customsnackbar";
import { useSignupLogic } from "../logic";



function Signup() {
    const errorSignup = useSelector((state: State) => state.user.error);
    const { signupUser, openError, setOpenError, loading } = useSignupLogic();


    const initialValues: SignupModel = {
        name: '',
        email: '',
        telefone: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Nome completo é obrigatório')
            .min(2, 'Nome muito curto'),
        email: Yup.string()
            .required('E-mail é obrigatório')
            .email('E-mail inválido'),
        telefone: Yup.string()
            .required('Telefone é obrigatório')
            .matches(/^\d+$/, 'Telefone deve conter apenas números')
            .min(10, 'Telefone deve ter no mínimo 10 dígitos'),
        password: Yup.string()
            .required('Senha é obrigatória')
            .min(8, 'Senha deve ter no mínimo 8 caracteres'),
        confirmPassword: Yup.string()
            .required('Confirmação de senha é obrigatória')
            .oneOf([Yup.ref('password')], 'As senhas devem coincidir'),
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik<SignupModel>({
        initialValues,
        validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            await signupUser(values)
        },
    });

    return (
        <ScreenLayout
            buttonTitle="Cadastrar"
            title="Crie Sua conta Spend Smart"
            onClickButton={handleSubmit}
            showFooter={false}
            loadingButton={loading}
        >
            <GridContainer>
                <GridItem input>
                    <CustomInput
                        label="Nome Completo"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />
                </GridItem>
                <GridItem input>
                    <CustomInput
                        label="E-mail"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                </GridItem>
                <GridItem input>
                    <CustomInput
                        label="Telefone"
                        name="telefone"
                        value={values.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.telefone && Boolean(errors.telefone)}
                        helperText={touched.telefone && errors.telefone}
                    />
                </GridItem>
                <GridItem input>
                    <CustomInput
                        label="Senha"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        secureTextEntry
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </GridItem>
                <GridItem input>
                    <CustomInput
                        label="Confirmar senha"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        secureTextEntry
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                </GridItem>
                <CustomSnackBar message={errorSignup} open={openError} setOpen={setOpenError} errorAlert />
            </GridContainer>
        </ScreenLayout>
    )
}

export default Signup