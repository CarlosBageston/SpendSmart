import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { TextField } from '@mui/material';
import { DateView } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

interface CustomDatePickerProps {
    view: 'date' | 'monthYear' | 'day';
    value: any | null;
    onChange: (date: any) => void;
    label: string;
    disabled?: boolean;
    [key: string]: any;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    view,
    value,
    onChange,
    label,
    disabled,
    ...rest
}) => {
    const getViews = (): DateView[] => {
        if (view === 'monthYear') {
            return ['month', 'year'];
        } else if (view === 'day') {
            return ['day'];
        }
        return ['day', 'month', 'year'];
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DatePicker
                views={getViews()}
                label={label}
                value={value ? dayjs(value) : null}
                onChange={onChange}
                disabled={disabled}
                {...rest}
                slots={{
                    textField: (textFieldProps) => (
                        <TextField
                            {...textFieldProps}
                            variant="standard"
                            {...rest}
                            sx={{
                                width: '80%',
                                '& .MuiInputBase-input': {
                                    color: '#000000',
                                },
                                '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                                    color: '#008f11',
                                },
                                '.css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled ': {
                                    color: 'rgba(0, 0, 0, 0.38)',
                                },
                                '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                    color: '#008f11',
                                },
                                '.css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root ': {
                                    color: '#008f11',
                                },
                                '.css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root.Mui-error': {
                                    color: '#d32f2f'
                                },
                                '.css-v4u5dn-MuiInputBase-root-MuiInput-root:after': {
                                    borderBottom: '2px solid #008f11'
                                }
                            }}
                        />
                    ),
                }}
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
