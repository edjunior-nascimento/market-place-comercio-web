import { Box, BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme, Drawer, ListItemButton, List, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MonitorOutlined from "@mui/icons-material/MonitorOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import PermIdentityOutlined from "@mui/icons-material/PermIdentityOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

const menuItems = [
  { label: "Pedidos", value: "/pedidos", icon: <ReceiptLongOutlined /> },
  { label: "Produtos", value: "/produtos", icon: <Inventory2Outlined /> },
  { label: "Caixa", value: "/caixa", icon: <MonitorOutlined /> },
  { label: "Usuário", value: "/usuario", icon: <PermIdentityOutlined /> },
  { label: "Mais", value: "/mais", icon: <MenuOutlined /> },
];

const DRAWER_WIDTH = 250;

export function MainComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const value = useMemo(() => location.pathname, [location.pathname]);

  return (
    <Box sx={{ minHeight: "100vh", pb: 7, display: {md: 'flex', sx: 'block'}, flexDirection:{md: 'row', sx: 'column'} }}>

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
                onClick={() => navigate(item.value)}
                selected={value === item.value}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 2,
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
                <ListItemIcon sx={{display:"flex", justifyContent: "center"}}>{item.icon}</ListItemIcon>
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
            <BottomNavigationAction label="Usuário" value="/usuario" icon={<PermIdentityOutlined />} />
            <BottomNavigationAction label="Mais" value="/mais" icon={<MenuOutlined />} />
          </BottomNavigation>
        </Paper>
      )}

    </Box>
  );
}