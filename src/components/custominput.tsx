import React from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';

interface CustomInputProps {
    label: string;
    value: string | number | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    keyboardType?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    secureTextEntry?: boolean;
    style?: React.CSSProperties;
    [key: string]: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    value,
    onChange,
    keyboardType = 'default',
    autoCapitalize = 'none',
    secureTextEntry = false,
    style,
    ...rest
}) => {
    return (
        <StyledTextField
            label={label}
            value={value}
            onChange={onChange}
            type={secureTextEntry ? 'password' : keyboardType}
            autoCapitalize={autoCapitalize}
            variant="standard"
            style={style ? style : { width: '80%', maxWidth: '500px' }}
            InputLabelProps={{
                shrink: value !== undefined && value !== null && value !== '',
            }}
            {...rest}
        />
    );
};

const StyledTextField = styled(TextField)`

    .MuiOutlinedInput-root {
        border-radius: 10px;
    }

    .MuiInputLabel-root {
        color: ${props => props.theme.paletteColor.primaryGreen};
    }
    .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
        color: ${props => props.theme.paletteColor.primaryGreen};
    }

    .MuiOutlinedInput-notchedOutline {
        border-color: ${props => props.theme.paletteColor.lightGreen};
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color:  ${props => props.theme.paletteColor.primaryGreen};
    }

    .MuiOutlinedInput-input {
        background-color: ${props => props.theme.paletteColor.lightGreen};
    }
    .css-v4u5dn-MuiInputBase-root-MuiInput-root:after {
        border-bottom: 2px solid  ${props => props.theme.paletteColor.primaryGreen};
    }
`;

export default CustomInput;
