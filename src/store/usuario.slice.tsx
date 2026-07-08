import { UsuarioType } from "../types/usuario";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsuarioState {
    usuarios: UsuarioType[],
    loading: boolean,
    error: string | null
}

const initialState: UsuarioState = {
usuarios: [],
loading: false,
error: null
};

const usuarioSlice = createSlice({
name: "usuarios",
initialState,
    reducers: {
        adicionar: (state, action: PayloadAction<UsuarioType>) => {
            state.usuarios.push(action.payload);
        },
        atualizar: (state, action: PayloadAction<UsuarioType>) => {
            const index = state.usuarios.findIndex(usuario => usuario.id === action.payload.id);
            if (index !== -1) {
                state.usuarios[index] = action.payload;
            }
        },
        login: (state, action: PayloadAction<UsuarioType>) => {
            state.usuarios = [action.payload];
        },
        logout: (state) => {
            state.usuarios = [];
        },
        remover: (state, action: PayloadAction<string>) => {
            state.usuarios = state.usuarios.filter(usuario => usuario.id !== action.payload);
        }
    }
});

export const { adicionar, atualizar, login, logout, remover } = usuarioSlice.actions;
export default usuarioSlice.reducer;
