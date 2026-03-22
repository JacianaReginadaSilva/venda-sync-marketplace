const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
// Verifique se a pasta se chama 'middlewares' (com S)
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, produtoController.getProdutos);
router.post('/', auth, produtoController.criarProduto);
router.put('/:id', auth, produtoController.atualizarProduto);
router.delete('/:id', auth, produtoController.deletarProduto);

module.exports = router;