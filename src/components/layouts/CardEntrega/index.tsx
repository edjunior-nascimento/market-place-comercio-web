import { ArrowForward } from "@mui/icons-material";
import {Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { EntregaType } from "../../../types/entrega";


type CardEntregaProps = {
  entrega: EntregaType;
  selecionado?: boolean;
  modoExibicao?: boolean;
  onEditar?: () => void;
  onSelecionar?: () => void;
};


export function CardEntrega(
{
  entrega,
  selecionado,
  modoExibicao = false,
  onEditar,
  onSelecionar,
}: CardEntregaProps
) {  
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
      <Box sx={{display:'flex', flexDirection:'column', gap:'5px'}}>
        <Typography variant="h6" lineHeight={1.1}>
          {entrega.nome}
        </Typography>
        <Typography variant="subtitle1" lineHeight={1}>
          {entrega.telefone}
        </Typography>
        <Typography variant="subtitle1" lineHeight={1}>
          {entrega.endereco}, {entrega.numero}
        </Typography>
        <Typography variant="subtitle1" lineHeight={1}>
          {entrega.referencia}
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
        <Button variant="text" sx={{color:'#00089C'}} onClick={onEditar}>Editar</Button>
        <Button 
          variant="contained" 
          color="primary"  
          sx={{
            background: selecionado? '#B50303':'#E2EAFA', 
            color: selecionado? '#FFFFFF':'#B50303'
            
          }} 
          onClick={onSelecionar}>{selecionado ? 'Selecionado' : 'Selecionar'}</Button>
      </Box>
      )}
    </Card>

  );
}