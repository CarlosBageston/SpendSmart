
import Login from '@/page/login/view';
import HomeScreen from '@/page/home/view';
import FixedCosts from '@/page/fixedcosts/view';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<HomeScreen />} />
                <Route path='/fixedcosts' element={<FixedCosts />} />
            </Routes>
        </BrowserRouter>
    )
}