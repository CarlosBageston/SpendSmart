import { auth } from "@/config/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function useVerifiEmailLogic() {
    const [open, setOpen] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const checkEmailVerification = async () => {
            const user = auth.currentUser;
            if (user) {
                await user.reload();
                if (user.emailVerified) {
                    navigate('/home');
                }
            }
        };

        checkEmailVerification();
    }, [navigate]);

    const resendVerificationEmail = async () => {
        const user = auth.currentUser;
        if (user) {
            await user.reload();
            await sendEmailVerification(user);
            setOpen(true);
            startCountdown();
        }
    };

    const startCountdown = () => {
        setIsButtonDisabled(true);
        setTimeLeft(60);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsButtonDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return {resendVerificationEmail, open, isButtonDisabled, timeLeft, setOpen}
}
export default useVerifiEmailLogic