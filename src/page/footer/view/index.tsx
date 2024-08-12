import { FC } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, MonetizationOn } from '@mui/icons-material';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

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

    return (
        <StyledFooter>
            <BottomNavigation
                value={useLocation().pathname}
                showLabels
            >
                <BottomNavigationAction
                    component={Link}
                    to='/home'
                    label="Home"
                    value={'/home'}
                    icon={<Home />}
                />
                <BottomNavigationAction
                    component={Link}
                    to='/fixed-costs'
                    value={'/fixed-costs'}
                    label="Despesas Fixas"
                    icon={<MonetizationOn />}

                />
            </BottomNavigation>
        </StyledFooter>
    );
};

export default Footer;
