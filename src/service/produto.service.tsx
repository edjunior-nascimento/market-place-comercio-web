import { ProdutoType } from "../types/produto.type";
import api from "./api";

const ProdutoService = {
    
    listar(): Promise<ProdutoType[]> {
        return api.get<ProdutoType[]>("/produtos").then((res:any) => res.data.data)
    },

    getById(id: string): Promise<ProdutoType> {
        return api.get<ProdutoType>(`/produto/${id}`).then((res:any) => res.data.data)
    }
}

export default ProdutoService;