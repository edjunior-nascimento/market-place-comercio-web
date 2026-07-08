import api from "./api";
import { MovimentoType } from "../types/movimento.type";

const CaixaService = {
    listar(data: string): Promise<MovimentoType[]> {
        return api.get<MovimentoType[]>(`/caixa/${data}`).then((res: any) => res.data.data)
    }
}

export default CaixaService;