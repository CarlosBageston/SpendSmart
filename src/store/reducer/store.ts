import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './reducer';
import contextslice, { ContextState } from './contextslice';

/**
* Configuração da store do Redux.
* @param reducer - O reducer responsável por gerenciar o estado do usuário.
* @returns A store configurada.
*/
export interface RootState {
  user: UserState;
  context: ContextState
}
const store = configureStore({
  reducer: {
    user: userReducer,
    context: contextslice
  },
});

export default store;