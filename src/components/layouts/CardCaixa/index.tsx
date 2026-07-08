
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CardCaixaProps {
    title: string;
    subtitle: string;
    value: number | undefined;
    icon: ReactNode;
    color: string;
}

export const CardCaixa = ({
    title,
    subtitle,
    value,
    icon,
    color,
}: CardCaixaProps) => {
    return (
        <Box
            flex={1}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1,
                border: "1px solid #E8EAF2",
                borderRadius: "20px",
                backgroundColor: "#FFF",
                minHeight: 70,
                minWidth: 200,
            }}
        >
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "16px",
                    backgroundColor: color+"22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: color,

                    "& svg": {
                        fontSize: 24,
                    },
                }}
            >
                {icon}
            </Box>

            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
            >
                
                <Typography
                    sx={{
                        fontSize: 14,
                        color: "#3b414d",
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 18,
                        fontWeight: 600,
                        lineHeight: 1,
                        color: "#111827",
                    }}
                >
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(value ?? 0)}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 14,
                        color: "#667085",
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
};