// GridContainer.tsx
import React from 'react';
import { Grid, GridProps } from '@mui/material';
import styled from 'styled-components';

interface GridContainerProps extends GridProps {
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    spacing?: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
    className?: string;
}

const GridContainer: React.FC<GridContainerProps> = ({
    direction = 'row',
    alignItems = 'center',
    justifyContent = 'center',
    spacing = 4,
    style,
    className,
    children,
    ...rest
}) => {
    return (
        <StyledGridContainer
            container
            direction={direction}
            alignItems={alignItems}
            justifyContent={justifyContent}
            spacing={spacing}
            style={style}
            className={className}
            {...rest}
        >
            {children}
        </StyledGridContainer>
    );
};

const StyledGridContainer = styled(Grid)`
    width: 100%;
`;

export default GridContainer;
