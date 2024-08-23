import { Modal, Button, Typography, Box } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

interface StanderdModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string
    message: string
    labelButtonConfirm: string
    labelButtonClose: string
}

const StanderdModal = ({ open, onClose, onConfirm, title, message, labelButtonClose, labelButtonConfirm }: StanderdModalProps) => (
    <Modal
        open={open}
        onClose={onClose}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Box
            sx={{
                width: { xs: '90%', sm: 400 },
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <CheckCircle color="warning" sx={{ fontSize: 50 }} />
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                {title}
            </Typography>
            <Typography sx={{ mt: 1, textAlign: 'center' }}>
                {message}
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                    onClick={onConfirm}
                    color="primary"
                    variant="contained"
                    sx={{ flexGrow: 1 }}
                    startIcon={<CheckCircle />}
                >
                    {labelButtonConfirm}
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                    sx={{ flexGrow: 1 }}
                    startIcon={<Cancel />}
                >
                    {labelButtonClose}
                </Button>
            </Box>
        </Box>
    </Modal>
);

export default StanderdModal;
