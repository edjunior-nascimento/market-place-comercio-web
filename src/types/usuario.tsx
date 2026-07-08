import { UsuarioEnum } from "../enum/usuarios.enum";

export interface UsuarioType {
    id: string;
    imagem: string;
    nome: string;
    login: string;
    email: string;
    senha: string;
    tipo: UsuarioEnum;
    token: string;
    ativo: boolean;
}