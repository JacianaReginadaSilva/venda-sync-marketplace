const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    // Transforma a senha "123456" em algo ilegível como "$2a$10$..."
    async criptografarSenha(senha) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(senha, salt);
    }

    // Compara o que o usuário digitou com o que está no banco
    async compararSenhas(senhaDigitada, senhaBanco) {
        return await bcrypt.compare(senhaDigitada, senhaBanco);
    }

    // Cria o "crachá" digital (token) para o usuário navegar logado
    gerarToken(usuarioId) {
        return jwt.sign({ id: usuarioId }, 'SUA_CHAVE_SECRETA_AQUI', { expiresIn: '1d' });
    }
}
module.exports = new AuthService();