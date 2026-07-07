import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import { Add, Delete, DeleteOutlined, Edit, EditOutlined } from "@mui/icons-material";
import { Header } from "../../components/layouts/Header";
import CategoriaService from "../../service/categoria.service";
import { CategoriaType } from "../../types/categoria.type";



export function CategoriaPage() {
    const [categorias, setCategorias] = useState<CategoriaType[]>([]);

    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [categoriaEditando, setCategoriaEditando] =
        useState<CategoriaType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        async function loadData() {
            await listarCategorias();
        }
        loadData();
    }, []);

    const abrirNovaCategoria = () => {
        setCategoriaEditando(null);
        setNome("");
        setOpen(true);
    };

    const editarCategoria = (categoria: CategoriaType) => {
        setCategoriaEditando(categoria);
        setNome(categoria.nome);
        setOpen(true);
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

    const salvarCategoria = () => {
        if (!nome.trim()) return;

        if (categoriaEditando) {
            CategoriaService.editar({ ...categoriaEditando, nome })
                .then((categoriaAtualizada) => {
                    setCategorias((prev) =>
                        prev.map((c) =>
                            c.id === categoriaAtualizada.id
                                ? categoriaAtualizada
                                : c
                        )
                    );
                })
                .catch((error) => {
                    console.error("Erro ao editar categoria", error);
                    setError("Erro ao editar categoria");
                });
        } else {
            CategoriaService.adicionar({ id: "", nome })
                .then((novaCategoria) => {
                    setCategorias((prev) => [...prev, novaCategoria]);
                })
                .catch((error) => {
                    console.error("Erro ao adicionar categoria", error);
                    setError("Erro ao adicionar categoria");
                });
        }
        setOpen(false);
    };

    const excluirCategoria = (id: number) => {
        CategoriaService.deletar(id)
            .then(() => {
                setCategorias((prev) =>
                    prev.filter((c) => Number(c.id) !== id)
                );
            })
            .catch((error) => {
                setError(error.response?.data?.message || "Erro ao excluir categoria");
            });
    };

    return (
        <Container sx={{ padding: '10px' }}>
            <Header link="/produtos" showCartButton={false} />

            {error && (
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    px: { xs: '0px', md: '200px' },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: '1px solid #AEAEAE',
                        gap: 1,
                        paddingBottom: 3
                    }}
                >
                    <Typography variant="h5">
                        Categorias de Produto
                    </Typography>
                    <Typography variant="subtitle1">
                        É uma forma de organizar os seus produtos por sessões
                    </Typography>

                </Box>

                <List
                    sx={{
                        px: 1
                    }}
                >
                    {categorias.map((categoria) => (
                        <ListItem
                            key={categoria.id}
                            secondaryAction={
                                <>
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            editarCategoria(categoria)
                                        }
                                    >
                                        <EditOutlined />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            excluirCategoria(Number(categoria.id))
                                        }
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText primary={categoria.nome} />
                        </ListItem>
                    ))}
                </List>
                <Button variant="text" sx={{ color: "#2e17b1" }} onClick={abrirNovaCategoria}><Add /> Adicionar Categoria</Button>
            </Box>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {categoriaEditando
                        ? "Editar Categoria"
                        : "Nova Categoria"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Nome da Categoria"
                        value={nome}
                        onChange={(e) => setNome(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={salvarCategoria}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}