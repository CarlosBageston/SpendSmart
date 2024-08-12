import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CustomButtonProps {
    title: string;
    href?: string;
    onClick?: () => void;
    buttonStyle?: React.CSSProperties;
    colorBackground?: string;
    colorLabel?: string;
    type?: 'Button' | 'Link';
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    href,
    onClick,
    buttonStyle,
    colorBackground,
    colorLabel,
    type = 'Button'
}) => {
    const button = (
        <StyledButton
            onClick={onClick}
            style={buttonStyle}
            background={colorBackground}
            labelColor={colorLabel}
        >
            {title}
        </StyledButton>
    );

    return type === 'Link' && href ? (
        <StyledLink to={href}>{button}</StyledLink>
    ) : (
        button
    );
};

const StyledButton = styled(Button) <{ background?: string; labelColor?: string }>`
    && {
        background-color: ${(props) => props.background ? props.background : props.theme.paletteColor.secundGreen};
        color: ${(props) => props.labelColor ? props.labelColor : props.theme.paletteColor.darkGreen};
        font-size: 18px;
        width: 80%;
        border-radius: 20px;
        &:hover {
            background-color: ${(props) => props.background ? props.background : props.theme.paletteColor.secundGreen};
            opacity: 0.9;
        }
    }
`;

const StyledLink = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default CustomButton;
