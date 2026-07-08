import { UsuarioType } from "../types/usuario";
import api from "./api";

const UsuarioService = {
    login(login: string, senha: string): Promise<UsuarioType> {
        return api.post<UsuarioType>("/usuario/login", { login, senha }).then((res:any) => res.data.data)
    },
    validar(token: string): Promise<UsuarioType> {
        return api.post<UsuarioType>("/usuario/validar", { token }).then((res:any) => res.data.data)
    }
}

export default UsuarioService;