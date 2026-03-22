const Produto = require('../models/Produto'); // Importante ter essa linha no topo!

exports.getProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find({});
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.criarProduto = async (req, res) => {
    try {
        const novoProduto = req.body; 
        const produtoSalvo = await Produto.insert(novoProduto); 
        res.status(201).json(produtoSalvo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ... (mantenha as funções de deletar e atualizar que você já tinha)

// 3. Deletar Produto
exports.deletarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const numRemovidos = await Produto.remove({ _id: id }, {});
        if (numRemovidos > 0) {
            res.json({ message: "Produto removido com sucesso!" });
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Atualizar Produto
exports.atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosNovos = req.body;
        const produtoAtualizado = await Produto.update({ _id: id }, { $set: dadosNovos }, { returnUpdatedDocs: true });
        
        if (produtoAtualizado) {
            res.json(produtoAtualizado);
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};