🚀 VendaSync Evolution - Marketplace API 

Bem-vindo ao VendaSync, uma API robusta desenvolvida para a gestão de marketplaces, integrando conceitos avançados de bancos de dados relacionais e não-relacionais, autenticação segura e documentação interativa. 

 

📋 Sobre o Projeto 

Este projeto foi desenvolvido como parte da Atividade Prática 4, com o objetivo de demonstrar a construção de um ecossistema Full Stack funcional. A aplicação gerencia produtos, usuários, pedidos e autenticação, utilizando uma arquitetura organizada em camadas (MVC). 

 

🛠️ Tecnologias Utilizadas 

Back-end: Node.js com Express.js 

Banco de Dados Relacional: MySQL (Utilizado para modelagem, normalização e consultas analíticas de larga escala). 

Banco de Dados NoSQL: NeDB (Persistência local para autenticação e produtos, escolhido pela total compatibilidade de sintaxe com MongoDB/Mongoose). 

Segurança: Bcrypt para criptografia de senhas e JWT (JSON Web Token) para sessões. 

Documentação: Swagger UI (OpenAPI 3.0). 

Testes: Thunder Client. 

 

🗄️ Decisões de Arquitetura: Banco de Dados 

Um dos diferenciais deste projeto é o uso híbrido de tecnologias de banco de dados: 

MySQL: Focado na integridade referencial. As tabelas foram normalizadas até a 3ª Forma Normal (3FN) para garantir que não haja redundância de dados em pedidos e categorias. 

NeDB (Persistência Local): Optou-se pelo uso do NeDB para o sistema de login e cadastro por sua leveza e agilidade no ambiente de desenvolvimento. 

Nota Técnica: O NeDB emula o comportamento do MongoDB/Mongoose, utilizando a mesma lógica de Schemas e Queries (find, insert, update). Isso garante que a aplicação seja 100% portável para um cluster MongoDB Atlas sem necessidade de refatoração da lógica de negócio. 

 

📂 Estrutura de Pastas 

Plaintext 

/ 
├── src/ 
│   ├── controllers/   # Lógica de negócio (usuários e produtos) 
│   ├── models/        # Schemas e conexão com banco de dados 
│   ├── routes/        # Definição dos endpoints da API 
│   ├── services/      # Lógica de autenticação e segurança 
│   ├── public/        # Front-end (HTML, CSS, JS) 
├── data/              # Arquivos de persistência .db (NeDB) 
├── server.js          # Arquivo principal (Ponto de entrada) 
└── swagger.json       # Documentação da API 
 

 

🚀 Como Executar o Projeto 

Clone o repositório: 

Bash 

git clone [LINK_DO_SEU_REPOSITORIO] 
 

Instale as dependências: 

Bash 

npm install 
 

Inicie o servidor: 

Bash 

npm start 
 

Acesse as interfaces: 

Aplicação: http://localhost:3000 

Documentação Swagger: http://localhost:3000/api-docs 

 

📑 Endpoints Principais 

Método 

Endpoint 

Descrição 

POST 

/usuarios/registrar 

Cria um novo usuário com senha criptografada. 

POST 

/usuarios/login 

Autentica o usuário e retorna um Token JWT. 

GET 

/produtos 

Lista todos os produtos cadastrados. 

POST 

/produtos 

Cadastra um novo produto no estoque. 

 

🎥 Demonstração 

O funcionamento completo do sistema, incluindo os testes de endpoints via Thunder Client e a análise de dados no MySQL, pode ser visualizado no vídeo abaixo: 

👉 https://youtu.be/Ab11hl-zCfE  

 

Desenvolvido por: Jaciana Regina 👩‍💻 