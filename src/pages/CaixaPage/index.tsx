import {
    Box,
    Container,
    Typography,
    Paper,
    Card,
    useMediaQuery,
    useTheme,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { InputSearch } from "../../components/feature/InputSearch";
import SelectInput from "../../components/feature/SelectInput";
import { CardMovimento } from "../../components/layouts/CardMovimento";
import { MovimentoType } from "../../types/movimento.type";
import { InputDate } from "../../components/feature/InputDate";
import dayjs, { Dayjs } from "dayjs";
import { StatusCard } from "../../components/layouts/StatusCard";
import { CardCaixa } from "../../components/layouts/CardCaixa";
import { AccountBalanceWalletOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined, ChevronRightOutlined, CreditCard, FormatListBulleted, LocalAtm, Pix, RequestQuoteOutlined } from "@mui/icons-material";
import CaixaService from "../../services/caixa.service";
import { Label } from "../../components/feature/Label";


export function CaixaPage() {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const [pesquisa, setPesquisa] = useState("");
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [loading, setLoading] = useState(false);
    const [movimentacoes, setMovimentacoes] = useState<MovimentoType[] | null>(null);


    const saldoInicial = 80; // Valor inicial do caixa, você pode ajustar conforme necessário
    const valorEntradas = movimentacoes?.filter(movimento => movimento.tipo === "ENTRADA").reduce((acc, curr) => acc + curr.valor, 0) || 0;
    const valorSaidas = movimentacoes?.filter(movimento => movimento.tipo === "SAIDA").reduce((acc, curr) => acc + curr.valor, 0) || 0;
    const saldoDia = saldoInicial + valorEntradas - valorSaidas;

    useEffect(() => {
        setLoading(true);
        async function loadData() {
            await getMovimentacoes(date?.format('YYYY-MM-DD') || '');
        }
        loadData();
    }, [date]);

    async function getMovimentacoes(data: string) {
        console.log('Buscando compras para a data:', data);
        CaixaService.listar(data)
            .then(response => {
                console.log('Movimentações recebidas:', response);
                setMovimentacoes(response);
            })
            .catch(error => {
                console.error('Erro ao buscar movimentações', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const filtroMovimentacoes = movimentacoes?.filter(movimento =>
        movimento.categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(pesquisa.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    ) || [];

    return (
        <Container sx={{ mt: 2, p: 1 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                <Box sx={{ display: "flex", scrollbarWidth: 'none', overflowX: 'auto', flexDirection: { md: "row", xs: "column" }, gap: 1, }}>
                    <InputSearch pesquisa={pesquisa} setPesquisa={setPesquisa} />
                    <InputDate
                        value={date}
                        onChange={setDate}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1, flexWrap: "wrap" }}>
                    <CardCaixa
                        title="Saldo do dia"
                        subtitle="Entradas - Saídas"
                        value={saldoDia}
                        icon={<AccountBalanceWalletOutlined />}
                        color="#02008a"
                    />
                    <CardCaixa
                        title="Entradas"
                        subtitle="12 lançamentos"
                        value={valorEntradas}
                        icon={<ArrowUpwardOutlined />}
                        color="#016828"
                    />
                    <CardCaixa
                        title="Saídas"
                        subtitle="12 lançamentos"
                        value={valorSaidas}
                        icon={<ArrowDownwardOutlined />}
                        color="#c50000"
                    />
                    <CardCaixa
                        title="Saldo inicial"
                        subtitle="Definido para o dia"
                        value={saldoInicial}
                        icon={<RequestQuoteOutlined />}
                        color="#636363"
                    />
                </Box>
                <hr />
                {
                    loading ? (
                        <Typography>Carregando...</Typography>
                    ) : (
                        movimentacoes?.length === 0 ? (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}><Typography sx={{ color: "#9CA3AF" }}>Nenhum movimento no período</Typography></Box>
                        ) : (
                            isDesktop ? (
                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        borderRadius: 3,
                                        border: "1px solid #E5E7EB",
                                        boxShadow: "none",
                                        backgroundColor: "#ffffff",
                                    }}
                                >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Horário</TableCell>
                                                <TableCell>Descrição</TableCell>
                                                <TableCell>Categoria</TableCell>
                                                <TableCell>Tipo</TableCell>
                                                <TableCell>Forma de Pagamento</TableCell>
                                                <TableCell>Valor</TableCell>
                                                <TableCell align="center">
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {filtroMovimentacoes?.map((movimento) => (
                                                <TableRow key={movimento.id}
                                                >
                                                    <TableCell>
                                                        <Box>
                                                            {dayjs(movimento.data).format('HH:mm')}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box>
                                                            {movimento.descricao}
                                                        </Box>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Label label={movimento.categoria} color={movimento.tipo === "ENTRADA" ? "#005512" : "#c50000"} icon={<AccountBalanceWalletOutlined />} />
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            movimento.tipo === "ENTRADA" ? (
                                                                <Label label="Entrada" color="#005512" icon={<ArrowUpwardOutlined />} />
                                                            ) : (
                                                                <Label label="Saída" color="#c50000" icon={<ArrowDownwardOutlined />} />
                                                            )
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {movimento.pagamento === "PIX" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}><Pix sx={{ fontSize: 18 }} /> PIX</Box>)}
                                                        {movimento.pagamento === "DINHEIRO" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}><LocalAtm sx={{ fontSize: 18 }} /> Dinheiro</Box>)}
                                                        {movimento.pagamento === "CARTAO" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}><CreditCard sx={{ fontSize: 18 }} /> Cartão</Box>)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ color: movimento.tipo === "ENTRADA" ? "#005512" : "#c50000" }}>
                                                            { movimento.tipo === "SAIDA" && "-"}
                                                            {movimento.valor.toLocaleString("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL",
                                                            })}
                                                        </Box>

                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                filtroMovimentacoes.map((movimento) => (
                                    <CardMovimento
                                        key={movimento.id}
                                        movimento={movimento}
                                    />
                                ))
                            )
                        )
                    )
                }


            </Box>
        </Container>
    );
}