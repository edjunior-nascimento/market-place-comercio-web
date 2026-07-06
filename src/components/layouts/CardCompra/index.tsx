// components/OrderCard.tsx

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Typography } from "@mui/material";
import { CompraType } from "../../../types/compra.type";
import { StatusEnum } from "../../../enum/status.enum";
import { CheckOutlined, CloseOutlined, LocalPrintshopOutlined, LocalShippingOutlined, OpenInNew, ReceiptLongOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import { ModelMenu } from "../../feature/ModelMenu";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { CupomPedido } from "../CupomPedido";

type CardCompraProps = {
    compra: CompraType;
};

export default function CardCompra({ compra }: CardCompraProps) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const cupomRef = useRef<HTMLDivElement>(null);


    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
    });



    const getStatus = (status: StatusEnum) => {
        switch (status) {
            case StatusEnum.PENDENTE:
                return { label: "Pendente", color: "#BCBCBC", icon: <AccessTimeOutlinedIcon sx={{ fontSize: 32 }} /> };
            case StatusEnum.PREPARANDO:
                return { label: "Em Preparo", color: "#FFE063", icon: <ReceiptLongOutlined sx={{ fontSize: 32 }} /> };
            case StatusEnum.ENVIADO:
                return { label: "Pronto", color: "#CB64FF", icon: <LocalShippingOutlined sx={{ fontSize: 32 }} /> };
            case StatusEnum.ENTREGUE:
                return { label: "Entregue", color: "#59C151", icon: <CheckOutlined sx={{ fontSize: 32 }} /> };
            case StatusEnum.CANCELADO:
                return { label: "Cancelado", color: "#E14F4F", icon: <CloseOutlined sx={{ fontSize: 32 }} /> };
        }
    }

    return (
        <div>
            <Box
                onClick={() => setOpen(true)}
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
                        borderLeftWidth: 6,
                        borderLeftStyle: "solid",
                        borderLeftColor: getStatus(compra.status).color,
                        pl: 2,
                    }}
                >
                    {getStatus(compra.status).icon}
                    <Box flex={1}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="subtitle1">
                                {compra.id}
                            </Typography>

                            <Typography variant="subtitle1">
                                {compra.data}
                            </Typography>
                        </Box>

                        <Typography variant="h6">
                            {compra.endereco.nome}
                        </Typography>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="subtitle1">
                                {compra.pedidos.length} {compra.pedidos.length > 1 ? "itens" : "item"}
                            </Typography>

                            <Typography variant="h6" >
                                R$
                                {compra.total.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </Typography>
                        </Box>
                    </Box>

                    <IconButton>
                        <ChevronRightIcon sx={{ fontSize: 24 }} />
                    </IconButton>

                </Box>
            </Box>

            <div style={{ display: "none" }}>
                <CupomPedido
                    ref={printRef}
                    compra={compra}
                />
            </div>
            
            <ModelMenu
                itens={
                    [
                        { label: 'Abrir', descricao: 'Visualizar detalhes do pedido', icone: <OpenInNew />, onClick: () => { navigate(`/compra/${compra.id}`); setOpen(false) } },
                        { label: 'Iniciar Atendimento', descricao: 'Alterar o status para em Atendimento', icone: <ReceiptLongOutlined />, onClick: () => { setOpen(false) } },
                        { label: 'Enviar para Entrega', descricao: 'Alterar o status para em processo de Entrega', icone: <LocalShippingOutlined />, onClick: () => { setOpen(false) } },
                        { label: 'Finalizar Pedido', descricao: 'Concluir o atendimento do Pedido', icone: <CheckOutlined />, onClick: () => { setOpen(false) } },
                        { label: 'Cancelar Pedido', descricao: 'Cancelar o atendimento do Pedido', icone: <CloseOutlined />, onClick: () => { setOpen(false) } },
                        { label: 'Imprimir', descricao: 'Imprimir detalhes do pedido', icone: <LocalPrintshopOutlined />, onClick: () => { handlePrint(); setOpen(false);}},
                    ]}
                open={open}
                onClose={() => setOpen(false)} />
        </div>

    );
}