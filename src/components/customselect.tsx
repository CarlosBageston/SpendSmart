import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, FormHelperText } from '@mui/material';
import styled from 'styled-components';

interface CustomSelectProps<T> {
    label?: string;
    variant?: 'standard' | 'filled' | 'outlined';
    name?: string;
    placeholder?: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    error?: boolean; // Adicionado para tratamento de erro
    helperText?: string; // Adicionado para exibir mensagem de erro
    selectedValue: T | null;
    items: T[];
    getLabel: (option: T) => string;
    getValue: (option: T) => string | number;
    onValueChange: (event: T) => void;
    style?: React.CSSProperties;
    [key: string]: any;
}

const CustomSelect = <T,>({
    label,
    variant = 'standard',
    name,
    onBlur,
    error = false,
    helperText = '', // Inicializado como uma string vazia
    selectedValue,
    items,
    getLabel,
    getValue,
    onValueChange,
    style,
    ...rest
}: CustomSelectProps<T>) => {

    const handleChange = (event: SelectChangeEvent<any>) => {
        const selectedOption = items.find(opt => getValue(opt) === event.target.value);
        if (selectedOption) {
            onValueChange(selectedOption);
        }
    };

    return (
        <FormControlStyled variant={variant} error={error}>
            {label && <InputLabelStyled>{label}</InputLabelStyled>}
            <StyledSelect
                label={label}
                value={selectedValue ? getValue(selectedValue) : ''}
                onChange={handleChange}
                onBlur={onBlur}
                displayEmpty
                style={style}
                inputProps={{ name }}
                {...rest}
            >
                {items.map((option, index) => (
                    <MenuItem key={index} value={getValue(option)}>
                        {getLabel(option)}
                    </MenuItem>
                ))}
            </StyledSelect>
            {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControlStyled>
    );
};

const FormControlStyled = styled(FormControl)`
    width: 80%;
`;

const InputLabelStyled = styled(InputLabel)`
    color: ${props => props.theme.paletteColor.primaryGreen};
`;

const StyledSelect = styled(Select)`
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
