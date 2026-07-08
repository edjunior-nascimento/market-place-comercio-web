import { CategoriaType } from "../types/categoria.type";
import api from "./api";

const CategoriaService = {
    listar(): Promise<CategoriaType[]> {
        return api.get<CategoriaType[]>("/categorias").then((res:any) => res.data.data)
    },

    adicionar(categoria: CategoriaType): Promise<CategoriaType> {
        return api.post<CategoriaType>("/categorias", categoria).then((res: any) => res.data.data);
    },
    editar(categoria: CategoriaType): Promise<CategoriaType> {
        return api.put<CategoriaType>(`/categorias/${categoria.id}`, categoria).then((res: any) => res.data.data);
    },
    deletar(id: number): Promise<void> {
        return api.delete<void>(`/categorias/${id}`).then((res: any) => res.data.data);
    }
}

export default CategoriaService;