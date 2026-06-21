import { ProdutoType } from "./produto.type";

export interface PedidoType {
    id: string,
    produto: ProdutoType,
    quantidade: number,
    precoTotal: number
}
