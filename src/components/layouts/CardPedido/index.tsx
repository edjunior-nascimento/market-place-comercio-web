// components/OrderCard.tsx

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Typography } from "@mui/material";

type CardPedidoProps = {
    codigo: string;
    cliente: string;
    quantidadeItens: number;
    tempo: string;
    valor: number;
    onClick?: () => void;
};

export default function CardPedido({
    codigo,
    cliente,
    quantidadeItens,
    tempo,
    valor,
    onClick,
}: CardPedidoProps) {
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
                    borderLeft: "6px solid #1976d2",
                    pl: 2,
                }}
            >
                <AccessTimeOutlinedIcon sx={{ fontSize: 32, color: "#000",}} />
                <Box flex={1}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="subtitle1">
                            {codigo}
                        </Typography>

                        <Typography variant="subtitle1">
                            {tempo}
                        </Typography>
                    </Box>

                    <Typography variant="h6">
                        {cliente}
                    </Typography>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="subtitle1">
                            {quantidadeItens} {quantidadeItens > 1 ? "itens" : "item"}
                        </Typography>

                        <Typography variant="h6" >
                            R$
                            {valor.toLocaleString("pt-BR", {
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