// src/hooks/auth/privateroutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '@/store/reducer/reducer';

const PrivateRoute = () => {
    const isAuthenticated = useSelector((store: State) => store.user.userLogado)
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;
