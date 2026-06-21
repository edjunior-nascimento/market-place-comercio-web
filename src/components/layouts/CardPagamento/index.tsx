import {  CreditCard, Payments, Pix } from "@mui/icons-material";
import {Box, Button, Card, Typography } from "@mui/material";
import { PagamentoEnum } from "../../../enum/pagamento.enum";


type CardPagamentoProps = {
  codigo: number;
  forma: PagamentoEnum;
  selecionado?: boolean;
  modoExibicao?: boolean;
  onSelecionar?: (codigo: number) => void;
};


export function CardPagamento({ codigo, forma, selecionado, modoExibicao = false, onSelecionar }: CardPagamentoProps) {  
  return (
    <Card
        sx={{
          width: '100%',
          borderRadius: 4,
          backgroundColor: '#ffffffDD',
          boxShadow: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          gap: '20px',
          height: 'stretch',
            
          border: selecionado ? '2px solid #B50303' : '2px solid transparent',
          cursor: 'pointer',

        }}
      >
      <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
        
        <Box sx={{display:"flex", flexDirection:'row', gap: '10px',alignItems: 'center' }}>
          {forma === PagamentoEnum.CARTAO && <CreditCard />}
          {forma === PagamentoEnum.PIX && <Pix />}
          {forma === PagamentoEnum.DINHEIRO && <Payments />}
          <Typography variant="h6" lineHeight={1.1}>
            {forma === PagamentoEnum.CARTAO && 'Cartão'}
            {forma === PagamentoEnum.PIX && 'PIX'}
            {forma === PagamentoEnum.DINHEIRO && 'Dinheiro'}
          </Typography>
        </Box>
        <Typography variant="subtitle1" lineHeight={1}>
          {forma === PagamentoEnum.CARTAO && 'O entregador levará a maquininha de cartão no momento da entrega'}
          {forma === PagamentoEnum.PIX && 'O pagamento deve ser feito imediatamente para proceguirmos com o pedido'}
          {forma === PagamentoEnum.DINHEIRO && 'O pagamento deverá ser realizado diretamente ao entregador na entrega'}
        </Typography>
      </Box>
      {!modoExibicao && (
        <Box
          sx={{
            px: 0,
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <Button 
            variant="contained" 
            color="primary"  
            sx={{
              background: selecionado? '#B50303':'#E2EAFA', 
              color: selecionado? '#FFFFFF':'#B50303',
              
            }} 
            onClick={() => onSelecionar?.(codigo)}>{selecionado ? 'Selecionado' : 'Selecionar'}</Button>
        </Box>
      )}

    </Card>

  );
}