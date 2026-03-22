const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Define que quando alguém postar em /registrar, o controller assume
router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;