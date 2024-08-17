import { Alert, IconButton, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { setError } from "@/store/reducer/reducer";

interface SnackBarProps {
    message: string;
    open: StateSnackBar;
    setOpen: Dispatch<SetStateAction<StateSnackBar>>;
    errorAlert?: boolean
}

export interface StateSnackBar {
    error: boolean;
    success: boolean;
}

function CustomSnackBar({ message, open, setOpen }: SnackBarProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen({ error: false, success: false });
                dispatch(setError(''))
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
            open={open.error || open.success}
            autoHideDuration={6000}
            message={message}
        >
            <Alert
                severity={open.error ? "error" : "success"}
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
