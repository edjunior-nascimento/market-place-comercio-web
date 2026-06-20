import { Box, Container } from "@mui/material";
import { InputSearch } from "../../components/feature/InputSearch";
import { useState } from "react";
import SelectInput from "../../components/feature/SelectInput";
import CardPedido from "../../components/layouts/CardPedido";

export function PedidosPage() {  
  const [pesquisa, setPesquisa] = useState('');

  return (
    <Container sx={{ mt: 4, p: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <InputSearch pesquisa={pesquisa} setPesquisa={setPesquisa} />
        
        <Box sx={{ display: "flex", scrollbarWidth: 'none', overflowX: 'auto', flexDirection: "row", gap: 1, }}>
          <SelectInput label="Período" items={[
            { label: "Últimas 24 horas", value: "24h" },
            { label: "Última Semana", value: "5sm" },
            { label: "Último Mês", value: "1m" },
            { label: "Customizar período", value: "cs" }
          ]} />
          <SelectInput label="Status" items={[
            { label: "Pendente", value: "24h" },
            { label: "Em Atendimento", value: "5sm" },
            { label: "Em Entrega", value: "1m" },
            { label: "Finalizadas", value: "1m" },
            { label: "Canceladas", value: "cs" }
          ]} />
           <SelectInput label="Exibir por" items={[
            { label: "Status", value: "24h" },
            { label: "Nome", value: "5sm" },
            { label: "Valor", value: "1m" },
            { label: "Data", value: "cs" }
          ]} />
        </Box>

        <CardPedido codigo="123" cliente="João da Silva" valor={150.00} quantidadeItens={2} tempo="2 dias" />
        <CardPedido codigo="123" cliente="João da Silva" valor={150.00} quantidadeItens={2} tempo="2 dias" />
      </Box>
    </Container>
  );
}