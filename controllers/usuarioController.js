const Usuario = require('../models/Usuario');
const authService = require('../services/authService');

// --- FUNÇÃO DE REGISTRO ---
exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha, cargo } = req.body;

        const usuarioExiste = await Usuario.findOne({ email: email });
        
        if (usuarioExiste) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const senhaCriptografada = await authService.criptografarSenha(senha);

        const novoUsuario = {
            nome,
            email,
            senha: senhaCriptografada,
            cargo: cargo || 'vendedor',
            dataCriacao: new Date()
        };

        await Usuario.insert(novoUsuario);
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- FUNÇÃO DE LOGIN ---
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        const senhaValida = await authService.compararSenhas(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        const token = authService.gerarToken(usuario._id);

        res.json({
            message: 'Login realizado com sucesso!',
            token,
            usuario: { nome: usuario.nome, cargo: usuario.cargo }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};