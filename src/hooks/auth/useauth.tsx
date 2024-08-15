// hooks/useauth.tsx
import { useDispatch } from 'react-redux';
import { setUser, setUserLogado } from '@/store/reducer/reducer';
import { useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function UseAuth() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email || '',
                }));
                dispatch(setUserLogado(true));
                setIsAuthenticated(true);
            } else {
                dispatch(setUser(null));
                dispatch(setUserLogado(false));
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        });
    }, [dispatch]);

    return { isLoading, isAuthenticated };
}
export default UseAuth
