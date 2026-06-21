import {  CheckOutlined, CreditCard, LocalActivityOutlined, Payments, Pix } from "@mui/icons-material";
import {Box, Button, Card, Divider, Typography } from "@mui/material";
import { DescontoType } from "../../../types/desconto.type";


type CardCupomProps = {
  desconto: DescontoType;
};


export function CardCupom({ desconto }: CardCupomProps) {  
  return (
    <Card sx={{backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px', border: '1px solid #e4e4e4', borderRadius: '8px', padding: '15px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <LocalActivityOutlined sx={{ color: '#0044ff' }} />
            <Typography variant="h5">
            {desconto.valorDesconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} OFF
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="#606060">
          {desconto.descricao}
        </Typography>
        <Typography sx={{border: '1px dashed #a09e9e', width: 'fit-content', px:1}} variant="body2" color="#808080" mt={1}>
            {desconto.codigo}
        </Typography>
      </Box>
    </Card>

  );
}