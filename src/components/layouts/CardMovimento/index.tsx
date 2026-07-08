import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { MovimentoType } from "../../../types/movimento.type";
import { ArrowDownwardOutlined, ArrowUpwardOutlined, CreditCard, LocalAtm, Pix } from "@mui/icons-material";
import dayjs from "dayjs";


type CardMovimentoProps = {
  movimento: MovimentoType;
};


export function CardMovimento({ movimento }: CardMovimentoProps) {

  return (
    <Card
      key={movimento.id}
      elevation={0}
      sx={{
        p: 1.5,
        display: "flex",
        gap: 1.5,
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >

      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "16px",
          backgroundColor: movimento.tipo === "ENTRADA" ? "#01682822" : "#F55A5A22",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: movimento.tipo ===
            "ENTRADA"
            ? "#016828"
            : "#F55A5A",

          "& svg": {
            fontSize: 24,
          },
        }}
      >
        {
          movimento.tipo === "ENTRADA" ? (<ArrowUpwardOutlined />) : (<ArrowDownwardOutlined />)
        }
      </Box>

      <Box flex={1}>
        <Typography
          variant="caption"
          color="grey.500"
        >
          {dayjs(movimento.data).format('HH:mm')}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={600}
        >
          {movimento.descricao}
        </Typography>

        <Typography
          variant="caption"
          color="grey.500"
        >
          {movimento.pagamento === "PIX" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}>PIX</Box>)}
          {movimento.pagamento === "DINHEIRO" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}>Dinheiro</Box>)}
          {movimento.pagamento === "CARTAO" && (<Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#5a5a5a" }}>Cartão</Box>)}

        </Typography>
      </Box>

      <Typography
        fontWeight={600}
        sx={{ color: movimento.tipo === "ENTRADA" ? "#005512" : "#c50000" }}>
        {movimento.tipo === "SAIDA" && "-"}
        {movimento.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Typography>
    </Card>
  );
}