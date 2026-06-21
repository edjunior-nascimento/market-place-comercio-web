import { ArrowBack, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, Container, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

type HeaderProps = {
  link: string;
  showCartButton?: boolean;
  quantidadePedidos?: number
};

export function Header({ link, showCartButton = true, quantidadePedidos }: HeaderProps) {  
  return (
    <Box sx={{ height:'64px'}}>
      <AppBar position="fixed" elevation={0} color="default" sx={{width:'100%', top:0, zIndex: 10 }}>
      <Toolbar sx={{display:'flex',  justifyContent: 'space-between', padding:0}}>
          <Link to={link} style={{ textDecoration: 'none', color:'inherit' }}>        
            <IconButton color="inherit">
              <ArrowBack />
            </IconButton>
          </Link>
          {showCartButton && (
            <Link to="/pedido" style={{ textDecoration: 'none' }}>
              <IconButton size="large" color="primary" sx={{marginRight:'10px'}}>
                <Badge badgeContent={quantidadePedidos} color="error">
                  <ShoppingCartOutlined fontSize="small"/>
                </Badge>
              </IconButton>
            </Link>
          )}
      </Toolbar>
      </AppBar>
    </Box>
  );
}