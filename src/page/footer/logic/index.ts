import UseUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";
import { useLocation, useNavigate } from "react-router-dom";


function useFooterLogic() {
    const navigate = useNavigate();
    const location = useLocation();
    const { showModal, handleConfirmNavigation, handleCancelNavigation, confirmNavigation } = UseUnsavedChangesWarning();

    const handleNavigate = (route: string) => {
        confirmNavigation(() => navigate(route));
    };

    return {
        location,
        showModal, 
        handleConfirmNavigation, 
        handleCancelNavigation,
        handleNavigate
    }
}

export default useFooterLogic