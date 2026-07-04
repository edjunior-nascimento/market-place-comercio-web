import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import {
    Add,
    AddPhotoAlternateOutlined,
    Close,
    DeleteOutlined,
} from "@mui/icons-material";
import { Header } from "../../components/layouts/Header";

export function EditeProdutoPage() {
    const [fotos, setFotos] = useState<string[]>([]);

    const [opcoes, setOpcoes] = useState([
        "Feijão",
        "Arroz",
    ]);

    const [novaOpcao, setNovaOpcao] = useState("");

    const adicionarFoto = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setFotos((prev) => [
            ...prev,
            URL.createObjectURL(file),
        ]);
    };

    const removerFoto = (index: number) => {
        setFotos((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const adicionarOpcao = () => {
        if (!novaOpcao.trim()) return;

        setOpcoes((prev) => [...prev, novaOpcao]);
        setNovaOpcao("");
    };

    const removerOpcao = (index: number) => {
        setOpcoes((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    return (
        <Container sx={{ padding: '10px' }}>
            <Header link="/produtos" showCartButton={false} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >

                <Box
                    display="flex"
                    gap={2}
                    flexWrap="wrap"
                    mb={3}
                    mt={2}
                    p={2}
                    bgcolor={"#FFFFFF"}
                >
                    {fotos.map((foto, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 120,
                                height: 120,
                                position: "relative",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={foto ? foto : '/sem-img.png'}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: "cover",
                                    borderRadius: 8
                                }}
                            />

                            <IconButton
                                size="small"
                                color="error"
                                onClick={() =>
                                    removerFoto(index)
                                }
                                sx={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    background: "#fff",
                                }}
                            >
                                <DeleteOutlined />
                            </IconButton>
                        </Box>
                    ))}

                    <Button
                        component="label"
                        variant="outlined"
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: 0,
                            borderWidth: 2,
                            borderStyle: "dashed",
                        }}
                    >
                        <AddPhotoAlternateOutlined />

                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={adicionarFoto}
                        />
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Nome do Produto"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Descrição"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            select
                            label="Categoria"
                            defaultValue=""
                            sx={{
                                '& .MuiSelect-root': {
                                    height: "50px",
                                }
                            }}
                        >
                            <MenuItem value="1">
                                Marmitas
                            </MenuItem>

                            <MenuItem value="2">
                                Bebidas
                            </MenuItem>

                            <MenuItem value="3">
                                Sobremesas
                            </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Valor"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Quantidade"
                        />
                    </Grid>
                </Grid>

                {/* OPÇÕES */}
                <Box mt={4}>
                    <Typography variant="h6">
                        Opções / Complementos
                    </Typography>

                    <Box
                        display="flex"
                        gap={2}
                        mt={2}
                        mb={2}
                        alignItems={'center'}
                    >
                        <TextField
                            fullWidth
                            label="Nova opção"
                            value={novaOpcao}
                            onChange={(e) => 
                                setNovaOpcao(
                                    e.target.value
                                )
                            }
                        />

                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={adicionarOpcao}
                            sx={{ height: 'fit-content', px: 3 }}
                        >
                            Incluir
                        </Button>
                    </Box>

                    <Box
                        display="flex"
                        gap={2}
                        flexWrap="wrap"
                        sx={{
                            borderWidth: 2,
                            borderStyle: "dashed",
                            p: 2,
                            borderColor: '#61616144'
                        }}
                    >
                        {opcoes.map((opcao, index) => (
                            <Box
                                key={index}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                px={2}
                                border="1px solid #B50303"
                                borderRadius={20}
                                gap={1}
                            >
                                <Typography sx={{color: "#B50303" }}>
                                    {opcao}
                                </Typography>

                                <IconButton
                                    color="error"
                                    onClick={() =>
                                        removerOpcao(index)
                                    }
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>

                </Box>

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                    mt={4}
                >
                    <Button variant="outlined">
                        Cancelar
                    </Button>

                    <Button variant="contained">
                        Salvar Produto
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}