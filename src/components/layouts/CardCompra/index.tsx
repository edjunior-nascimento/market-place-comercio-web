// components/OrderCard.tsx

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Typography } from "@mui/material";
import { CompraType } from "../../../types/compra.type";
import { StatusEnum } from "../../../enum/status.enum";
import { CancelOutlined, CheckCircleOutlined, CheckOutlined, CloseOutlined, CreditCard, LocalAtm, LocalPrintshopOutlined, LocalShippingOutlined, Money, OpenInNew, Pix, ReceiptLongOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import { ModelMenu } from "../../feature/ModelMenu";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { CupomPedido } from "../CupomPedido";
import { formatarMomento } from "../../../shared/util/momento.formatter";
import { Label } from "../../feature/Label";
import { getStatus } from "../../../shared/util/status";

type CardCompraProps = {
    compra: CompraType;
    onClick: () => void;
};

export default function CardCompra({ compra, onClick }: CardCompraProps) {

    return (
        <div>
            <Box
                onClick={onClick}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    p: 1,
                    py: 1.5,
                    cursor: "pointer",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        pl: 2,
                    }}
                >
                    <Box flex={1}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h6">
                                #{compra.id}
                            </Typography>

                            <Typography variant="subtitle1" fontWeight={500}>
                                R$
                                {compra.total.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </Typography>
                        </Box>

                        <Typography variant="h6" fontSize={14}>
                            {compra.endereco.nome}
                        </Typography>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="subtitle1" color="grey.600">
                                {formatarMomento(compra.data)}
                            </Typography>

                            <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1 }} color="grey.600">
                                { compra.pagamento === "PIX" && (<><Pix sx={{ fontSize: 18 }}/> PIX</>) }
                                { compra.pagamento === "DINHEIRO" && (<><LocalAtm sx={{ fontSize: 18 }}/> Dinheiro</>) }
                                { compra.pagamento === "CARTAO" && (<><CreditCard sx={{ fontSize: 18 }}/> Cartão</>) }
                            </Typography>

                        </Box>
                        <Box>
                            <Label label={getStatus(compra.status).label} color={getStatus(compra.status).color} icon={getStatus(compra.status).icon} />
                        </Box>
                    </Box>

                    <IconButton>
                        <ChevronRightIcon sx={{ fontSize: 24 }} />
                    </IconButton>

                </Box>
            </Box>

        </div>

    );
}