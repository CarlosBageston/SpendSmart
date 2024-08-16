import { auth } from "@/config/firebase";
import { setLoading, setUser, setUserLogado, setError } from "@/store/reducer/reducer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginModel } from "../model";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/reducer/store";
import { StateSnackBar } from "@/components/customsnackbar";

function useLoginLogic() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openSnackBar, setOpenSnackBar] = useState<StateSnackBar>({error: false, success: false});
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const loading = useSelector((state: RootState) => state.user.loading)
    const userLogado = useSelector((state: RootState) => state.user.userLogado)
    useEffect(() => {
        const checkAuthStatus = async () => {
            if (userLogado) {
                navigate('/home');
            } else {
                setInitialLoad(false);
            }
        };
        checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
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
                setOpenSnackBar(prev => ({...prev, error: true}))
            } else {
                dispatch(setError('Erro, verifique sua conexão e tente novamente.'));
                setOpenSnackBar(prev => ({...prev, error: true}))
            }
        } finally {
            dispatch(setLoading(false));
        }
    }
    return {checkLogin, openSnackBar, setOpenSnackBar, loading, initialLoad}
}

export default useLoginLogic