import {
  Box,
  Card,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  StorefrontOutlined,
  AssessmentOutlined,
  LogoutOutlined,
  ChevronRight,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function MaisPage() {

  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isDesktop) {
      navigate("/pedidos");
    }
  }, [isDesktop]);

  return (
    <Container sx={{ pt: 10, pb: 4, px: { xs: 2, md: 4 } }} >
      <Card
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          cursor: "pointer",
          boxShadow: "none",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" gap={2}>
            <StorefrontOutlined
              sx={{
                fontSize: 28,
                color: "#1f1f1f",
              }}
            />

            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                lineHeight={1}
              >
                Empresa
              </Typography>

              <Box display="flex" gap={1}>
                <Typography
                  sx={{
                    color: "#008a07",
                    fontWeight: 500,
                  }}
                >
                  Aberto
                </Typography>

                <Typography color="#666666">
                  Fecha 15:00
                </Typography>
              </Box>
            </Box>
          </Box>

          <ChevronRight
            sx={{
              color: "#222",
              fontSize: 32,
            }}
          />
        </Box>
      </Card>
      <Card
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          cursor: "pointer",
          boxShadow: "none",
          backgroundColor: "#ffffff"
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <AssessmentOutlined
              sx={{
                fontSize: 28,
                color: "#666666",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
              color="#666666"
            >
              Relatórios
            </Typography>
          </Box>

          <ChevronRight
            sx={{
              color: "#616161",
              fontSize: 32,
            }}
          />
        </Box>
      </Card>
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          cursor: "pointer",
          boxShadow: "none",
          backgroundColor: "#ffffff"
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <LogoutOutlined
              sx={{
                fontSize: 28,
                color: "#111",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
            >
              Sair
            </Typography>
          </Box>

          <ChevronRight
            sx={{
              color: "#616161",
              fontSize: 32,
            }}
          />
        </Box>
      </Card>
    </Container>
  );
}