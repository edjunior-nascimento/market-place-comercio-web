// src/utils/status.tsx

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import { StatusEnum } from "../enum/status.enum";


export const getStatus = (status: StatusEnum) => {
    switch (status) {
        case StatusEnum.PENDENTE:
            return {
                label: "Pendente",
                color: "#BCBCBC",
                icon: <AccessTimeOutlinedIcon sx={{ fontSize: 24 }} />
            };

        case StatusEnum.PREPARANDO:
            return {
                label: "Em Preparo",
                color: "#ff9900",
                icon: <ReceiptLongOutlined sx={{ fontSize: 24 }} />
            };

        case StatusEnum.ENVIADO:
            return {
                label: "Pronto",
                color: "#7e18b1",
                icon: <LocalShippingOutlined sx={{ fontSize: 24 }} />
            };

        case StatusEnum.ENTREGUE:
            return {
                label: "Entregue",
                color: "#1aa710",
                icon: <CheckCircleOutlined sx={{ fontSize: 24 }} />
            };

        case StatusEnum.CANCELADO:
            return {
                label: "Cancelado",
                color: "#ff0000",
                icon: <CancelOutlined sx={{ fontSize: 24 }} />
            };

        default:
            return {
                label: "Desconhecido",
                color: "#000000",
                icon: null
            };
    }
};