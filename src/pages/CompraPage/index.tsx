import { Box, Button, Card, Container, Divider, Typography } from "@mui/material";
import { CardPedido } from "../../components/layouts/CardPedido";
import { CardEntrega } from "../../components/layouts/CardEntrega";
import { CardPagamento } from "../../components/layouts/CardPagamento";
import { CardCupom } from "../../components/layouts/CardCupom";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/layouts/Header";
import { useEffect, useMemo, useState } from "react";
import ComprasService from "../../service/compras.service";
import { CompraType } from "../../types/compra.type";
import { StatusEnum } from "../../enum/status.enum";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";



export function CompraPage() {

  const navigate = useNavigate();
  const { compraId } = useParams();
  const [loading, setLoading] = useState(false);
  const [compra, setCompra] = useState<CompraType | null>(null);

  const total = useMemo(() => {
    let total = 0;
    const subTotal = compra?.subTotal;
    const taxa = compra?.taxas;
    const desconto = compra?.cupom?.valorDesconto || 0;
    if (subTotal !== undefined && taxa !== undefined) {
      total = (subTotal + taxa) - desconto;
    }
    return total;
  }, [compra?.subTotal, compra?.taxas, compra?.cupom]);

  const getStatus = (status: StatusEnum) => {
    switch (status) {
      case StatusEnum.PENDENTE:
        return { label: "Aguardando atendimento", color: "#BCBCBC", icon: <AccessTimeOutlinedIcon sx={{ fontSize: 38 }} /> };
      case StatusEnum.PREPARANDO:
        return { label: "Preparando Pedido", color: "#FFE063", icon: <ReceiptLongOutlined sx={{ fontSize: 38 }} /> };
      case StatusEnum.ENVIADO:
        return { label: "A caminho", color: "#CB64FF", icon: <LocalShippingOutlined sx={{ fontSize: 38 }} /> };
      case StatusEnum.ENTREGUE:
        return { label: "Entregue", color: "#59C151", icon: <CheckOutlined sx={{ fontSize: 38 }} /> };
      case StatusEnum.CANCELADO:
        return { label: "Cancelado", color: "#E14F4F", icon: <CloseOutlined sx={{ fontSize: 38 }} /> };
    }
  }

  useEffect(() => {
    setLoading(true);
    if (compraId) {
      ComprasService.getById(compraId)
        .then(response => {
          console.log('Compra encontrada:', response);
          setCompra(response);
        })
        .catch(error => {
          console.error('Erro ao buscar compra', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <Container sx={{ padding: '10px' }}>
      <Header link="/pedidos" showCartButton={false} />

      {!loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            px: { xs: '0px', md: '150px' },
          }}>
          {compra &&
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: 5,
                p: 1,
                py: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: 2,
                  borderBottomWidth: 6,
                  borderBottomStyle: "solid",
                  borderBottomColor: getStatus(compra.status).color,
                  pl: 2,
                  mb: 2,
                }}
              ></Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Typography variant="h6">
                    {getStatus(compra.status).label}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1">
                      {compra.data}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          }
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography py={2} variant="h5">Pedidos</Typography>
            {
              compra?.pedidos.map((pedido) => (
                <CardPedido
                  pedido={pedido}
                />
              ))
            }
          </Box>

          <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '10px' }}>
            {compra?.endereco &&
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Typography py={2} variant="h5">Endereço de Entrega</Typography>
                <CardEntrega entrega={compra?.endereco} modoExibicao={true} />
              </Box>
            }
            {compra?.pagamento &&
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Typography py={2} variant="h5">Forma de Pagamento</Typography>
                <CardPagamento
                  codigo={1}
                  forma={compra?.pagamento}
                  modoExibicao={true}
                />
              </Box>
            }
            {compra?.cupom &&
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Typography py={2} variant="h5">Cupom de Desconto</Typography>
                <CardCupom desconto={compra.cupom}></CardCupom>

              </Box>
            }

          </Box>

          <Card
            sx={{
              backgroundColor: '#ffffffDD',
              padding: '20px',
              marginTop: '20px',
              borderRadius: 4,
              boxShadow: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="Normal">
                SubTotal:
              </Typography>
              <Typography variant="h6">
                {compra?.pedidos?.reduce((acc, pedido) => acc + pedido.precoTotal, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="Normal">
                Taxas:
              </Typography>
              <Typography variant="h6">
                {compra?.taxas?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="Normal">
                Descontos:
              </Typography>
              <Typography variant="h6">
                {compra?.cupom?.valorDesconto ? compra.cupom?.valorDesconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'}
              </Typography>
            </Box>

            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5" fontWeight="Normal">
                Total:
              </Typography>
              <Typography variant="h5">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Box>
          </Card>
        </Box>
      ) : (
        <Typography variant="h6" align="center" mt={4}>
          Carregando...
        </Typography>
      )}
    </Container>
  );
}