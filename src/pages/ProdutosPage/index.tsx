import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { InputSearch } from "../../components/feature/InputSearch";
import { CategoriaType } from "../../types/categoria.type";
import { ButtonRadio } from "../../components/feature/ButtonRadio";
import CategoriaService from "../../services/categoria.service";
import ProdutoService from "../../services/produto.service";
import { ProdutoType } from "../../types/produto.type";
import { useNavigate } from "react-router-dom";
import { CardProduto } from "../../components/layouts/CardProduto";
import { Add, DeleteOutlined, Edit, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { DialogConfirmation } from "../../components/feature/DialogConfirmation";
import { ModelMenu } from "../../components/feature/ModelMenu";

export function ProdutosPage() {

  const navigate = useNavigate();

  const [pesquisa, setPesquisa] = useState('');
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoType>();
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>(categorias[0]?.id || '');
  const categoriaRefs = useRef<Record<string, HTMLElement | null>>({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);


  useEffect(() => {
    setLoading(true);

    async function loadData() {
      await getCategorias();
      await getProdutos();
    }
    loadData();
  }, []);

  async function getCategorias() {
    CategoriaService.listar()
      .then(response => {
        setCategorias(response);
      })
      .catch(error => {
        console.error('Erro ao buscar entregas', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getProdutos() {
    ProdutoService.listar()
      .then(response => {
        setProdutos(response);
      })
      .catch(error => {
        console.error('Erro ao buscar entregas', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const filtroProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(pesquisa.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) ||
    produto.id.toString().includes(pesquisa)
  );

  const scrollCategoria = (id: string) => {
    setCategoriaSelecionada(id);
    categoriaRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleOcultar = () => {
    if (produtoSelecionado) {
      ProdutoService.disponibilidade(produtoSelecionado.id, !produtoSelecionado.oculto)
        .then(() => {
          setProdutos(prevProdutos => prevProdutos.map(produto => {
            if (produto.id === produtoSelecionado.id) {
              return { ...produto, oculto: !produto.oculto };
            }
            return produto;
          }));
        })
        .catch((error) => {
          console.error('Erro ao ocultar produto', error);
        });
    }
  }

  const handleExcluir = () => {
    setOpenExcluir(false);
    if (produtoSelecionado) {
      ProdutoService.deletar(produtoSelecionado.id)
        .then(() => {
          setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id !== produtoSelecionado.id));
        })
        .catch((error) => {
          console.error('Erro ao excluir produto', error);
        });
    }
  }


  return (
    <Container sx={{ mt: 4, p: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <InputSearch pesquisa={pesquisa} setPesquisa={setPesquisa} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            gap: '10px',
            scrollbarWidth: 'none',
            background: '#F5F5F5',
            position: "sticky",
            top: 0,
            zIndex: 10,
          }} px={1} py={1}>

          {categorias.map((categoria) => (
            <ButtonRadio key={categoria.id} label={categoria.nome} onClick={() => scrollCategoria(categoria.id)} ativado={categoria.id === categoriaSelecionada} />
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            justifyContent: 'end'
          }} px={1} py={1}>
          <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => navigate('/categoria')}>
            Editar Categorias
          </Button>
          <Button variant="outlined" size="small" startIcon={<Add />} disabled={categorias.length === 0} onClick={() => navigate('/produto')}>
            Adicionar Produto
          </Button>
        </Box>
        <Box>
          {
            loading ? (
              <Typography>Carregando...</Typography>
            ) : (
              categorias.map((categoria) => (
                <Box key={categoria.id}>
                  {!(pesquisa.length > 0) &&
                    <Typography
                      py={2}
                      variant="h5"
                      ref={(el: HTMLElement | null) => {
                        if (el) categoriaRefs.current[categoria.id] = el;
                      }}
                    >
                      {categoria.nome}
                    </Typography>
                  }
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      padding: '1rem',
                    }}
                  >
                    {

                      filtroProdutos.filter(produto => produto.categoria === Number(categoria.id)).map((produto) => (
                        <CardProduto
                          produto={produto}
                          onClick={() => { setOpen(true); setProdutoSelecionado(produto); }}
                        />
                      ))
                    }
                  </Box>
                </Box>
              ))
            )
          }
        </Box>
      </Box>
      <DialogConfirmation
        titulo="Excluir Produto"
        descricao="Deseja excluir este produto?"
        open={openExcluir}
        onConfirmar={handleExcluir}
        onCancelar={() => setOpenExcluir(false)}
      />
      <ModelMenu
        itens={
          [
            { label: 'Editar', descricao: 'Editar produto', icone: <Edit />, onClick: () => { if (produtoSelecionado) { navigate(`/produto/${produtoSelecionado.id}`); setOpen(false) } } },
            { label: (produtoSelecionado?.oculto ? 'Mostrar' : 'Ocultar'), descricao: (produtoSelecionado?.oculto ? 'Exibir o produto' : 'Oculta a exibição do produto'), icone: (produtoSelecionado?.oculto ? <VisibilityOutlined /> : <VisibilityOffOutlined />), onClick: () => { if (produtoSelecionado) { handleOcultar(); setOpen(false) } } },
            { label: 'Excluir', descricao: 'Excluir produto definivamente', icone: <DeleteOutlined />, onClick: () => { if (produtoSelecionado) { setOpenExcluir(true); setOpen(false) } } },

          ]} produto={produtoSelecionado} open={open} onClose={() => setOpen(false)} />
    </Container>
  );

}