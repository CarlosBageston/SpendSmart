import { auth } from "@/config/firebase";
import { setLoading, setUser, setUserLogado, setError, State } from "@/store/reducer/reducer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginModel } from "../model";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function useLoginLogic() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openError, setOpenError] = useState<boolean>(false);
    const loading = useSelector((state: State) => state.user.loading)

    async function checkLogin(values: LoginModel) {
        try {
            dispatch(setLoading(true));
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                navigate('/verify-email');
                return;
            }
            dispatch(setUser({
                uid: user.uid,
                email: user.email || '',
            }));
            dispatch(setUserLogado(true));
            dispatch(setError(''));
            navigate('/home');
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError("E-mail ou senha incorreto"));
                setOpenError(true)
            } else {
                dispatch(setError('Erro inesperado'));
                setOpenError(true)
            }
        } finally {
            dispatch(setLoading(false));
        }
    }
    return {checkLogin, openError, setOpenError, loading}
}

export default useLoginLogic