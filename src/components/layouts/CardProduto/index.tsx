import { ArrowForward, DeleteOutlined, Edit, MoreVert, VisibilityOffOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ProdutoType } from "../../../types/produto.type";
import { InputCounter } from "../../feature/InputCounter";
import { DialogConfirmation } from "../../feature/DialogConfirmation";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ModelMenu } from "../../feature/ModelMenu";


type CardProdutoProps = {
  produto: ProdutoType;
  onClick?: () => void;
};


export function CardProduto(
  {
    produto,
    onClick,
  }: CardProdutoProps
) {
  const [open, setOpen] = useState(false);
  const [openOcultar, setOpenOcultar] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [quant, setQuant] = useState(produto.quantidade);

  return (
    <div>
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
        cursor:'pointer'
      }}
      onClick={() => setOpen(true)}
    >
      <Box>
        <CardMedia
          component="img"
          image={produto.imagens[0] ? produto.imagens[0] : '/sem-img.png'}
          alt={produto.nome}
          sx={{ width: '100px', height: '100px' }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '5px', gap: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" lineHeight={1.1}>
            {produto.nome}
          </Typography>
          <Typography variant="subtitle1">
            {produto.descricao}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center',}}>
          <Typography variant="h6" >
            R$
            {produto.preco.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
          {/* <InputCounter min={0} initialValue={quant}  onChange={(value) => {if(value === 0){setOpen(true);}else{setQuant(value)}}}/> */}
        </Box>
      </Box>

      <IconButton>
        <ChevronRightIcon sx={{ fontSize: 24 }} />
      </IconButton>

    
      
    </Card>
      <DialogConfirmation
        titulo="Ocultar Produto"
        descricao="Deseja ocultar este produto?"
        open={openOcultar}
        onConfirmar={() => console.log('produto removido')}
        onCancelar={() => setOpenOcultar(false)}
      />
      <DialogConfirmation
        titulo="Excluir Produto"
        descricao="Deseja excluir este produto?"
        open={openExcluir}
        onConfirmar={() => console.log('produto removido')}
        onCancelar={() => setOpenExcluir(false)}
      />
    <ModelMenu 
      itens={
        [
          {label:'Editar', descricao:'Editar produto', icone:<Edit />, onClick:()=>console.log('clicou no editar') },
          {label:'Ocultar', descricao:'Oculta a exibição do produto', icone:<VisibilityOffOutlined />, onClick:()=>{ setOpenOcultar(true); setOpen(false)}},
          {label:'Excluir', descricao:'Excluir produto definivamente', icone:<DeleteOutlined />, onClick:()=>{ setOpenExcluir(true); setOpen(false)} },
          
        ]} produto={produto}  open={open} onClose={() => setOpen(false)}/>
    </div>
  );
}