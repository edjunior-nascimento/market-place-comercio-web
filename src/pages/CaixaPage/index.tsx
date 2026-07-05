import {
    Box,
    Container,
    Typography,
    Paper,
    Card,
} from "@mui/material";
import { useState } from "react";
import { InputSearch } from "../../components/feature/InputSearch";
import SelectInput from "../../components/feature/SelectInput";
import { CardMovimento } from "../../components/layouts/CardMovimento";
import { MoviementoType } from "../../types/movimento.type";


export function CaixaPage() {
    const [pesquisa, setPesquisa] = useState("");

    const movimentacoes: MoviementoType[] = [
        {
            id: "1",
            nome: "Pagamento à vista",
            descricao: "0012 - Antonio da Silva",
            data: "3 min atrás",
            valor: 20,
            tipo: "entrada",
        },
        {
            id: "2",
            nome: "Ajuste Ref Pagamento no Cartão/Pix",
            descricao: "0012 - Antonio da Silva",
            data: "3 min atrás",
            valor: 20,
            tipo: "entrada",
        },
        {
            id: "3",
            nome: "Ajuste Ref Pagamento no Cartão/Pix",
            descricao: "0012 - Antonio da Silva",
            data: "3 min atrás",
            valor: -20,
            tipo: "saida",
        },
        {
            id: "4",
            nome: "Pagamento no Cartão",
            descricao: "0012 - Antonio da Silva",
            data: "3 min atrás",
            valor: 20,
            tipo: "entrada",
        },
        {
            id: "5",
            nome: "Ajuste Ref Pagamento no Cartão/Pix",
            descricao: "0012 - Antonio da Silva",
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
                <Card
                    elevation={0}
                    sx={{
                        p: 1.5,
                        borderRadius: 1,
                        backgroundColor: "#ffffff"
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
                </Card>

                {/* MOVIMENTAÇÕES */}
                {movimentacoes.map((movimento) => (
                   
                   <CardMovimento
                        key={movimento.id}
                        movimento={movimento}
                   />
                ))}
            </Box>
        </Container>
    );
}