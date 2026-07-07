import api from "./api";
import { CompraType } from "../types/compra.type";

const ComprasService = {
    listar(): Promise<CompraType[]> {
        return api.get<CompraType[]>("/compras").then((res:any) => res.data.data)
    },
    getById(id: string): Promise<CompraType> {
        return api.get<CompraType>(`/compra/${id}`).then((res:any) => res.data.data)
    },
    getByDate(data: string): Promise<CompraType[]> {
        return api.get<CompraType[]>(`/compras/${data}`).then((res:any) => res.data.data)
    }
}

export default ComprasService;