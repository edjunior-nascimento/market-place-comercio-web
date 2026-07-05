import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { MoviementoType } from "../../../types/movimento.type";


type CardMovimentoProps = {
  movimento: MoviementoType;
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
          width: 5,
          height: 70,
          borderRadius: "4px",
          bgcolor:
            movimento.tipo ===
              "entrada"
              ? "#5C6EF8"
              : "#F55A5A",
        }}
      />

      <Box flex={1}>
        <Typography
          fontWeight={700}
          sx={{ lineHeight: 1.2 }}
        >
          {movimento.nome}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {movimento.descricao}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {movimento.data}
        </Typography>
      </Box>

      <Typography
        fontWeight={500}
        color={
          movimento.tipo ===
            "entrada"
            ? "inherit"
            : "error"
        }
      >
        {movimento.valor < 0
          ? `-R$ ${Math.abs(
            movimento.valor
          ).toFixed(2)}`
          : `R$ ${movimento.valor.toFixed(
            2
          )}`}
      </Typography>
    </Card>
  );
}