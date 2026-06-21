import {Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { PedidoType } from "../../../types/pedido.type";


type CardPedidoProps = {
  pedido: PedidoType;
};


export function CardPedido({ pedido }: CardPedidoProps) {  
  
  const [quant, setQuant] = useState(pedido.quantidade);
  const [valor, setValor] = useState(pedido.precoTotal * pedido.quantidade);

  return (
    
    <Card
        sx={{
          width: '100%',
          borderRadius: 4,
          backgroundColor: '#ffffffDD',
          boxShadow: 0,
          display: 'flex',
          flexDirection: 'row',
          padding: '5px',
          gap: '10px',
        }}
      >
        <Box>
          <CardMedia
            component="img"
            image={pedido.produto.imagens[0]?pedido.produto.imagens[0]:'/sem-img.png'}
            alt={pedido.produto.nome}
            sx={{ width: '100px', height: '100px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding:'5px', gap:'20px'}}>
          <Box sx={{display:'flex', flexDirection:'column', gap:'5px'}}>
            <Typography variant="h6" lineHeight={1.1}>
              {pedido.produto.nome}
            </Typography>
            <Typography variant="subtitle1" lineHeight={1}>
              {pedido.produto.componentes.join(', ')}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 0,
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1">
              Quant.: {quant}
            </Typography>

            <Typography variant="h6" fontWeight="bold">
              {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
          </Box>
        </Box>
    </Card>

  );
}