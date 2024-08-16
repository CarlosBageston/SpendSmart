// hooks/useTableKeys.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducer/store';

export const UseTableKeys = () => {
    const user = useSelector((state: RootState) => state.user.user);

    if (user === null) {
        throw new Error("Usuário não autenticado");
    }

    return {
        FixedCosts: `UsersData/${user.uid}/FixedCosts`
    };
};
