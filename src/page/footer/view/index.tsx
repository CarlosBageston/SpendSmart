import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, MonetizationOn } from '@mui/icons-material';
import { StyledFooter } from '@/page/footer/style';
import StanderdModal from '@/components/standerdModal';
import useFooterLogic from '../logic';


function Footer() {

    const { handleCancelNavigation, handleConfirmNavigation, handleNavigate, location, showModal } = useFooterLogic();

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
}

export default Footer;
