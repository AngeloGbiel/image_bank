# Projeto Banco de images

# Backend

## Construção inicial do backend
Faremos todo o ambiente backend com node + typescript, e para isso, precisaremos baixar as seguintes dependências:
```bash
npm i -D typescript sucrase
```
**typescript**: linguaguem onde rodaremos nossa aplicação
**sucrase:** vai converter nosso código typescript em javascript de forma muito mais rápida comparado ao Babel

## Outras dependências instaladas
```bash
npm i bcryptjs cors express jsonwebtoken mysql2 sequelize multer nodemon dotenv
```
- **bcryptjs:** É uma biblioteca para criptografar senhas.
- **cors:** O CORS é uma sigla para Cross-Origin Resource Sharing, que se refere a uma política de segurança implementada pelos navegadores da web. Essa política restringe solicitações feitas a um domínio diferente do domínio da página que está fazendo a solicitação.
- **jsonwebtoken:** JSON Web Tokens (JWTs) são uma forma de representar informações de maneira segura entre duas partes. Em resumo, é uma lib usada para criar tokens
- **mysql2:** É um driver para interagir com bancos de dados MySQL a partir de aplicativos Node.js. Ele permite que você execute consultas SQL em um banco de dados MySQL.
- **sequelize:** Uma biblioteca ORM que simplifica a interação com bancos de dados relacionais, como MySQL, PostgreSQL, SQLite e outros, através de modelos JavaScript.
- **multer:** Facilita o upload de arquivos, como imagens e documentos, em seu aplicativo Node.js.
- **dotenv:** permite ler facilmente variaveis de ambiente
- **express-async-errors:** O express-async-errors é um pacote Node.js que facilita o tratamento de erros assíncronos em aplicativos Express. Ele permite que você capture exceções assíncronas lançadas em rotas ou middleware e as direcione para o manipulador de erros do Express, em vez de deixá-las serem propagadas e potencialmente quebrarem seu aplicativo.
- **nodemon:** é um utilitário que monitora as mudanças nos arquivos do seu projeto e reinicia automaticamente o servidor Node. js quando necessário

## Rodando o nodemon com o sucrase
Vamos criar um arquivo chamado **nodemon.json** e vamos colocar o seguinte bloco de código:
```json
{
    "ext": "ts",
    "execMap": {
        "ts": "sucrase-node index.ts"
    }
}
```
Agora, no arquivo **package.json** do backend, vamos alterar apenas esse bloco de código:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.ts"
},
```

## Instalando dependências do Typescript

```bash
npm i --save-dev @types/express @types/bcryptjs
```

## Criando conexão com o banco de dados

Agora, vamos instalar o mysql-server

```sh
sudo apt install -y mysql-server #instala o mysql
sudo mysql_secure_installation # inicia os protocolos de segurança para a instalação do mysql
systemctl status mysql.service # Visualiza se o serviço está mesmo ativo
sudo mysql -u root # Estabelece uma conexão com o MySql

# Uma vez logado
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ab12345*';
SHOW DATABASES
```

Depois, vamos criar um banco de dados chamado **imagebank**
```sh
create database imagebank;
```
Agora estamos pronto para fazer a integração com o sequelize dentro do banco de dados

## Estrutura de pastas do backend