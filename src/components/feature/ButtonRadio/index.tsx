import { Box, Button } from "@mui/material";

interface ButtonRadioProps {
  label: string;
  ativado?: boolean;
  onClick?: () => void;
}

export function ButtonRadio({ label, ativado, onClick }: ButtonRadioProps) {  
  return (
    <Box>
      <Button 
        variant={ativado ? "contained" : "outlined"}
        color={ativado ? "error" : "primary"}
        disableElevation
        onClick={onClick}
        >
        {label}
      </Button>
    </Box>
  );
}