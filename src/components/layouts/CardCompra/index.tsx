// components/OrderCard.tsx

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Typography } from "@mui/material";
import { CompraType } from "../../../types/compra.type";
import { StatusEnum } from "../../../enum/status.enum";
import { CheckOutlined, CloseOutlined, LocalShippingOutlined, ReceiptLongOutlined } from "@mui/icons-material";

type CardCompraProps = {
    compra: CompraType;
    onClick?: () => void;
};

export default function CardCompra({ compra, onClick}: CardCompraProps) {

    const getStatus = (status: StatusEnum) =>{
        switch (status) {
            case StatusEnum.PENDENTE:
                return {label: "Pendente", color: "#BCBCBC", icon: <AccessTimeOutlinedIcon sx={{ fontSize: 32}} />};
            case StatusEnum.PREPARANDO:
                return {label: "Em Preparo", color: "#FFE063", icon: <ReceiptLongOutlined sx={{ fontSize: 32}} />};
            case StatusEnum.ENVIADO:
                return {label: "Pronto", color: "#CB64FF", icon: <LocalShippingOutlined sx={{ fontSize: 32}} />};
            case StatusEnum.ENTREGUE:
                return {label: "Entregue", color: "#59C151", icon: <CheckOutlined sx={{ fontSize: 32}} />};
            case StatusEnum.CANCELADO:
                return {label: "Cancelado", color: "#E14F4F", icon: <CloseOutlined sx={{ fontSize: 32}} />};
        }
    }

    return (
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
    );
}