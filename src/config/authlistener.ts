import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { setUser, setUserLogado } from '@/store/reducer/reducer';
import store from '@/store/reducer/store'; 

export const listenToAuthState = (callback: () => void) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            store.dispatch(setUser({
                uid: user.uid,
                email: user.email || '',
            }));
            store.dispatch(setUserLogado(true));
        } else {
            store.dispatch(setUser(null));
            store.dispatch(setUserLogado(false));
        }
        callback();
    });
};
