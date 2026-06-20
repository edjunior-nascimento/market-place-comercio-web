import { Search } from "@mui/icons-material";
import { Box, InputBase } from "@mui/material";

interface InputSearchProps {
  pesquisa: string;
  setPesquisa: (value: string) => void;
}

export function InputSearch({ pesquisa, setPesquisa }: InputSearchProps) {  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '50px', gap:'5px', border:'1px solid #DDD'}} px={2} py={1}>
      <Search />
      <InputBase 
        placeholder="Pesquisar" 
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
    </Box>
  );
}