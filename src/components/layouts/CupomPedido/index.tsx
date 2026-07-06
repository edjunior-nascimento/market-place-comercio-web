import { forwardRef } from "react";
import { CompraType } from "../../../types/compra.type";


interface Props {
    compra: CompraType;
}

export const CupomPedido = forwardRef<HTMLDivElement, Props>(
    ({ compra }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: "80mm",
                    padding: 10,
                    fontFamily: "monospace",
                    fontSize: 12,
                }}
            >
                <h2 style={{ textAlign: "center" }}>
                    PEDIDO #{compra.id}
                </h2>

                <hr />

                <p>
                    <strong>Status:</strong>
                    <br />
                    {compra.status}
                </p>

                <hr />

                <h3>ITENS</h3>

                {compra.pedidos.map((item, index) => (
                    <div>
                        <p key={index}>
                            {`${item.quantidade}x ${item.produto.nome}`}
                            <br />
                            {`R$ ${item.produto.preco.toFixed(2)}`}
                        </p>
                        <hr />
                    </div>
                ))}

                {compra.observacao &&
                    (
                        <div>
                            <p>
                                Obs: {compra.observacao}
                            </p>
                            <hr />
                        </div>
                    )
                }

                <h3>ENTREGA</h3>

                <p>
                    {compra.endereco.nome}
                    <br />
                    {compra.endereco.telefone}
                    (88) 99909-1234
                    <br />
                    {compra.endereco.endereco} {compra.endereco.numero} - {compra.endereco.bairro}
                    <br />
                    {compra.endereco.referencia ? `Ref: ${compra.endereco.referencia}` : ""}
                </p>

                <hr />

                <h3>PAGAMENTO</h3>
                <p>
                    {compra.pagamento}
                </p>

                <p>
                    {compra.pagamento === "DINHEIRO" && compra.troco ? `Troco para: R$ ${compra.troco.toFixed(2)}` : ""}
                </p>

                <hr />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Subtotal</span>
                    <strong>{`R$ ${compra.subTotal.toFixed(2)}`}</strong>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Taxa</span>
                    <strong>{`R$ ${compra.taxas.toFixed(2)}`}</strong>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Desconto</span>
                    <strong>{`-R$ ${compra.cupom?.valorDesconto.toFixed(2)}`}</strong>

                </div>

                <hr />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    <span>TOTAL</span>
                    <span>{`R$ ${compra.total.toFixed(2)}`}</span>
                </div>
            </div>
        );
    }
);