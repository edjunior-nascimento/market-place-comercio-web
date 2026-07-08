
import { configureStore } from "@reduxjs/toolkit";
import autenticacaoSlice from "./autenticacao.slice";


export const store = configureStore({
  reducer: {
    autenticacao: autenticacaoSlice,
  },
});