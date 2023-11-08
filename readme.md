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
npm i --save-dev @types/express @types/bcryptjs @types/jsonwebtoken @types/multer @types/cors
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
- **controllers**: intermediario entre o Model e a View (parecido com os das rotas)
  - **UserControllers.js**: manipulação dos usuários 
  - **ImagesControllers.js**: manipulação das imagens
- **db**: conexão com o banco de dados
- **helpers**: para funcões sem locais de uso fixo (para ajudar)
  - **Authenticate.js**: arquivo que verifica se existe um token e se ele é válido. Caso seja verdadeiro, dá ao usuário acesso a rotas privadas
  - **Create-token.js**: arquivo que cria um token com base nas informações do usuário e manda para o front-end
  - **get-token.js**: arquivo que retorna os dados do usuário com base no token fornecido
  - **imagesUpload.js** utiliza a biblioteca multer para salvar as imagens
    - no inicio do projeto, será usado para salvar localmente, e depois usaremos para salvar as imagens do banco de imagens em um bucket no s3
  - **imageUserEdit.ts**: utiliza a biblioteca multer para salvar imagens do perfil do usuário
    - no inicio do projeto, será usado para salvar localmente, e depois usaremos para salvar as imagens do perfil do usuário em um bucket no s3
  - **deleteImage.ts**: esse arquivo possui duas funções, que servem:
    - **deleteImage**: vai deletar uma imagem do banco de imagens do usuário sempre que ele solicitar a exclusão
    - **deleteImageProfileAfterEdit**: vai deletar uma imagem sempre que o usuário trocar a foto de perfil (evitando o acúmulo de imagens não utilizadas)
- **models**: interação com o banco de dados e com o controllers
  - **User.js**: interação com o banco de dados do usuário (tabela **Users**)
  - **Images.js**: interação com o banco de dados das imagens (tabela **Images**)
- **routes**: conjunto de rotas com base do Controllers
  - **UserRouter.js:** rotas para manipulação dos usuários dentro do banco
  - **ImagesRoutes.js:** rotas para manipulação das imagens dentro do banco de dados
- **public:** Diretório para salvar imagens
  - **images:** salva todas as imagens, tanto do perfil do usuário, quanto as do banco de imagens

# Frontend

Para o frontend, vamos utilizar o **react** com a ferramente de construção **vite**. Primeiro, vamos executar o seguinte comando:
```bash
npm create vite@latest
```
Vamos colocar o nome do nosso arquivo de frontend, escolher o react e depois Typescript. Após isso, vamos executar os seguintes comando:
```bash
cd frontend
npm install
npm run dev
```

## Arquivos de configuração react
- **.eslintrc.cjs**: é usado em projetos React (e em outros projetos JavaScript) para configurar as regras e as configurações do ESLint. ESLint é uma ótima ferramenta para ajudar a automatizar a padronização do código em nosso projeto. Com ela conseguimos definir regras de padronização, achar códigos fora do padrão e consertá-los automaticamente
- **vite.config.ts**: esse arquivo é usado para configurar o Vite. Ele pode conter configurações relacionadas a plugins, roteamento, aliases de importação, entre outras coisas.
- **tsconfig.json**: especifica os arquivos raiz e as configurações de compilação necessárias para o projeto. Projetos JavaScript podem ter um arquivo jsconfig. json , que tem quase o mesmo propósito, mas possui algumas flags do compilador relacionadas ao JavaScript que já estão habilitadas por padrão.

## Instalando dependências react

Instalando as bibliotecas de **css in js** e de **manipulação de rotas**
```sh
npm i styled-components react-router-dom react-hook-form js-cookie react-icons @mui/material @emotion/react @emotion/styled axios
```
- **styled-components:** biblioteca para React e React Native que permite que você escreva CSS no JavaScript. 
- **react-router-dom:** biblioteca que permite que você configure rotas em sua aplicação, de modo que diferentes componentes sejam renderizados com base na URL atual. Isso é crucial para criar aplicativos de página única (SPA) e navegação sem recarregamento de página.
- **react-hook-form:** biblioteca para gerenciamento de formulários em React. Ela permite que você crie formulários flexíveis e complexos com validação integrada.
- **js-cookie:** js-cookie é uma biblioteca que facilita a leitura e a escrita de cookies no navegador usando JavaScript


Instalando as dependências de TS das bibliotecas
```sh
npm i -D @types/styled-components @types/react-router-dom @types/js-cookie
```

## Erro de "arquivo não encontrado"
Caso apareça um erro do arquivo tsconfig.json, vamos adcionar a seguinte linha de codígo ao arquivo:
```json
"include": ["src/**/*.ts", "src/**/*.tsx"]
```

## Rotas do frontend
- **/:** página inicial com imagens
- **/login:** rota para login
- **/register:** rota para o registro
- **/create:** rota para criar images
- **/profile:** rota que mostra informações do perfil
- **/myimages:** rota que mostra minhas imagens (podendo editar ou excluir)

## Divisão de pastas
- **assets**: algumas imagens estáticas do projeto
- **Componentes**: pasta onde fica todos os componentes do projeto
  - **Api**: realiza a chamada da api através da biblioteca axios
  - **Context**:
    - **Auth.tsx:** Arquivo gerenciamento de usuários e de autenticação
    - **UserContext.tsx:** contexto nossa aplicação
  - **Routes**: Pasta onde fica todas as rotas
    - **Header**: estrutura do header (que não muda)
    - **RoutesPrivates**: Rotas privadas que só podem ser acessadas se o token for válido
      - **Private**: realiza a verificação do token e permite o usuário acessar a rota privada (ou não)
  - **Types**: arquivo onde contém as interfaces mais utilizadas
  - **Utils**: arquivo que contém algumas ferramentas que ajudam no projeto

# Dockerizando a aplicação

**Backend**

Primeiro, vamos criar um arquivo de **Dockerfile** para a criação do container da nossa aplicação node.js. 
```Dockerfile
FROM node:18-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm install -g npm@10.2.0 && npm install
COPY . ./
EXPOSE 3000
CMD [ "npm", "start" ]
```

**Frontend**

Agora, vamos criar um arquivo de **Dockerfile** para a aplicação react

```Dockerfile
FROM node:18-alpine as build 
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.2.0 && npm install
COPY . ./
RUN npm run build
EXPOSE 4000
CMD ["npm","run","dev"]
```

Antes de criar o arquivo de docker-compose, precisamos realizar uma configuração na aplicação react para poder rodar dentro do container.

Vamos no arquivo **vite.config.ts** e adcionar a seguinte linha de comando:

```js
export default defineConfig({
  plugins: [react()],
  server:{
    host: true,
    strictPort: true,
    port: 4000
  }
})
```

**Docker compose**

Em seguida, vamos criar o **docker-compose.yml**, onde vamos:
- Construir nossa aplicação node.js (porta 3000)
- Construir o container do mysql (porta 3306 interna e 3307 externa)
  - Volume: arquivo **db** na raiz do projeto, porém não está incluido no repositório
- Construir o container do phpMyAdmin para gerenciamento do banco de dados (porta 1234)
  - http://localhost:1234 -> gerenciar o banco de dados pelo browser
- Construir o container da aplicação react (porta 4000)

Agora, vamos executar o seguinte comando:
```sh
docker-compose up -d --build ##vai construir os containers e rodar a aplicação
```
Podemos ver todos os containers rodando com o comando:
```sh
docker ps
```
E podemos visualizar os logs de cada container, e também acessa-los caso necessite:
```sh
docker logs hash_container -h #logs do container
docker exec -it hash_container sh #acessar o container por um terminal sh
```

## Error de "network Error" ou Cors
Para evitar esse erro, vamos no arquivo **index.js** no backend, e alterar a origin do cors para 'http://localhost' 

E, se não resolver, vamos adcionar o seguinte bloco de código:
```js
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost'); // Permitir solicitações do domínio http://localhost
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
```

# Usando o serviço de S3 da amazon

Primeiro, vamos criar duas buckets no amazon S3
- a primeira chamada **imagebank-profile-user-s3** para salvar a foto de perfil do usuário
- e a segunda chamada **imagebank-images-upload-s3** para salvar as imagens feitas por apload

Agora, vamos instalar as seguintes dependências no backend:
```bash
npm install @aws-sdk/client-s3 multer-s3
```
E também a dependência do ts para o multer-s3
```bash
npm i -D @types/multer-s3"
```

- **multer-s3**: O multer-s3 é um pacote que estende as funcionalidades do multer para facilitar o upload de arquivos diretamente para o Amazon S3. Ele fornece uma maneira conveniente de configurar o multer para enviar arquivos para um bucket específico no S3, incluindo detalhes como autenticação, permissões de acesso e gerenciamento de metadados dos objetos no S3.

- **@aws-sdk/client-s3:** é uma parte do AWS SDK para JavaScript versão 3 (v3) que fornece uma interface para interagir com o serviço Amazon S3 (Simple Storage Service) usando JavaScript moderno e assíncrono, como Promises e async/await.

Agora, vamos criar mais um arquivo no diretório /backend/helpers chamado S3Config, onde vamos colocar a configuração de acesso a AWS (lembrando que é necessário ter um usuário com acesso programático, e informar a chave de acesso e a chave secreta). Depois, vamos editar os arquivos de helpers que realiza o upload local para poder salvar e deletar as imagens nos respectivos buckets.

# Criando um banco de dados com RDS e Mysql na aws

No console da AWS, vamos nos serviços de RDS e criar um banco de dados:
- Selecionando o free tier
- Selecionando o Mysql
- Colocando o nome como imagebank001
- Colocar a senha como Ab12345*
- Colocar o usuário como root
- habilitar o acesso público
Depois, precisaremos editar o arquivo **/backend/dn/conn.ts** lembrando de passar o Endpoint do RDS como host da aplicação.

Para visualizarmos os dados, podemos executar o seguinte comando no terminal local:
```bash
mysql -h nome-do-host-do-rds -u nome-de-usuario -p
```