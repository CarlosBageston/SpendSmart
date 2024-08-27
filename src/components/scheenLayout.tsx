import React from 'react';
import styled from 'styled-components';
import CustomButton from './custombutton';
import Footer from '@/page/footer/view';
import { RiArrowLeftLine } from "react-icons/ri";

import GridItem from './griditem';
import GridContainer from './gridcontainer';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface ScreenProps {
    title?: string;
    children: React.ReactNode;
    childrenTitle?: React.ReactNode;
    styleHeader?: React.CSSProperties;
    styleContent?: React.CSSProperties;
    buttonTitle?: string;
    buttonHref?: string;
    showButton?: boolean;
    onClickButton?: (() => void);
    typeButton?: 'Button' | 'Link',
    showFooter?: boolean,
    loadingButton?: boolean
    disabledButton?: boolean
    paddingButton?: string;
    showIcons?: boolean
}

const ScreenLayout = ({
    title,
    children,
    styleHeader,
    styleContent,
    childrenTitle,
    buttonHref,
    buttonTitle,
    showButton = true,
    showFooter = true,
    loadingButton,
    disabledButton,
    typeButton = 'Button',
    paddingButton,
    onClickButton,
    showIcons = true
}: ScreenProps) => {
    const navigate = useNavigate();
    return (
        <Container>
            <HeaderWrapper>
                <Header style={styleHeader}>
                    {title ? (
                        <GridContainer>
                            <GridItem paddingLeftMuiGrid='70px' paddingRight={'35px'}>
                                {showIcons && <RiArrowLeftLine size={35} color='#f1f1f1' onClick={() => navigate(-1)} />}
                                <Title>{title}</Title>
                                {showIcons && <IconContainer onClick={() => navigate('/notification')}>
                                    <NotificationIcon size={30} />
                                </IconContainer>}
                            </GridItem>
                        </GridContainer>
                    ) : (
                        childrenTitle
                    )}
                </Header>
            </HeaderWrapper>

            <Content style={styleContent}>
                {children}
            </Content>
            {showButton && (
                <FooterLayout padding={paddingButton}>
                    <CustomButton disabled={disabledButton} href={buttonHref ?? ''} title={buttonTitle ?? ''} onClick={onClickButton} type={typeButton} loading={loadingButton} />
                </FooterLayout>
            )}
            {showFooter ? (
                <Footer />
            ) : (
                <GridFooterEmpty />
            )}
        </Container>
    );
};
export const IconContainer = styled.div<{ widthIcon?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.widthIcon ? props.widthIcon : '45px'};
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.theme.paletteColor.lightGreen};
    cursor: pointer;
`;

export const NotificationIcon = styled(IoIosNotificationsOutline)`
    color: ${({ theme }) => theme.paletteColor.darkGreen};
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
        color: ${({ theme }) => theme.paletteColor.primaryGreen};
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #00D09E;
    min-height: 100vh;
`;

const HeaderWrapper = styled.div`
    background-color: #00D09E;
    padding-bottom: 10px;
    width: 100%;
`;

const Header = styled.div`
    background-color: #00D09E;
    height: 125px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: #093030;
    text-align: center;
    width: 100%;
    padding-top: 5px;
`;

const Content = styled.div`
    flex-grow: 1;
    background-color: #fff;
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FooterLayout = styled.div<{ padding?: string }>`
    padding: ${props => props.padding ? props.padding : '30px'};
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`;
const GridFooterEmpty = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 1000;
    height: 3rem;
`;

export default ScreenLayout;
