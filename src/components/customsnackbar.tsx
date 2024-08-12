import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";

interface SnackBarProps {
    message: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    errorAlert?: boolean
}

function CustomSnackBar({ message, open, setOpen, errorAlert }: SnackBarProps) {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 6000);

            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message={message}
        >
            {errorAlert ? (
                <Alert severity="error" sx={{ width: '65%' }}>
                    {message}
                </Alert>
            ) : (
                <Alert severity="success" sx={{ width: '65%' }}>
                    {message}
                </Alert>
            )}
        </Snackbar>
    );
}

export default CustomSnackBar;
