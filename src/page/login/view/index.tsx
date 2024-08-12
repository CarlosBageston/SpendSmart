import { useState } from 'react';
import { Typography } from '@mui/material';
import ScreenLayout from '@/components/scheenLayout';
import CustomInput from '@/components/custominput';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScreenLayout title="Criar Conta" typeButton='Link' buttonHref='/home' buttonTitle='Entrar'>
            <GridContainer>
                <GridItem>
                    <Typography variant="h5">
                        Faça Login em sua conta Spend Smart
                    </Typography>
                </GridItem>
                <GridItem>
                    <CustomInput
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        keyboardType="email"
                    />
                </GridItem>
                <GridItem>
                    <CustomInput
                        label="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </GridItem>
            </GridContainer>
        </ScreenLayout>
    );
}

export default Login;
