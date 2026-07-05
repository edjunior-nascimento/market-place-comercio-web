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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";



export function RelatoriosPage() {

  const [periodoSelecionado, setPeriodoSelecionado] = useState(1);
  const data = [
    { dia: "Seg", vendas: 120 },
    { dia: "Ter", vendas: 180 },
    { dia: "Qua", vendas: 160 },
    { dia: "Qui", vendas: 260 },
    { dia: "Sex", vendas: 230 },
    { dia: "Sab", vendas: 320 },
    { dia: "Dom", vendas: 290 },
  ];


  const data2 = [
    { name: "Massas", value: 35 },
    { name: "Carnes", value: 25 },
    { name: "Frango", value: 20 },
    { name: "Lanches", value: 20 },
  ];


  const data3 = [
    { status: "Entregue", total: 90 },
    { status: "Atendimento", total: 60 },
    { status: "Pendente", total: 35 },
    { status: "Cancelado", total: 10 },
  ];



  const COLORS = [
    "#7C4DFF",
    "#2196F3",
    "#FF9800",
    "#4CAF50",
  ];

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

        <Box width="100%" height={250}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="dia" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="#1976d2"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
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

            <ResponsiveContainer width={200} height={140}>
              <PieChart>
                <Pie
                  data={data2}
                  dataKey="value"
                  outerRadius={70}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

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

          <ResponsiveContainer width="100%" height={140}>
            <BarChart
              layout="vertical"
              data={data3}
              barSize={18}
            >
              <YAxis
                type="category"
                dataKey="status"
                axisLine={false}
                tickLine={false}
              />
              <Bar
                dataKey="total"
                fill="#4CAF50"
                radius={[0, 10, 10, 0]}
              >

                {data3.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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