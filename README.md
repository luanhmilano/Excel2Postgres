# Projeto de Importação e Atualização de Dados do Excel para PostgreSQL

## Descrição

Este projeto importa dados de um arquivo Excel para um banco de dados PostgreSQL, e atualiza a tabela dividindo a coluna "Data" em duas colunas separadas: "Data" e "Hora".

## Configuração

### Pré-requisitos

- Node.js
- PostgreSQL


### Como Usar

1. **Clone o Repositório:** 
   - `git clone https://github.com/seu-usuario/seu-repositorio.git`
   - `cd seu-repositorio`

2. **Instale as Dependências:**
   - `npm install`

3. **Configure o Banco de Dados e Variáveis de Ambiente:**
   - Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias.

4. **Execute o Projeto:**
   - `npm start`


## Estrutura do Projeto

### Configuração do Banco de Dados

O arquivo config/database.js configura a conexão com o banco de dados PostgreSQL usando Sequelize.

### Modelo de Dados

O modelo TabelaDados é definido em models/TabelaDados.js.

### Utilitários

utils/excel.js: Lê o arquivo Excel e converte os dados para JSON.
utils/cleanData.js: Limpa e sanitiza os dados do Excel.

### Scripts

scripts/importData.js: Importa os dados do arquivo Excel para o PostgreSQL.
scripts/updateDataAndTime.js: Atualiza a tabela no PostgreSQL, dividindo a coluna "Data" em "Data" e "Hora".