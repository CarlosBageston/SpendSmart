// src/store/contextSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContextState {
    isDirty: boolean;
}

const initialState: ContextState = {
    isDirty: false,
};

const contextSlice = createSlice({
    name: 'context',
    initialState,
    reducers: {
        changeDirty(state, action: PayloadAction<boolean>) {
            state.isDirty = action.payload;
        }
    },
});

export const { changeDirty} = contextSlice.actions;
export default contextSlice.reducer;
