🚀 VendaSync Evolution - Marketplace API
Sistema de gestão de vendas e marketplace desenvolvido para a Atividade 4 da faculdade. A aplicação conta com autenticação JWT, persistência de dados, documentação automática via Swagger e integração com API de CEP.

🛠️ Tecnologias Utilizadas
Runtime: Node.js v24

Framework: Express.js

Banco de Dados: NeDB (Persistência local em arquivos .db)

Segurança: BCrypt (Hash de senhas) e JSON Web Token (Autenticação)

Documentação: Swagger UI e Swagger JSDoc

Estilização: Tailwind CSS (via CDN)

API Externa: BrasilAPI (Busca de CEP)

📂 Estrutura do Projeto
Plaintext
/src
  /controllers   # Lógica das rotas (Produtos e Usuários)
  /middlewares   # Filtro de autenticação JWT
  /models        # Conexão com banco de dados NeDB
  /routes        # Definição dos endpoints
  /services      # Regras de negócio (Criptografia e Tokens)
  /public        # Front-end (HTML e JS)
/data            # Arquivos de banco de dados (.db)
server.js        # Arquivo principal do servidor
⚙️ Como Executar
Clone o repositório.

No terminal, instale as dependências:

Bash
npm install
Crie um arquivo .env na raiz (opcional, o sistema usa valores padrão):

Snippet de código
PORT=3000
JWT_SECRET=SUA_CHAVE_SECRETA_AQUI
Inicie o servidor:

Bash
node server.js
Acesse: http://localhost:3000

📑 Endpoints Principais
POST /usuarios/registrar: Criar nova conta.

POST /usuarios/login: Obter token de acesso.

GET /produtos: Listar catálogo (Requer Auth).

POST /produtos: Cadastrar item (Requer Auth).

Docs: http://localhost:3000/api-docs