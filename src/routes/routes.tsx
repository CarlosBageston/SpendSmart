
import Login from '@/page/login/view';
import HomeScreen from '@/page/home/view';
import FixedCosts from '@/page/fixedcosts/view';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '@/page/signup/view';
import VerifyEmail from '@/page/verifyemail/view';

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/home' element={<HomeScreen />} />
                <Route path='/fixed-costs' element={<FixedCosts />} />
                <Route path='/verify-email' element={<VerifyEmail />} />
            </Routes>
        </BrowserRouter>
    )
}