import { ArrowForward, DeleteOutlined, Edit, MoreVert, VisibilityOffOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ProdutoType } from "../../../types/produto.type";
import { InputCounter } from "../../feature/InputCounter";
import { DialogConfirmation } from "../../feature/DialogConfirmation";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ModelMenu } from "../../feature/ModelMenu";
import ProdutoService from "../../../services/produto.service";


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
          cursor: 'pointer',
          opacity: produto.oculto ? 0.4 : 1
        }}
        onClick={onClick}
      >
        <Box>
          <CardMedia
            component="img"
            image={produto.imagens ? produto.imagens[0] : '/sem-img.png'}
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
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center', }}>
            <Typography variant="h6" >
              R$
              {produto.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Box>

        <IconButton>
          <ChevronRightIcon sx={{ fontSize: 24 }} />
        </IconButton>



      </Card>

    </div>
  );
}