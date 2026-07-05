import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Header } from "../../components/layouts/Header";

export function AlterarSenhaPage() {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    return (
        <Container sx={{ mt: 2, p: 1 }}>
            <Header link="/usuario" showCartButton={false} />
            
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 400,
                    }}
                >
                    Mudar Senha
                </Typography>

                <Divider />

                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                    >
                        Senha Atual
                    </Typography>

                    <TextField
                        fullWidth
                        type="password"
                        placeholder="Senha Atual"
                        value={senhaAtual}
                        onChange={(e) =>
                            setSenhaAtual(e.target.value)
                        }
                        size="small"
                    />
                </Box>

                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                    >
                        Nova Senha
                    </Typography>

                    <TextField
                        fullWidth
                        type="password"
                        placeholder="Nova Senha"
                        value={novaSenha}
                        onChange={(e) =>
                            setNovaSenha(e.target.value)
                        }
                        size="small"
                    />
                </Box>

                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                    >
                        Confirmar Senha
                    </Typography>

                    <TextField
                        fullWidth
                        type="password"
                        placeholder="Confirmar Senha"
                        value={confirmarSenha}
                        onChange={(e) =>
                            setConfirmarSenha(e.target.value)
                        }
                        size="small"
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                        px: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 115,
                            borderRadius: 10,
                            bgcolor: "#E8ECF8",
                            color: "#C50000",
                            boxShadow: "none",
                            textTransform: "none",
                            fontSize: 18,
                            "&:hover": {
                                bgcolor: "#DCE3F5",
                                boxShadow: "none",
                            },
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 115,
                            borderRadius: 10,
                            bgcolor: "#C50000",
                            color: "#FFF",
                            boxShadow: "none",
                            textTransform: "none",
                            fontSize: 18,
                            "&:hover": {
                                bgcolor: "#A60000",
                                boxShadow: "none",
                            },
                        }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}