import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { InputSearch } from "../../components/feature/InputSearch";
import { useEffect, useRef, useState } from "react";
import SelectInput from "../../components/feature/SelectInput";
import CardPedido from "../../components/layouts/CardCompra";
import { CompraType } from "../../types/compra.type";
import ComprasService from "../../service/compras.service";
import { useNavigate } from "react-router-dom";
import { CupomPedido } from "../../components/layouts/CupomPedido";
import { useReactToPrint } from "react-to-print";
import { ModelMenu } from "../../components/feature/ModelMenu";
import { CheckOutlined, ChevronRightOutlined, CloseOutlined, LocalPrintshopOutlined, LocalShippingOutlined, OpenInNew, ReceiptLongOutlined } from "@mui/icons-material";
import { Label } from "../../components/feature/Label";
import { formatarMomento } from "../../util/momento.formatter";
import { getStatus } from "../../util/status";
import { InputDate } from "../../components/feature/InputDate";
import dayjs, { Dayjs } from "dayjs";


export function PedidosPage() {

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(false);
  const [compras, setCompras] = useState<CompraType[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
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
      await getCompras();
    }
    loadData();
  }, []);



  async function getCompras() {
    ComprasService.listar()
      .then(response => {
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

        <Box sx={{ display: "flex", scrollbarWidth: 'none', overflowX: 'auto', flexDirection: {md:"row", xs: "column"}, gap: 1, }}>
          <InputSearch pesquisa={pesquisa} setPesquisa={setPesquisa} />
          <InputDate
            value={date}
            onChange={setDate}
          />
        </Box>

        {
          loading ? (
            <Typography>Carregando...</Typography>
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
                    {compras.map((pedido) => (
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
                            color="text.secondary"
                          >
                            {pedido.endereco.telefone}
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
                          {pedido.pagamento}
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
              compras.map((compra) => (
                <CardPedido key={compra.id} compra={compra} onClick={() => handleRowClick(compra)} />
              ))
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