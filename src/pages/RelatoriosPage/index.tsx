import {
  Box,
  Card,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  TrendingUpOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { ButtonRadio } from "../../components/feature/ButtonRadio";
import { useState } from "react";


export function RelatoriosPage() {

  const [periodoSelecionado, setPeriodoSelecionado] = useState(1);
  return (
    <Container sx={{ pt: 4, px: { xs: 2, md: 4 } }} >
      <Typography variant="h5" fontWeight={700}>
        Relatórios
      </Typography>

      <Typography color="text.grey" mb={2}>
        Desempenho da loja
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 2 }}>
        <ButtonRadio key={1} label="7 dias" ativado={periodoSelecionado === 1} onClick={() => setPeriodoSelecionado(1)} />
        <ButtonRadio key={2} label="30 dias" ativado={periodoSelecionado === 2} onClick={() => setPeriodoSelecionado(2)} />
        <ButtonRadio key={3} label="90 dias" ativado={periodoSelecionado === 3} onClick={() => setPeriodoSelecionado(3)} />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={1}
        mb={1}
      >
        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="body2" color="text.grey">
            Faturamento
          </Typography>

          <Typography variant="h5">
            R$ 6.400,00
          </Typography>

          <Typography
            color="#16a34a"
            fontWeight={600}
            variant="body2"
          >
            ↗ +8,2%
          </Typography>
        </Card>

        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="body2" color="text.grey">
            Pedido
          </Typography>

          <Typography variant="h5">
            203
          </Typography>

          <Typography
            color="#16a34a"
            fontWeight={600}
            variant="body2"
          >
            ↗ +4,6%
          </Typography>
        </Card>

        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="body2" color="text.grey">
            Ticket médio
          </Typography>

          <Typography variant="h5">
            R$ 34,74
          </Typography>
        </Card>

        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="body2" color="text.grey">
            Cancelamento
          </Typography>

          <Typography variant="h5">
            9 (4,4%)
          </Typography>
        </Card>
      </Box>

      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: "none",
          mb: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          fontWeight={600}
          mb={2}
        >
          Vendas por período
        </Typography>

        <Box
          sx={{
            height: 140,
            borderRadius: 2,
            background:
              "linear-gradient(180deg, rgba(25,118,210,.15) 0%, rgba(25,118,210,.05) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TrendingUpOutlined
            sx={{
              fontSize: 64,
              color: "#1976d2",
            }}
          />
        </Box>
      </Card>

      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={1}
        mb={2}
      >
        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            fontWeight={600}
            mb={2}
          >
            Por categoria
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
          >
            <ShoppingBagOutlined
              sx={{
                fontSize: 80,
                color: "#6c63ff",
              }}
            />
          </Box>
        </Card>

        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            fontWeight={600}
            mb={2}
          >
            Por status
          </Typography>

          <Stack spacing={1}>
            <Box>
              <Typography variant="body2">
                Entregue
              </Typography>

              <LinearProgress
                value={90}
                variant="determinate"
                color="success"
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>

            <Box>
              <Typography variant="body2">
                Atendimento
              </Typography>

              <LinearProgress
                value={60}
                variant="determinate"
                sx={{
                  height: 6,
                  borderRadius: 3,
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2">
                Pendente
              </Typography>

              <LinearProgress
                value={40}
                variant="determinate"
                color="warning"
                sx={{
                  height: 6,
                  borderRadius: 3,
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2">
                Cancelado
              </Typography>

              <LinearProgress
                value={15}
                variant="determinate"
                color="error"
                sx={{
                  height: 6,
                  borderRadius: 3,
                }}
              />
            </Box>
          </Stack>
        </Card>
      </Box>

      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: "none",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          fontWeight={600}
          mb={1}
        >
          Produtos mais vendidos
        </Typography>

        <Stack spacing={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography>1 Parmegiana</Typography>
            <Typography>R$ 760,00</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography>2 Filé de Frango</Typography>
            <Typography>R$ 760,00</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography>3 Carne Moída</Typography>
            <Typography>R$ 760,00</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography>4 Frango Assado</Typography>
            <Typography>R$ 760,00</Typography>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
}