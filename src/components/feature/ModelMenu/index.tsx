import { ArrowForward, MoreVert } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, IconButton, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ProdutoType } from "../../../types/produto.type";
import { InputCounter } from "../../feature/InputCounter";
import { DialogConfirmation } from "../../feature/DialogConfirmation";
import { ReactNode, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


type ModelMenuProps = {
  produto?: ProdutoType;
  itens: {
    icone: ReactNode;
    label: string;
    descricao: string;
    onClick: () => void;
  }[];
  open?: boolean;
  onClose?: () => void;

};


export function ModelMenu(
  {
    produto,
    itens,
    open = false,
    onClose,
  }: ModelMenuProps
) {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        boxShadow: 24,
        outline: 'none',
      }}>
        {itens.map((item) => (
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#ffffffDD',
              boxShadow: 0,
              display: 'flex',
              flexDirection: 'row',
              px: 1,
              gap: 3,
              cursor: 'pointer',
              py:2,
              alignItems:'center',
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
            onClick={item.onClick}
          >
            <Box>
              {item.icone}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" lineHeight={1.1}>
                {item.label}
              </Typography>
              <Typography variant="subtitle1">
                {item.descricao}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Modal>
  );
}