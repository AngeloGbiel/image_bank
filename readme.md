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
npm i --save-dev @types/express @types/bcryptjs @types/jsonwebtoken @types/multer 
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
npm i styled-components react-router-dom react-hook-form js-cookie react-icons
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
- **/:** página inicial
- **/login:** rota para login
- **/register:** rota para o registro
- **/result/${result}**: rota que mostra o resultado
- **/create:** rota para criar images
- **/profile:** rota que mostra informações do perfil
- **/myimages:** rota que mostra minhas imagens (podendo editar ou excluir)
- **/myimages/edit:** rota que vai permitir editar uma imagem
