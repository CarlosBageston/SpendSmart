// src/routes/Router.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/page/login/view';
import HomeScreen from '@/page/home/view';
import FixedCosts from '@/page/fixedcosts/view';
import Signup from '@/page/signup/view';
import VerifyEmail from '@/page/verifyemail/view';
import PrivateRoute from '@/hooks/auth/privateroutes';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/fixed-costs" element={<FixedCosts />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
