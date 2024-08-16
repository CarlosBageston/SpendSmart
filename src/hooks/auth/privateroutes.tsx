// src/hooks/auth/privateroutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducer/store';

const PrivateRoute = () => {
    const isAuthenticated = useSelector((store: RootState) => store.user.userLogado)
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;
