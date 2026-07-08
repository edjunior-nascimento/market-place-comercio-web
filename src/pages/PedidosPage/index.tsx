import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { InputSearch } from "../../components/feature/InputSearch";
import { useEffect, useRef, useState } from "react";
import SelectInput from "../../components/feature/SelectInput";
import CardPedido from "../../components/layouts/CardCompra";
import { CompraType } from "../../types/compra.type";
import ComprasService from "../../services/compras.service";
import { useNavigate } from "react-router-dom";
import { CupomPedido } from "../../components/layouts/CupomPedido";
import { useReactToPrint } from "react-to-print";
import { ModelMenu } from "../../components/feature/ModelMenu";
import { CheckOutlined, ChevronRightOutlined, CloseOutlined, CreditCard, FormatListBulleted, LocalAtm, LocalPrintshopOutlined, LocalShippingOutlined, OpenInNew, Pix, ReceiptLongOutlined } from "@mui/icons-material";
import { Label } from "../../components/feature/Label";
import { formatarMomento } from "../../shared/util/momento.formatter";
import { getStatus } from "../../shared/util/status";
import { InputDate } from "../../components/feature/InputDate";
import dayjs, { Dayjs } from "dayjs";
import { StatusCard } from "../../components/layouts/StatusCard";
import { StatusEnum } from "../../enum/status.enum";
import { formatarTelefone } from "../../shared/util/telefone.formatter";


export function PedidosPage() {

  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(false);
  const [compras, setCompras] = useState<CompraType[]>([]);
  const [open, setOpen] = useState(false);
  const [compraSelecionada, setCompraSelecionada] = useState<CompraType | null>(null);
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleRowClick = (compra: CompraType) => {
    setCompraSelecionada(compra);
    setOpen(true);
  }

  useEffect(() => {
    setLoading(true);
    async function loadData() {
      console.log('Carregando compras...', date?.format('YYYY-MM-DD'));
      await getCompras(date?.format('YYYY-MM-DD') || '');
    }
    loadData();
  }, [date]);

  const filtroCompras = compras.filter(compra =>
    compra.endereco.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(pesquisa.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) ||
    compra.id.toString().includes(pesquisa)
  );

  async function getCompras(data: string) {
    console.log('Buscando compras para a data:', data);
    ComprasService.getByDate(data)
      .then(response => {
        console.log('Compras recebidas:', response);
        setCompras(response);
      })
      .catch(error => {
        console.error('Erro ao buscar entregas', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container sx={{ mt: 4, p: 1 }}>
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
          <StatusCard title="Total" value={compras?.length} icon={<FormatListBulleted />} iconColor="#4CAF50" iconBg="#E8F5E9" />
          <StatusCard title={getStatus(StatusEnum.PENDENTE).label} value={compras?.filter(c => c.status === StatusEnum.PENDENTE).length} icon={getStatus(StatusEnum.PENDENTE).icon} iconColor={getStatus(StatusEnum.PENDENTE).color} iconBg={getStatus(StatusEnum.PENDENTE).color} />
          <StatusCard title={getStatus(StatusEnum.PREPARANDO).label} value={compras?.filter(c => c.status === StatusEnum.PREPARANDO).length} icon={getStatus(StatusEnum.PREPARANDO).icon} iconColor={getStatus(StatusEnum.PREPARANDO).color} iconBg={getStatus(StatusEnum.PREPARANDO).color} />
          <StatusCard title={getStatus(StatusEnum.ENVIADO).label} value={compras?.filter(c => c.status === StatusEnum.ENVIADO).length} icon={getStatus(StatusEnum.ENVIADO).icon} iconColor={getStatus(StatusEnum.ENVIADO).color} iconBg={getStatus(StatusEnum.ENVIADO).color} />
          <StatusCard title={getStatus(StatusEnum.ENTREGUE).label} value={compras?.filter(c => c.status === StatusEnum.ENTREGUE).length} icon={getStatus(StatusEnum.ENTREGUE).icon} iconColor={getStatus(StatusEnum.ENTREGUE).color} iconBg={getStatus(StatusEnum.ENTREGUE).color} />
          <StatusCard title={getStatus(StatusEnum.CANCELADO).label} value={compras?.filter(c => c.status === StatusEnum.CANCELADO).length} icon={getStatus(StatusEnum.CANCELADO).icon} iconColor={getStatus(StatusEnum.CANCELADO).color} iconBg={getStatus(StatusEnum.CANCELADO).color} />
        </Box>
        <hr />

        {
          loading ? (
            <Typography>Carregando...</Typography>
          ) : (
            filtroCompras?.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}><Typography sx={{color: "#9CA3AF"}}>Nenhum pedido no período</Typography></Box>
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
                        <TableCell>Pedido</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Pagamento</TableCell>
                        <TableCell align="center">
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filtroCompras?.map((pedido) => (
                        <TableRow key={pedido.id}
                        >
                          <TableCell>
                            <Box fontWeight={600}>
                              #{pedido.id}
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box fontWeight={600}>
                              {pedido.endereco.nome}
                            </Box>
                            <Box
                              fontSize={13}
                              color="#7e7e7e"
                            >
                              {formatarTelefone(pedido.endereco.telefone)}
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box>{formatarMomento(pedido.data)}</Box>
                          </TableCell>

                          <TableCell>
                            {pedido.total.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </TableCell>

                          <TableCell>
                            <Label label={getStatus(pedido.status).label} color={getStatus(pedido.status).color} icon={getStatus(pedido.status).icon} />
                          </TableCell>

                          <TableCell>
                            {pedido.pagamento === "PIX" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}><Pix sx={{ fontSize: 18 }} /> PIX</Box>)}
                            {pedido.pagamento === "DINHEIRO" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}><LocalAtm sx={{ fontSize: 18 }} /> Dinheiro</Box>)}
                            {pedido.pagamento === "CARTAO" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}><CreditCard sx={{ fontSize: 18 }} /> Cartão</Box>)}
                          </TableCell>

                          <TableCell align="center">
                            <IconButton onClick={() => handleRowClick(pedido)}>
                              <ChevronRightOutlined sx={{ fontSize: 24 }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                filtroCompras?.map((compra) => (
                  <CardPedido key={compra.id} compra={compra} onClick={() => handleRowClick(compra)} />
                ))
              )
            )
          )
        }
      </Box>
      <div style={{ display: "none" }}>
        <CupomPedido
          ref={printRef}
          compra={compraSelecionada}
        />
      </div>

      <ModelMenu
        itens={
          [
            { label: 'Abrir', descricao: 'Visualizar detalhes do pedido', icone: <OpenInNew />, onClick: () => { navigate(`/compra/${compraSelecionada?.id}`); setOpen(false) } },
            { label: 'Iniciar Atendimento', descricao: 'Alterar o status para em Atendimento', icone: <ReceiptLongOutlined />, onClick: () => { setOpen(false) } },
            { label: 'Enviar para Entrega', descricao: 'Alterar o status para em processo de Entrega', icone: <LocalShippingOutlined />, onClick: () => { setOpen(false) } },
            { label: 'Finalizar Pedido', descricao: 'Concluir o atendimento do Pedido', icone: <CheckOutlined />, onClick: () => { setOpen(false) } },
            { label: 'Cancelar Pedido', descricao: 'Cancelar o atendimento do Pedido', icone: <CloseOutlined />, onClick: () => { setOpen(false) } },
            { label: 'Imprimir', descricao: 'Imprimir detalhes do pedido', icone: <LocalPrintshopOutlined />, onClick: () => { handlePrint(); setOpen(false); } },
          ]}
        open={open}
        onClose={() => setOpen(false)} />
    </Container>
  );
}