import UsuarioService from "../services/usuario.service";
import { UsuarioType } from "../types/usuario";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

export interface UsuarioState {
    usuarios: UsuarioType,
    loading: boolean,
    error: string | null
}

const initialState: UsuarioState = {
    usuarios: {
        token: token || ""
    } as UsuarioType,
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    '/usuario/login',
    async ({ login, senha }: { login: string; senha: string }, thunkAPI) => {
        try {
            const response = await UsuarioService.login(login, senha);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const validarSessao = createAsyncThunk(
    "/usuario/validar",
    async (_, thunkAPI) => {

        const token = localStorage.getItem("token");

        if (!token) {
            return thunkAPI.rejectWithValue("");
        }

        try {
            const usuario = await UsuarioService.validar(token);

            return usuario;

        } catch {
            localStorage.removeItem("token");

            return thunkAPI.rejectWithValue(
                "Sessão expirada"
            );
        }
    }
);


const autenticacaoSlice = createSlice({
    name: "autenticacao",
    initialState,
    reducers: {
        logout: (state) => {

            localStorage.removeItem("token");

            state.usuarios = {} as UsuarioType
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<UsuarioType>) => {
                state.loading = false;
                state.usuarios = action.payload;

                localStorage.setItem(
                    "token",
                    action.payload.token
                );

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }).addCase(validarSessao.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validarSessao.fulfilled, (state, action: PayloadAction<UsuarioType>) => {
                state.loading = false;
                state.usuarios = action.payload;
            })
            .addCase(validarSessao.rejected, (state, action) => {
                state.usuarios = {} as UsuarioType;
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { logout } = autenticacaoSlice.actions;
export default autenticacaoSlice.reducer;
