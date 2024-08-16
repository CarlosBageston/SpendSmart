import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducer/store';
import { changeDirty } from '@/store/reducer/contextslice';
import { useSaveFunction } from './useSaveFunction';
import { setError } from '@/store/reducer/reducer';

const UseUnsavedChangesWarning = () => {
    const dispatch = useDispatch();
    const isDirty = useSelector((state: RootState) => state.context.isDirty);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [confirmCallback, setConfirmCallback] = useState<() => void>(() => () => { });
    const { saveFunction } = useSaveFunction();

    const handleConfirmNavigation = async () => {
        if (saveFunction) {
            try {
                await saveFunction();
                if (confirmCallback) {
                    confirmCallback();
                }
                setShowModal(false);
                dispatch(changeDirty(false));
            } catch (error) {
                dispatch(setError('Erro ao salvar, verifique sua conexão e tente novamente.'))
                return;
            }
        } else {
            if (confirmCallback) {
                confirmCallback();
            }
            setShowModal(false);
            dispatch(changeDirty(false));
        }
    };

    const handleCancelNavigation = () => {
        setShowModal(false);
    };

    const confirmNavigation = (callback: () => void) => {
        if (isDirty) {
            setConfirmCallback(() => callback);
            setShowModal(true);
        } else {
            callback();
        }
    };

    return {
        showModal,
        handleConfirmNavigation,
        handleCancelNavigation,
        confirmNavigation,
    };
};

export default UseUnsavedChangesWarning;
