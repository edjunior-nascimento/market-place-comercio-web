import { Box, Container, Typography } from "@mui/material";
import { InputSearch } from "../../components/feature/InputSearch";
import { useEffect, useState } from "react";
import SelectInput from "../../components/feature/SelectInput";
import CardPedido from "../../components/layouts/CardCompra";
import { CompraType } from "../../types/compra.type";
import ComprasService from "../../service/compras.service";
import { useNavigate } from "react-router-dom";


export function PedidosPage() {  

  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(false);
  const [compras, setCompras] = useState<CompraType[]>([]);

    
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

        {
          loading ? (
            <Typography>Carregando...</Typography>
          ):(
            compras.map((compra) => (
              <CardPedido key={compra.id} compra={compra}/>
            ))
          )
        }
      </Box>
    </Container>
  );
}