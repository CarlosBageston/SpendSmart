import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './reducer';
import contextslice, { ContextState } from './contextslice';
import loadingSlice, { LoadingState } from './loadingSlice';

/**
* Configuração da store do Redux.
* @param reducer - O reducer responsável por gerenciar o estado do usuário.
* @returns A store configurada.
*/
export interface RootState {
  user: UserState;
  context: ContextState;
  loading: LoadingState
}
const store = configureStore({
  reducer: {
    user: userReducer,
    context: contextslice,
    loading: loadingSlice,
  },
});

export default store;