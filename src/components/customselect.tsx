import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import styled from 'styled-components';

export interface ItemsSelectProps {
    label: string;
    value: string | number;
}

interface CustomSelectProps {
    selectedValue: ItemsSelectProps;
    onValueChange: (itemValue: ItemsSelectProps) => void;
    items: ItemsSelectProps[];
    label?: string;
    style?: React.CSSProperties;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ selectedValue, onValueChange, items, label, style }) => {
    return (
        <FormControlStyled variant="standard">
            {label && <InputLabelStyled>{label}</InputLabelStyled>}
            <StyledSelect
                value={selectedValue.value}
                onChange={(event) => {
                    const selectedItem = items.find(item => String(item.value) === String(event.target.value));
                    if (selectedItem) {
                        onValueChange(selectedItem);
                    }
                }}
                label={label}
                style={style ? style : { width: '100%', maxWidth: '500px' }}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </StyledSelect>
        </FormControlStyled>
    );
};

const FormControlStyled = styled(FormControl)`
    width: 80%;
    .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after {
        border-bottom: 2px solid ${props => props.theme.paletteColor.primaryGreen};
    }
`;

const InputLabelStyled = styled(InputLabel)`
    color: ${props => props.theme.paletteColor.primaryGreen};
`;

const StyledSelect = styled(Select)`
    border-radius: 10px;
    width: 100%;
    .MuiOutlinedInput-notchedOutline {
        border-color: ${props => props.theme.paletteColor.lightGreen};
    }

    &:hover .MuiOutlinedInput-notchedOutline {
        border-color: ${props => props.theme.paletteColor.primaryGreen};
    }

    .MuiSelect-select {
        padding: 10px;
    }
`;

export default CustomSelect;
