import { db, auth } from "@/config/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, State } from "@/store/reducer/reducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupModel } from "../model";

/**
 * Hook que contém a lógica para o cadastro de usuário.
 * @returns Um objeto contendo a função de cadastro (`signupUser`), o estado de erro (`openError`) e a função para definir o estado de erro (`setOpenError`).
 */
export const useSignupLogic = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openError, setOpenError] = useState<boolean>(false);
    const loading = useSelector((state: State) => state.user.loading)

    /**
     * Verifica se o e-mail já está registrado na coleção de usuários do Firestore.
     * @param email - O e-mail a ser verificado.
     * @returns Um valor booleano indicando se o e-mail já está registrado.
     */
    const checkIfEmailExists = async (email: string): Promise<boolean> => {
        const q = query(collection(db, 'Users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size > 0;
    };

    /**
     * Cria uma nova conta de usuário no Firebase Authentication.
     * @param email - O e-mail do usuário.
     * @param password - A senha do usuário.
     * @returns O objeto `User` criado.
     */
    const createUserAccount = async (email: string, password: string): Promise<User> => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    };

    /**
     * Adiciona os dados do usuário à coleção de usuários do Firestore.
     * @param user - O objeto `User` do Firebase Authentication.
     * @param values - Os dados do usuário, como nome e telefone.
     */
    const saveUserInFirestore = async (user: User, values: SignupModel): Promise<void> => {
        const newValues = {
            email: user.email,
            uid: user.uid,
            telefone: values.telefone,
            name: values.name,
            createdAt: new Date(),
        };
        await addDoc(collection(db, 'Users'), newValues);
    };

    /**
     * Envia um e-mail de verificação para o usuário.
     * @param user - O objeto `User` do Firebase Authentication.
     */
    const sendVerificationEmail = async (user: User): Promise<void> => {
        await sendEmailVerification(user);
    };

    /**
     * Função principal para o cadastro de um novo usuário.
     * @param values - Os dados do usuário, como e-mail, senha, nome e telefone.
     */
    const signupUser = async (values: SignupModel): Promise<void> => {
        dispatch(setLoading(true))
        try {
            const emailExists = await checkIfEmailExists(values.email);
            if (emailExists) {
                dispatch(setError("Já existe um usuário com esse e-mail"));
                setOpenError(true);
                return;
            }

            const user = await createUserAccount(values.email, values.password);
            await saveUserInFirestore(user, values);
            await sendVerificationEmail(user);

            navigate('/verify-email');
        } catch (error) {
            dispatch(setError("Erro ao criar conta, tente novamente"));
            setOpenError(true);
        } finally {
            dispatch(setLoading(false))
        }
    };

    return { signupUser, openError, setOpenError, loading };
};
