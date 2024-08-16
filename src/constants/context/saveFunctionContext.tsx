// src/contexts/SaveContext.tsx
import React, { createContext, useCallback, useState } from 'react';

interface SaveContextProps {
    saveFunction: () => Promise<void>;
    setSaveFunction: (fn: () => Promise<void>) => void;
}

interface SaveProviderProps {
    children: React.ReactNode;
}

const SaveContext = createContext<SaveContextProps | undefined>(undefined);

export const SaveProvider: React.FC<SaveProviderProps> = ({ children }) => {
    const [saveFunction, setSaveFunction] = useState<() => Promise<void>>(() => async () => { });

    const setFunction = useCallback((fn: () => Promise<void>) => {
        setSaveFunction(() => fn);
    }, []);

    return (
        <SaveContext.Provider value={{ saveFunction, setSaveFunction: setFunction }}>
            {children}
        </SaveContext.Provider>
    );
};

export default SaveContext;
