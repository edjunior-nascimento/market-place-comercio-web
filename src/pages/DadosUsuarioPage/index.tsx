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

export function DadosUsuarioPage() {
    const [nome, setNome] = useState("João da Silva");
    const [login, setLogin] = useState("joaosilva");

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
                    Alterar Dados
                </Typography>

                <Divider />

                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                    >
                        Nome
                    </Typography>

                    <TextField
                        fullWidth
                        value={nome}
                        onChange={(e) =>
                            setNome(e.target.value)
                        }
                        variant="outlined"
                        size="small"
                    />
                </Box>

                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                    >
                        Login
                    </Typography>

                    <TextField
                        fullWidth
                        value={login}
                        onChange={(e) =>
                            setLogin(e.target.value)
                        }
                        variant="outlined"
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
                            textTransform: "none",
                            fontSize: 18,
                            boxShadow: "none",
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