const express = require('express');
const router = express.Router();

let produtos = [];
let idCounter = 1;

// Criar um novo produto
router.post('/', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco == null) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  if (typeof preco !== 'number' || preco <= 0) {
    return res.status(400).json({ error: 'Preço deve ser um número positivo' });
  }

  const produto = {
    id: idCounter++,
    nome,
    preco
  };
  
  produtos.push(produto);
  res.status(201).json(produto);
});

// Listar todos os produtos
router.get('/', (req, res) => {
  res.json(produtos);
});

// Obter um produto pelo ID
router.get('/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(produto);
});

// Atualizar um produto pelo ID
router.put('/:id', (req, res) => {
  const { nome, preco } = req.body;
  const produto = produtos.find(p => p.id === parseInt(req.params.id));

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  if (nome) produto.nome = nome;
  if (preco != null) {
    if (typeof preco !== 'number' || preco <= 0) {
      return res.status(400).json({ error: 'Preço deve ser um número positivo' });
    }
    produto.preco = preco;
  }

  res.json(produto);
});

// Deletar um produto pelo ID
router.delete('/:id', (req, res) => {
  const produtoIndex = produtos.findIndex(p => p.id === parseInt(req.params.id));

  if (produtoIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  const [produtoDeletado] = produtos.splice(produtoIndex, 1);
  res.json(produtoDeletado);
});

module.exports = router;