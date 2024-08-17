import { useContext } from 'react';
import SaveContext from '@/constants/context/saveFunctionContext';

export const useSaveFunction = () => {
    const context = useContext(SaveContext);
    if (!context) {
        throw new Error('useSaveFunction must be used within a SaveProvider');
    }
    return context;
};