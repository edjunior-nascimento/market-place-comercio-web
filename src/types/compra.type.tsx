import { EntregaType } from "./entrega";
import { PedidoType } from "./pedido.type";
import { PagamentoEnum } from "../enum/pagamento.enum";
import { StatusEnum } from "../enum/status.enum";
import { DescontoType } from "./desconto.type";

export interface CompraType {
    id: string,
    pedidos: PedidoType[],
    endereco: EntregaType,
    pagamento: PagamentoEnum,
    cupom?: DescontoType,
    observacao?: string,
    troco?: number,
    subTotal: number,
    taxas: number,
    total: number,
    status: StatusEnum,
    data: string
}
