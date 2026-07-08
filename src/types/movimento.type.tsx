import { PagamentoEnum } from "../enum/pagamento.enum";
import { TipoEnum } from "../enum/tipo.enum";

export interface MovimentoType {
    id: string,
    tipo: TipoEnum,
    categoria: string,
    descricao: string,
    pagamento: PagamentoEnum,
    data: string,
    valor: number
}
