import { forwardRef } from "react";

export const CupomPedido = forwardRef<HTMLDivElement>(
    (_, ref) => {
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
                    PEDIDO #001
                </h2>

                <hr />

                <p>
                    <strong>Status:</strong>
                    <br />
                    Aguardando Atendimento
                </p>

                <hr />

                <h3>ITENS</h3>

                <p>
                    1x Camarão com legumes e arroz
                    <br />
                    R$ 20,00
                </p>

                <p>
                    Obs: Colocar apenas batatas ao invés de
                    aipim
                </p>

                <hr />

                <p>
                    1x Camarão com legumes e arroz
                    <br />
                    R$ 20,00
                </p>

                <hr />

                <h3>ENTREGA</h3>

                <p>
                    Antonio da Silva
                    <br />
                    (88) 99909-1234
                    <br />
                    Rua Capitão Ferreira 1030
                </p>

                <hr />

                <h3>PAGAMENTO</h3>

                <p>PIX</p>

                <hr />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Subtotal</span>
                    <strong>R$ 40,00</strong>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Taxa</span>
                    <strong>R$ 1,00</strong>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Desconto</span>
                    <strong>-R$ 10,00</strong>
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
                    <span>R$ 31,00</span>
                </div>
            </div>
        );
    }
);