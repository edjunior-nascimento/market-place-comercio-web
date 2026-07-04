import { CategoriaType } from "../types/categoria.type";
import api from "./api";

const CategoriaService = {
    listar(): Promise<CategoriaType[]> {
        return api.get<CategoriaType[]>("/categorias").then((res:any) => res.data.data)
    }
}

export default CategoriaService;