import { useEffect, useState } from "react";
import {
    Box,
    Button,
    CardMedia,
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import {
    Add,
    AddPhotoAlternateOutlined,
    BedOutlined,
    Close,
    DeleteOutlined,
} from "@mui/icons-material";
import { Header } from "../../components/layouts/Header";
import { useNavigate, useParams } from "react-router-dom";
import ProdutoService from "../../services/produto.service";
import { ProdutoType } from "../../types/produto.type";
import { MedidasEnum } from "../../enum/medidas.enum";
import CategoriaService from "../../services/categoria.service";
import { CategoriaType } from "../../types/categoria.type";

export function EditeProdutoPage() {
    const navigate = useNavigate();

    const { produtoId } = useParams();
    const [fotos, setFotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [produto, setProduto] = useState<ProdutoType | null>(null);
    const [opcoes, setOpcoes] = useState<string[]>([]);
    const [categorias, setCategorias] = useState<CategoriaType[]>([]);
    const [error, setError] = useState<string | null>(null);
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

    const salvarProduto = () => {
        if (!produto) return;
        if (produtoId) {
            ProdutoService.editar({ ...produto, id: produtoId, componentes: opcoes })
                .then((produtoAtualizado) => {
                    setProduto(produtoAtualizado);
                    setOpcoes(produtoAtualizado.componentes || []);
                    setError(null);
                    navigate("/produtos");
                })
                .catch((error) => {
                    setError(error.response?.data?.message || "Erro ao atualizar produto");
                });
        } else {
            ProdutoService.adicionar({ ...produto, id: "", componentes: opcoes })
                .then((novoProduto) => {
                    setProduto(novoProduto);
                    setOpcoes(novoProduto.componentes || []);
                    setError(null);
                    navigate("/produtos");
                })
                .catch((error) => {
                    setError(error.response?.data?.message || "Erro ao adicionar produto");
                });
        }
    };


    async function listarCategorias() {
        CategoriaService.listar()
            .then(response => {
                setCategorias(response);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias', error);
                setError("Erro ao buscar categorias");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        setLoading(true);
        if (produtoId) {
            ProdutoService.getById(produtoId)
                .then(response => {
                    setProduto(response);
                    setOpcoes(response.componentes || []);
                })
                .catch(error => {
                    setError(error.response?.data?.message || "Erro ao buscar produto");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setProduto(null);
            setLoading(false);
        }

        async function loadData() {
            await listarCategorias();
        }
        loadData();
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
                                value={produto?.categoria ?? ""}
                                onChange={(e) =>
                                    setProduto((prev) => ({
                                        ...prev,
                                        categoria: parseInt(e.target.value),
                                    } as ProdutoType))
                                }
                            >
                                {categorias.map((categoria) => (
                                    <MenuItem key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </MenuItem>
                                ))}
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

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, mt: 2 }}>
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                Habilitar Produto
                            </Typography>
                            <Typography variant="subtitle2" color="grey.600">
                                Habilite ou Oculte a visibilidade do produto para cliente.
                            </Typography>
                        </Box>
                        <FormControlLabel
                            control={<Switch
                                checked={!produto?.oculto}
                                onChange={(e) =>
                                    setProduto((prev) => ({
                                        ...prev,
                                        oculto: !e.target.checked,
                                    } as ProdutoType))
                                } color="success" />}
                            label=""
                        />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={2}
                        mt={4}
                    >
                        <Button variant="outlined" onClick={() => navigate("/produtos")}>
                            Cancelar
                        </Button>

                        <Button variant="contained" onClick={salvarProduto}>
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