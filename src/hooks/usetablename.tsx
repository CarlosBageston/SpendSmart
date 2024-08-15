// hooks/useTableKeys.ts
import { useSelector } from 'react-redux';
import { State } from '@/store/reducer/reducer';

export const UseTableKeys = () => {
    const user = useSelector((state: State) => state.user.user);

    if (user === null) {
        throw new Error("Usuário não autenticado");
    }

    return {
        FixedCosts: `UsersData/${user.uid}/FixedCosts`
    };
};
