import { useEffect, useState } from "react";
import {
    Box,
    Button,
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
import { useParams } from "react-router-dom";
import ProdutoService from "../../service/produto.service";
import { ProdutoType } from "../../types/produto.type";
import { MedidasEnum } from "../../enum/medidas.enum";

export function EditeProdutoPage() {

    const { produtoId } = useParams();
    const [fotos, setFotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [produto, setProduto] = useState<ProdutoType | null>(null);
    const [opcoes, setOpcoes] = useState<string[]>([]);

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

    useEffect(() => {
        setLoading(true);
        if (produtoId) {
            ProdutoService.getById(produtoId)
                .then(response => {
                    console.log('Produto encontrado:', response);
                    setProduto(response);
                    setOpcoes(response.componentes || []);
                })
                .catch(error => {
                    console.error('Erro ao buscar compra', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setProduto(null);
            setLoading(false);
        }
    }, [])

    return (
        <Container sx={{ padding: '10px' }}>
            <Header link="/produtos" showCartButton={false} />
            {!loading ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        px: { xs: '0px', md: '200px' },
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
                                value={produto?.nome ?? ""}
                                onChange={(e) =>
                                    setProduto((prev) => ({
                                        ...prev,
                                        nome: e.target.value,
                                    } as ProdutoType))
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Descrição"
                                value={produto?.descricao ?? ""}
                                onChange={(e) =>
                                    setProduto((prev) => ({
                                        ...prev,
                                        descricao: e.target.value,
                                    } as ProdutoType))
                                }
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

                        <Grid size={{ xs: 12, md: 2 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Valor"
                                value={produto?.preco ?? ""}
                                onChange={(e) =>
                                    setProduto((prev) => ({
                                        ...prev,
                                        preco: parseFloat(e.target.value),
                                    } as ProdutoType))
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantidade"
                                value={produto?.quantidade ?? ""}
                                onChange={(e) =>
                                    setProduto((prev) => ({
                                        ...prev,
                                        quantidade: parseInt(e.target.value),
                                    } as ProdutoType))
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }}>
                            <TextField
                                fullWidth
                                select
                                label="Unidade de Medida"
                                sx={{
                                    '& .MuiSelect-root': {
                                        height: "50px",
                                    }
                                }}
                                value={produto?.unidade}
                                onChange={(e) =>
                                    setProduto((prev) =>
                                        prev
                                            ? { ...prev, unidade: e.target.value }
                                            : null
                                    )
                                }
                            >
                                {Object.values(MedidasEnum).map((medida) => (
                                    <MenuItem
                                        key={medida.unidade}
                                        value={medida.unidade}
                                    >
                                        {`${medida.unidade} - (${medida.descricao})`}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                            {opcoes.length === 0 && (
                                <Typography variant="body2" color="#999999">
                                    Nenhuma opção adicionada.
                                </Typography>
                            )}
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
                                    <Typography sx={{ color: "#B50303" }}>
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
            ) : (
                <Typography variant="h6" align="center" mt={4}>
                    Carregando...
                </Typography>
            )}
        </Container>
    );
}