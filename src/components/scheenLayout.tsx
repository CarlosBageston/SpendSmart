import React from 'react';
import styled from 'styled-components';
import CustomButton from './custombutton';
import Footer from '@/page/footer/view';

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
    typeButton?: 'Button' | 'Link'
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
    typeButton = 'Button',
    onClickButton
}: ScreenProps) => {
    return (
        <Container>
            <HeaderWrapper>
                <Header style={styleHeader}>
                    {title ? (
                        <Title>{title}</Title>
                    ) : (
                        childrenTitle
                    )}
                </Header>
            </HeaderWrapper>

            <Content style={styleContent}>
                {children}
            </Content>
            {showButton && (
                <FooterLayout>
                    <CustomButton href={buttonHref ?? ''} title={buttonTitle ?? ''} onClick={onClickButton} type={typeButton} />
                </FooterLayout>
            )}
            <Footer />
        </Container>
    );
};

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
    font-size: 24px;
    font-weight: bold;
    color: #093030;
    text-align: center;
    width: 100%;
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

const FooterLayout = styled.div`
    padding: 30px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`;

export default ScreenLayout;
