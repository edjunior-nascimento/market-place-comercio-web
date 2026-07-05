import {
    Box,
    Container,
    Typography,
    Paper,
} from "@mui/material";
import { useState } from "react";
import { InputSearch } from "../../components/feature/InputSearch";
import SelectInput from "../../components/feature/SelectInput";

interface Movimento {
    id: number;
    titulo: string;
    cliente: string;
    data: string;
    valor: number;
    tipo: "entrada" | "saida";
}

export function CaixaPage() {
    const [pesquisa, setPesquisa] = useState("");

    const movimentacoes: Movimento[] = [
        {
            id: 1,
            titulo: "Pagamento à vista",
            cliente: "0012 - Antonio da Silva",
            data: "3 min atrás",
            valor: 20,
            tipo: "entrada",
        },
        {
            id: 2,
            titulo: "Ajuste Ref Pagamento no Cartão/Pix",
            cliente: "0012 - Antonio da Silva",
            data: "3 min atrás",
            valor: -20,
            tipo: "saida",
        },
        {
            id: 3,
            titulo: "Pagamento no Cartão",
            cliente: "0012 - Antonio da Silva",
            data: "3 min atrás",
            valor: 20,
            tipo: "entrada",
        },
        {
            id: 4,
            titulo: "Ajuste Ref Pagamento no Cartão/Pix",
            cliente: "0012 - Antonio da Silva",
            data: "3 min atrás",
            valor: -20,
            tipo: "saida",
        },
    ];

    return (
        <Container sx={{ mt: 2, p: 1 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                <InputSearch
                    pesquisa={pesquisa}
                    setPesquisa={setPesquisa}
                />

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        overflowX: "auto",
                        scrollbarWidth: "none",
                    }}
                >
                    <SelectInput
                        label="Últimas 24 horas"
                        items={[
                            {
                                label: "Últimas 24 horas",
                                value: "24h",
                            },
                            {
                                label: "Últimos 7 dias",
                                value: "7d",
                            },
                            {
                                label: "Últimos 30 dias",
                                value: "30d",
                            },
                        ]}
                    />

                    <SelectInput
                        label="Exibir"
                        items={[
                            {
                                label: "Todos",
                                value: "all",
                            },
                            {
                                label: "Entradas",
                                value: "in",
                            },
                            {
                                label: "Saídas",
                                value: "out",
                            },
                        ]}
                    />
                </Box>

                {/* RESUMO */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 1.5,
                        borderRadius: 1,
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={1}
                    >
                        <Typography>
                            Entradas:
                        </Typography>

                        <Typography fontWeight={700}>
                            R$ 40,00
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={1}
                    >
                        <Typography>
                            Saídas:
                        </Typography>

                        <Typography
                            color="error"
                            fontWeight={700}
                        >
                            -R$ 40,00
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            borderTop: "1px solid #ddd",
                            pt: 1,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography fontWeight={600}>
                            Total:
                        </Typography>

                        <Typography fontWeight={700}>
                            R$ 0,00
                        </Typography>
                    </Box>
                </Paper>

                {/* MOVIMENTAÇÕES */}
                {movimentacoes.map((movimento) => (
                    <Paper
                        key={movimento.id}
                        elevation={0}
                        sx={{
                            p: 1.5,
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: 5,
                                height: 70,
                                borderRadius: "4px",
                                bgcolor:
                                    movimento.tipo ===
                                    "entrada"
                                        ? "#5C6EF8"
                                        : "#F55A5A",
                            }}
                        />

                        <Box flex={1}>
                            <Typography
                                fontWeight={700}
                                sx={{ lineHeight: 1.2 }}
                            >
                                {movimento.titulo}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {movimento.cliente}
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {movimento.data}
                            </Typography>
                        </Box>

                        <Typography
                            fontWeight={500}
                            color={
                                movimento.tipo ===
                                "entrada"
                                    ? "inherit"
                                    : "error"
                            }
                        >
                            {movimento.valor < 0
                                ? `-R$ ${Math.abs(
                                      movimento.valor
                                  ).toFixed(2)}`
                                : `R$ ${movimento.valor.toFixed(
                                      2
                                  )}`}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}