const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // para aceitar JSON no body

//PRODUTOS
app.get('/api/produtos', (req, res) => {      
  const filePath = path.join(__dirname, 'json/produtos.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos produtos",
        data: null
      });
    }

    try {
      const produtos = JSON.parse(data);
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Produtos retornados com sucesso",
        data: produtos
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar produtos",
        data: null
      });
    }
  });
});

app.get('/api/produto/:id', (req, res) => {      
  const filePath = path.join(__dirname, 'json/produtos.json');
  const { id } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos produtos",
        data: null
      });
    }

    try {
      const produtos = JSON.parse(data);
      const produto = produtos.find(p => p.id === id);

      if (!produto) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Produto não encontrado",
          data: null
        });
      }

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Produto retornado com sucesso",
        data: produto
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar produtos",
        data: null
      });
    }
  });
});

app.post('/api/produtos', (req, res) => {
  const filePath = path.join(__dirname, 'json/produtos.json');
  const newProduto = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos produtos",
        data: null
      });
    }

    try {
      const produtos = JSON.parse(data);
      const maxNumber = produtos.reduce((max, produto) => {
        const match = produto.id?.match(/\d+/);
        return Math.max(max, match ? parseInt(match[0]) : 0);
      }, 0);
      newProduto.id = !newProduto.id || newProduto.id === "" ? `PRT${String(maxNumber + 1).padStart(3, '0')}` : newProduto.id;
      produtos.push(newProduto);

      fs.writeFile(filePath, JSON.stringify(produtos, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            status: "error",
            message: "Erro ao salvar o novo produto",
            data: null
          });
        }

        return res.status(201).json({
          code: 201,
          status: "success",
          message: "Produto adicionado com sucesso",
          data: newProduto
        });
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar produtos",
        data: null
      });
    }
  });
});

app.patch('/api/produtos/:id/oculto', (req, res) => {
  const filePath = path.join(__dirname, 'json/produtos.json');
  const { id } = req.params;
  const { oculto } = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos produtos",
        data: null
      });
    }

    try {
      const produtos = JSON.parse(data);
      const index = produtos.findIndex(p => p.id === id);
      if (index === -1) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Produto não encontrado",
          data: null
        });
      }

      produtos[index].oculto = oculto;

      fs.writeFile(filePath, JSON.stringify(produtos, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            status: "error",
            message: "Erro ao atualizar o produto",
            data: null
          });
        }

        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Produto atualizado com sucesso",
          data: produtos[index]
        });
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar produtos",
        data: null
      });
    }
  });
});

app.put('/api/produtos/:id', (req, res) => {
  const filePath = path.join(__dirname, 'json/produtos.json');
  const { id } = req.params;
  const updatedProduto = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos produtos",
        data: null
      });
    }

    try {
      const produtos = JSON.parse(data);
      const index = produtos.findIndex(p => p.id === id);
      if (index === -1) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Produto não encontrado",
          data: null
        });
      }

      produtos[index] = { ...produtos[index], ...updatedProduto };

      fs.writeFile(filePath, JSON.stringify(produtos, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            status: "error",
            message: "Erro ao atualizar o produto",
            data: null
          });
        }

        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Produto atualizado com sucesso",
          data: produtos[index]
        });
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar produtos",
        data: null
      });
    }
  });
});

app.delete('/api/produtos/:id', (req, res) => {
  const filePath = path.join(__dirname, 'json/produtos.json');
  const { id } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos produtos",
        data: null
      });
    }

    try {
      const produtos = JSON.parse(data);
      const index = produtos.findIndex(p => p.id === id);
      if (index === -1) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Produto não encontrado",
          data: null
        });
      }

      produtos.splice(index, 1);

      fs.writeFile(filePath, JSON.stringify(produtos, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            status: "error",
            message: "Erro ao excluir o produto",
            data: null
          });
        }

        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Produto excluído com sucesso",
          data: null
        });
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar produtos",
        data: null
      });
    }
  });
});

//CAIXA
app.get('/api/caixa/:date', (req, res) => {      
  const filePath = path.join(__dirname, 'json/caixa.json');
  const { date } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados do caixa",
        data: null
      });
    }

    try {
      const caixa = JSON.parse(data);
      const registro = caixa.filter(c => c.data.split('T')[0] === date);

      if (!registro) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Registro não encontrado",
          data: null
        });
      }

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Registro retornado com sucesso",
        data: registro
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar caixa",
        data: null
      });
    }
  });
});


//COMPRAS
app.get('/api/compras', (req, res) => {      
  const filePath = path.join(__dirname, 'json/compras.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados das compras",
        data: null
      });
    }

    try {
      const compras = JSON.parse(data);
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Compras retornadas com sucesso",
        data: compras
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar compras",
        data: null
      });
    }
  });
});

app.get('/api/compra/:id', (req, res) => {      
  const filePath = path.join(__dirname, 'json/compras.json');
  const { id } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados das compras",
        data: null
      });
    }

    try {
      const compras = JSON.parse(data);
      const compra = compras.find(c => c.id === id);

      if (!compra) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Compra não encontrada",
          data: null
        });
      }

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Compra retornado com sucesso",
        data: compra
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar compras",
        data: null
      });
    }
  });
});

app.get('/api/compras/:date', (req, res) => {      
  const filePath = path.join(__dirname, 'json/compras.json');
  const { date } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados das compras",
        data: null
      });
    }

    try {
      const compras = JSON.parse(data);
      const compra = compras.filter(c => c.data.split('T')[0] === date);
      if (!compra) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Compra não encontrada",
          data: null
        });
      }

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Compra retornado com sucesso",
        data: compra
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar compras",
        data: null
      });
    }
  });
});

//USUARIO
app.post('/api/usuario/login', (req, res) => {      
  const filePath = path.join(__dirname, 'json/usuarios.json');
  const { login, senha } = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos usuários",
        data: null
      });
    }

    try {
      const usuarios = JSON.parse(data);
      const usuarioEncontrado = usuarios.find(u => u.login === login && u.senha === senha);

      if (!usuarioEncontrado) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Usuário ou Senha incorretos",
          data: null
        });
      }

      const token = crypto.randomBytes(16).toString('hex');
      
      //editar token do usuarioencontrado no arquivo json
      usuarioEncontrado.token = token;
      fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf8');
      
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Usuário autenticado com sucesso",
        data: {
          ...usuarioEncontrado,
          token: token,
          senha: ""
        }
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar os dados dos usuários",
        data: null
      });
    }
  });
});

app.post('/api/usuario/validar', (req, res) => {      
  const filePath = path.join(__dirname, 'json/usuarios.json');
  const { token } = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos usuários",
        data: null
      });
    }

    try {
      const usuarios = JSON.parse(data);
      const usuarioEncontrado = usuarios.find(u => u.token === token);

      if (!usuarioEncontrado) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Token inválido",
          data: null
        });
      }

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Token válido",
        data: usuarioEncontrado
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar os dados dos usuários",
        data: null
      });
    }
  });
});

//CUPONS
app.get('/api/cupons/:codigo', (req, res) => {      
  const filePath = path.join(__dirname, 'json/cupons.json');
  const { codigo } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados dos cupons",
        data: null
      });
    }

    try {
      const cupons = JSON.parse(data);
      const cupom = cupons.find(c => c.codigo === codigo);

      if (!cupom) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Cupom não encontrado",
          data: null
        });
      }

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Cupom retornado com sucesso",
        data: cupom
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar cupons",
        data: null
      });
    }
  });
});

//CATEGORIAS
app.get('/api/categorias', (req, res) => {      
  const filePath = path.join(__dirname, 'json/categorias.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados das categorias",
        data: null
      });
    }

    try {
      const categorias = JSON.parse(data);
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Categorias retornadas com sucesso",
        data: categorias
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar categorias",
        data: null
      });
    }
  });
});

app.post('/api/categorias', (req, res) => {
  const filePath = path.join(__dirname, 'json/categorias.json');
  const newCategoria = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados das categorias",
        data: null
      });
    }

    try {
      const categorias = JSON.parse(data);
      const maxId = categorias.reduce((max, categoria) => Math.max(max, categoria.id), 0);
      newCategoria.id = maxId + 1;
      categorias.push(newCategoria);

      fs.writeFile(filePath, JSON.stringify(categorias, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            status: "error",
            message: "Erro ao salvar a nova categoria",
            data: null
          });
        }

        return res.status(201).json({
          code: 201,
          status: "success",
          message: "Categoria adicionada com sucesso",
          data: newCategoria
        });
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar categorias",
        data: null
      });
    }
  });
});

app.put('/api/categorias/:id', (req, res) => {
  const filePath = path.join(__dirname, 'json/categorias.json');
  const { id } = req.params;
  const updatedCategoria = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados das categorias",
        data: null
      });
    }

    try {
      const categorias = JSON.parse(data);
      const index = categorias.findIndex(c => c.id === parseInt(id));
      if (index === -1) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Categoria não encontrada",
          data: null
        });
      }

      categorias[index] = { ...categorias[index], ...updatedCategoria };

      fs.writeFile(filePath, JSON.stringify(categorias, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            status: "error",
            message: "Erro ao atualizar a categoria",
            data: null
          });
        }

        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Categoria atualizada com sucesso",
          data: categorias[index]
        });
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar categorias",
        data: null
      });
    }
  });
});

app.delete('/api/categorias/:id', (req, res) => {
  const filePath = path.join(__dirname, 'json/categorias.json');
  const { id } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao carregar os dados das categorias",
        data: null
      });
    }

    try {
      const categorias = JSON.parse(data);

      //verificar no cateforia do produtor (produtos.json) se existe algum produto com essa categoria, se sim, não permitir a exclusão
      const produtosFilePath = path.join(__dirname, 'json/produtos.json');
      const produtosData = fs.readFileSync(produtosFilePath, 'utf8');
      const produtos = JSON.parse(produtosData);
      const categoriaEmUso = produtos.some(p => p.categoria === parseInt(id));
      if (categoriaEmUso) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "Não é possível excluir a categoria, existem produtos associados a ela",
          data: null
        });
      }

      const index = categorias.findIndex(c => c.id === parseInt(id));
      if (index === -1) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Categoria não encontrada",
          data: null
        });
      }

      categorias.splice(index, 1);

      fs.writeFile(filePath, JSON.stringify(categorias, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            status: "error",
            message: "Erro ao excluir a categoria",
            data: null
          });
        }

        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Categoria excluída com sucesso",
          data: null
        });
      });

    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao interpretar categorias",
        data: null
      });
    }
  });
});

// Start do servidor
app.listen(PORT, () => {
  console.log(`Mock API rodando em http://localhost:${PORT}`);
});
