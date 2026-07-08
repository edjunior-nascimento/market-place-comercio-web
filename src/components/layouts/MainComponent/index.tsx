import { Box, BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme, Drawer, ListItemButton, List, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/autenticacao.slice";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MonitorOutlined from "@mui/icons-material/MonitorOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import PermIdentityOutlined from "@mui/icons-material/PermIdentityOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import Storefront from "@mui/icons-material/Storefront";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import Logout from "@mui/icons-material/Logout";


const DRAWER_WIDTH = 250;

export function MainComponent() {
  const navigate = useNavigate();
    const dispatch = useDispatch();

  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const value = useMemo(() => location.pathname, [location.pathname]);
  const menuItems = [
    { label: "Pedidos", value: "/pedidos", icon: <ReceiptLongOutlined />, onClick: () => { navigate('/pedidos') } },
    { label: "Produtos", value: "/produtos", icon: <Inventory2Outlined />, onClick: () => { navigate('/produtos') } },
    { label: "Caixa", value: "/caixa", icon: <MonitorOutlined />, onClick: () => { navigate('/caixa') } },
    { label: "Relatórios", value: "/relatorios", icon: <DescriptionOutlined />, onClick: () => { navigate('/relatorios') } },
    { label: "Empresa", value: "/empresa", icon: <Storefront />, onClick: () => { navigate('/empresa') } },
    { label: "Usuário", value: "/usuario", icon: <PermIdentityOutlined />, onClick: () => { navigate('/usuario') } },
    { label: "Sair", value: "/sair", icon: <Logout />, onClick: () => { dispatch(logout()) } },
  ];

  return (
    <Box sx={{ minHeight: "100vh", pb: 7, display: { md: 'flex', sx: 'block' }, flexDirection: { md: 'row', sx: 'column' } }}>

      {isDesktop && (

        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: "#f5f5f5",
            },
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.value}
                onClick={item.onClick}
                selected={value === item.value}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 1,
                  "&.Mui-selected": {
                    "& .MuiListItemIcon-root": {
                      color: "#d50000",
                    },
                    "& .MuiListItemText-primary": {
                      color: "#d50000",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "transparent",
                    },

                  },
                }}
              >
                <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}

      <Box
        sx={{
          flex: 1,
          pb: isDesktop ? 0 : 7,
        }}
      >
        <Outlet />
      </Box>
      {!isDesktop && (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => {
              if (typeof newValue === "string") {
                navigate(newValue);
              }
            }}
          >
            <BottomNavigationAction label="Pedidos" value="/pedidos" icon={<ReceiptLongOutlined />} />
            <BottomNavigationAction label="Produtos" value="/produtos" icon={<Inventory2Outlined />} />
            <BottomNavigationAction label="Caixa" value="/caixa" icon={<MonitorOutlined />} />
            <BottomNavigationAction label="Relatórios" value="/relatorios" icon={<DescriptionOutlined />} />
            <BottomNavigationAction label="Mais" value="/mais" icon={<MenuOutlined />} />
          </BottomNavigation>
        </Paper>
      )}

    </Box>
  );
}