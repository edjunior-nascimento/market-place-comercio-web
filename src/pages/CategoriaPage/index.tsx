import { useState } from "react";
import {
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

type Categoria = {
    id: number;
    nome: string;
};

export function CategoriaPage() {
    const [categorias, setCategorias] = useState<Categoria[]>([
        { id: 1, nome: "Bebidas" },
        { id: 2, nome: "Lanches" },
    ]);

    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [categoriaEditando, setCategoriaEditando] =
        useState<Categoria | null>(null);

    const abrirNovaCategoria = () => {
        setCategoriaEditando(null);
        setNome("");
        setOpen(true);
    };

    const editarCategoria = (categoria: Categoria) => {
        setCategoriaEditando(categoria);
        setNome(categoria.nome);
        setOpen(true);
    };

    const salvarCategoria = () => {
        if (!nome.trim()) return;

        if (categoriaEditando) {
            setCategorias((prev) =>
                prev.map((c) =>
                    c.id === categoriaEditando.id
                        ? { ...c, nome }
                        : c
                )
            );
        } else {
            setCategorias((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    nome,
                },
            ]);
        }

        setOpen(false);
    };

    const excluirCategoria = (id: number) => {
        setCategorias((prev) =>
            prev.filter((c) => c.id !== id)
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
                    px: { xs: '0px', md: '200px' },
                }}
            >
                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        borderBottom: '1px solid #AEAEAE',
                        gap:1,
                        paddingBottom:3
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
                        px:1
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
                                            excluirCategoria(categoria.id)
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
                <Button variant="text" sx={{color:"#2e17b1"}} onClick={abrirNovaCategoria}><Add /> Adicionar Categoria</Button>
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
                        onChange={(e) => setNome(e.target.value)}
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