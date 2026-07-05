import {
  Avatar,
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
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";


export function UsuarioPage() {

  const navigate = useNavigate();


  return (
    <Container sx={{ pt: 10, pb: 4, px: { xs: 2, md: 4 } }} >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={5}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: "#dfe4f1",
          }}
        >
          <PersonIcon
            sx={{
              color: "#666",
              fontSize: 48,
            }}
          />
        </Avatar>
        <Typography
          variant="h6"
          fontWeight={600}
        >
          João da Silva
        </Typography>
        <Typography
          variant="h6"
          fontWeight={500}
          color="#666"
        >
          @joaodasilva
        </Typography>
      </Box>
      <Card
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          cursor: "pointer",
          boxShadow: "none",
          backgroundColor: "#ffffff",
        }}
        onClick={() => navigate("/dados")}

      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" gap={2}>
            <Typography
              variant="h6"
              fontWeight={600}
              lineHeight={1}
            >
              Alterar Dados
            </Typography>
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
        onClick={() => navigate("/alterar-senha")}

      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              variant="h6"
              fontWeight={600}
            >
              Mudar Senha
            </Typography>
          </Box>

          <ChevronRight
            sx={{
              color: "#222",
              fontSize: 32,
            }}
          />
        </Box>
      </Card>
    </Container>
  );
}