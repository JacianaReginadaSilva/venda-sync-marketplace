const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Caso você use arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Importando as Rotas
const produtoRoutes = require('./src/routes/produtoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VendaSync API',
      version: '1.0.0',
      description: 'Documentação do Marketplace da Atividade 4',
    },
  },
  apis: ['./src/routes/*.js'], // Onde o Swagger vai ler as rotas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// 2. Middlewares Globais
app.use(cors());
app.use(express.json()); // Essencial para ler o JSON do Body (Thunder Client/Front)

// 3. Servir arquivos estáticos (Front-end)
// Ajustei para o caminho que você está usando
// Garanta que o 'path' esteja importado no topo: const path = require('path');

// Tente desta forma, que força o Node a olhar para a pasta correta:
// 1. Diz ao Express que os arquivos (CSS, JS, Imagens) estão dentro de src/public
app.use(express.static(path.join(__dirname, 'src', 'public')));

// 2. Rota para abrir o index.html automaticamente ao acessar localhost:3000
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// 4. Definição das Rotas da API
// IMPORTANTE: Usei '/produtos' para bater com o seu script.js
app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes); 

// 5. Inicialização do Servidor (Apenas UM listen)
app.listen(PORT, () => {
    console.log(`
    ✅ Rotas carregadas com sucesso!

    🚀 ==========================================
       VendaSync Evolution - Sistema Iniciado!
       📍 Servidor: http://localhost:${PORT}
       📂 Banco: NeDB (Local)
       ========================================== 🚀
    `);
});