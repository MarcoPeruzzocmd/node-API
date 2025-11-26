# 📦 Backend – Desenvolvimento de API em Node.js 

## 🧩 Sobre

Este repositório contém uma API backend desenvolvida em Node.js, com o auxílio de diversas tecnologias facilitadoras.  
Implementada com **Node.js**, **Express** e **PostgreSQL** — e estruturada seguindo o padrão MVC, com controllers, rotas e migrations, para gerenciar dados de clientes/usuários e outras funcionalidades da aplicação.

## 🚀 Tecnologias

- Node.js  
- Express  
- PostgreSQL  
- Sequelize (ORM)  
- dotenv / config (variáveis de ambiente)
- Dbeaver
- [outras libs que você estiver usando]

## 🛠️ Como rodar localmente

> ⚠️ Certifique-se de ter o PostgreSQL rodando na sua máquina.

```bash
# Clone o repositório
git clone https://github.com/hackatoiers/backend.git

# Acesse a pasta
cd backend

# Instale as dependências
npm install

# Crie (ou configure) o arquivo de ambiente
cp .env.example .env
# Edite .env com suas credenciais de BD (host, user, password, database, port)

# Rode migrations (se houver)
npx sequelize db:migrate

# Inicie o servidor em modo de desenvolvimento
npm run dev   # ou npm start, conforme o script

# A API estará disponível em
http://localhost:8000
