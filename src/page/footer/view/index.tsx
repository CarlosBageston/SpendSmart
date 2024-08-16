import { FC } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, MonetizationOn } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UseUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';
import StanderdModal from '@/components/standerdModal';

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.paletteColor.lightGreen};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Footer: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showModal, handleConfirmNavigation, handleCancelNavigation, confirmNavigation } = UseUnsavedChangesWarning();

    const handleNavigate = (route: string) => {
        confirmNavigation(() => navigate(route));
    };

    return (
        <StyledFooter>
            <BottomNavigation value={location.pathname} showLabels>
                <BottomNavigationAction
                    component="button"
                    onClick={() => handleNavigate('/home')}
                    label="Home"
                    value={'/home'}
                    icon={<Home />}
                />
                <BottomNavigationAction
                    component="button"
                    onClick={() => handleNavigate('/fixed-costs')}
                    label="Despesas Fixas"
                    value={'/fixed-costs'}
                    icon={<MonetizationOn />}
                />
            </BottomNavigation>

            {showModal && (
                <StanderdModal
                    open={showModal}
                    onClose={handleCancelNavigation}
                    onConfirm={handleConfirmNavigation}
                    title='Você tem alterações não salvas'
                    message='Gostaria de salvar antes de sair?'
                    labelButtonClose='Cancelar'
                    labelButtonConfirm='Sair e Salvar'
                />
            )}
        </StyledFooter>
    );
};

export default Footer;
