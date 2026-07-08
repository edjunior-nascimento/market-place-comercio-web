import { ProdutoType } from "../types/produto.type";
import api from "./api";

const ProdutoService = {

    listar(): Promise<ProdutoType[]> {
        return api.get<ProdutoType[]>("/produtos").then((res: any) => res.data.data)
    },

    getById(id: string): Promise<ProdutoType> {
        return api.get<ProdutoType>(`/produto/${id}`).then((res: any) => res.data.data)
    },
    adicionar(produto: ProdutoType): Promise<ProdutoType> {
        return api.post<ProdutoType>("/produtos", produto).then((res: any) => res.data.data);
    },
    editar(produto: ProdutoType): Promise<ProdutoType> {
        return api.put<ProdutoType>(`/produtos/${produto.id}`, produto).then((res: any) => res.data.data);
    },
    disponibilidade(id: string, oculto: boolean): Promise<ProdutoType> {
        return api.patch<ProdutoType>(`/produtos/${id}/oculto`, { oculto }).then((res: any) => res.data.data);
    },
    deletar(id: string): Promise<void> {
        return api.delete<void>(`/produtos/${id}`).then((res: any) => res.data.data);
    }
}

export default ProdutoService;