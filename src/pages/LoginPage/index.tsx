import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/autenticacao.slice";

export function LoginPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUsuario, setLoginUsuario] = useState("");
  const [senhaUsuario, setSenhaUsuario] = useState("");

  const { loading, error } = useSelector(
    (state: any) => state.autenticacao
  )

  const handleLogin = () => {
    dispatch(login({ login: loginUsuario, senha: senhaUsuario }) as any);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#efefef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 320,
            bgcolor: "transparent",
          }}
        >
          <Box
            display="flex"
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
          </Box>

          <Box mb={2}>
            <Typography
              variant="body2"
              color="text.primary"
              mb={0.5}
            >
              Login
            </Typography>

            <TextField
              fullWidth
              placeholder="Login"
              variant="outlined"
              size="small"
              value={loginUsuario}
              onChange={(e) => setLoginUsuario(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Box mb={4}>
            <Typography
              variant="body2"
              color="text.primary"
              mb={0.5}
            >
              Senha
            </Typography>

            <TextField
              fullWidth
              type="password"
              placeholder="Senha"
              variant="outlined"
              size="small"
              value={senhaUsuario}
              onChange={(e) => setSenhaUsuario(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            loading={loading}
            disabled={loading}
            sx={{
              bgcolor: "#d50000",
              borderRadius: 10,
              py: 1.4,
              textTransform: "none",
              fontSize: 18,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#b70000",
                boxShadow: "none",
              },
            }}
          >
            Entrar
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}