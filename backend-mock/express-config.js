const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // para aceitar JSON no body

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

// Start do servidor
app.listen(PORT, () => {
  console.log(`Mock API rodando em http://localhost:${PORT}`);
});
