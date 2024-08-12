import React from 'react';
import { Grid, GridProps } from '@mui/material';
import styled from 'styled-components';

interface GridItemProps extends GridProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
    justifyContent?: 'center' | 'space-around' | 'space-between' | 'space-evenly' | 'flex-end' | 'flex-start' | 'none';
    direction?: 'row' | 'column';
    paddingTopMuiGrid?: string;
}

const GridItem: React.FC<GridItemProps> = ({
    xs = 12,
    sm,
    md,
    lg,
    xl,
    style,
    children,
    justifyContent,
    direction,
    paddingTopMuiGrid,
    ...rest
}) => {
    return (
        <StyledGridItem
            item
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            style={{ ...style, paddingTop: paddingTopMuiGrid }}
            justifyContent={justifyContent}
            direction={direction}
            {...rest}
        >
            {children}
        </StyledGridItem>
    );
};

const StyledGridItem = styled(Grid) <{ justifyContent?: string; direction?: string }>`
    display: flex;
    width: 100%;
    margin-bottom: 16px;
    justify-content: ${props => props.justifyContent || 'center'};
    flex-direction: ${props => props.direction || 'row'};
`;

export default GridItem;
