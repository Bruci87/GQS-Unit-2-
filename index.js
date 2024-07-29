const express = require('express');
const app = express();
const produtosRoutes = require('../GQS II unidade/produto');

app.use(express.json()); // Permitir JSON no corpo das requisições
app.use('/api/produtos', produtosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});