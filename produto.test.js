const request = require('supertest');
const express = require('express');
const produtosRoutes = require('../GQS II unidade/produto');

const app = express();
app.use(express.json());
app.use('/api/produtos', produtosRoutes);

describe('API de Produtos', () => {
  let produtoId;

  it('Deve criar um novo produto', async () => {
    const res = await request(app)
      .post('/api/produtos')
      .send({
        nome: 'Produto Teste',
        preco: 100
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    produtoId = res.body.id;
  });

  it('Deve listar todos os produtos', async () => {
    const res = await request(app)
      .get('/api/produtos');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve obter um produto pelo ID', async () => {
    const res = await request(app)
      .get(`/api/produtos/${produtoId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', produtoId);
  });

  it('Deve atualizar um produto pelo ID', async () => {
    const res = await request(app)
      .put(`/api/produtos/${produtoId}`)
      .send({
        nome: 'Produto Atualizado',
        preco: 150
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome', 'Produto Atualizado');
    expect(res.body).toHaveProperty('preco', 150);
  });

  it('Deve deletar um produto pelo ID', async () => {
    const res = await request(app)
      .delete(`/api/produtos/${produtoId}`);

    // Ajustar para corresponder ao comportamento da sua API
    expect(res.statusCode).toEqual(200);
    // Se a sua API não retorna o produto deletado, remova a linha abaixo
    expect(res.body).toHaveProperty('id', produtoId);
  });

  it('Deve retornar 404 ao tentar obter um produto deletado', async () => {
    const res = await request(app)
      .get(`/api/produtos/${produtoId}`);

    expect(res.statusCode).toEqual(404);
  });
});