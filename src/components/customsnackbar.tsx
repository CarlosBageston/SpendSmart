import { Alert, IconButton, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface SnackBarProps {
    message: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<StateSnackBar>>;
    errorAlert?: boolean
}

export interface StateSnackBar {
    error: boolean;
    success: boolean;
}

function CustomSnackBar({ message, open, setOpen, errorAlert }: SnackBarProps) {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen({ error: false, success: false });
            }, 6000);

            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleClose = () => {
        setOpen({ error: false, success: false });
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            message={message}
        >
            <Alert
                severity={errorAlert ? "error" : "success"}
                sx={{ width: '65%' }}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                onClose={handleClose}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackBar;
