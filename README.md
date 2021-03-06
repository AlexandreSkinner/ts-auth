
1. PACKAGE INSTALADOS GLOBALMENTE:
----------------------------------
## - Instalação no Linux não precisa de instalação global
video usando para estudo - https://www.youtube.com/watch?v=TjAXBLszCb0&t=836s

2. PACKAGE INSTALADOS COMO DEPENDENCIA DE DESENVOLVIMETO:
---------------------------------------------------------

### Typescript instalado 
$ npm install typescript -D

### Habilita o CLI - para excutar comando na linha de comando
$ npm install ts-node -D

### Instalando o express
$ npm i express -D

### Adicionar as tipagens do typescript para o módulo express - permite utilizar os decorate
$ npm install @types/express -D

### Adicionar as tipagens do typescript para o módulo node
$ npm install @types/node -D

### Instalando Ferramentas para automatizar fluxo de dev: re-start server, transpilaçao do  
### código TS para JS e execução do código Javascript. Substitu - ts + nodemon + node
$ npm install ts-node-dev -D   // Adicionando uma dependencia de desenvolvimento (-D)

### Instalar drive do banco de dados Postgres para o Typeorm
$ npm install pg --save -D

### TypeORM instalado globalmente
$ npm install typeorm -D

### Instalar o package reflect-metadata oara Tyeporm
$ npm install reflect-metadata --save -D

### Instalar biblioteca de criptografia para a senha
$ npm install bcryptjs --save -D

# Tipos para o typescript da biblioteca
$ npm install @types/bcryptjs --save -D

### Instalar biblioteca JWT
$ npm install jsonwebtoken --save -D 

# Tipos do jsonwebtoken
$ npm install @types/jsonwebtoken --save -D 

# Variáveis de ambiente
npm install dotenv


3. INICIALIZAÇÕES:
-----------------

### Inicializando um projeto - Isso cria o arquivo package.json
$ npm init -y

### Inicializando projeto Typescript (cria arquivo tsconfig.json)
$ npx tsc --init

### Inicializando projeto TypeOrm (cria arquivo ormconfig.json)
$ typeorm init

### Estrutura basica das pastas de um projeto
MyProject
├── src              // place of your TypeScript code
│   ├── app          
│   │   ├── models   // place where your entities (database models) are stored
|   |   └── User.ts  // sample entity
│   ├── migration    // place where your migrations are stored
│   └── index.ts     // start point of your application
├── .gitignore       // standard gitignore file
├── ormconfig.json   // ORM and database connection configuration
├── package.json     // node module dependencies
├── README.md        // simple readme file
└── tsconfig.json    // TypeScript compiler options

### Arquivo de configuração ormconfig.json de conexão do typeorm
{
  "type": "postgres",
  "host": "localhost",
  "port": 5433,
  "username": "postgres",
  "password": "Skydocker",
  "database": "tsauth",
  "synchronize": false,
  "logging": false,
  "entities": [
    "src/app/models/**/*.ts"
   ],
  "migrations": [
    "src/database/migrations/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": { 
    "entitiesDir": "src/app/models",
    "migrationsDir": "src/database/migrations",
    "subscribersDir": "src/subscriber"
  }
}

4. CONTROLE DE MIGRATION
-------------------------

### Estratégia (1) - Cria um esboço de migration que precisa ser complementado 
### manualmente, no exemplo aqui foi criado quando só existia a entity Class.
$ typeorm migration:create -n createClass

### Estratégia (2) - Cria a migração a partir da definição das entitys existentes
### no Models, por esse método as migration são códigos SQL. Veja exemplo abaixo:
### await queryRunner.query( "CREATE TABLE `content` (`id` int NOT NULL AUTO_INCREMENT,
###                          `descript` varchar(255) NOT NULL, `linkContent` varchar(255) NOT NULL, 
###                          PRIMARY KEY (`id`)) ENGINE=InnoDB");
### Comando para essa estratégia de geração para a migration
$ npm run typeorm migration:generate -- -n CriarTabelas

### Executando a migration sem script
$ ts-node ./node_modules/typeorm/cli.js migration:run

### Executando pelo script - Esse script é porque o migration:run e revert
### só funcionam com arquivos .js, daí temos que compilar os arquivos antes.
### Para executar sem o script terias que executar tudo pelo diretório 'dist', daí daria certo
$ npm run typeorm migration:run

### revertendo a migration
$ npm run typeorm migration:revert

### Cria o esboço da Entity Class.ts tendo como origem a migration
$ npx typeorm entity:create -n Class

### Estes são os scripts: dev - para start da aplicação, typeorm para executar no terminal
### comandos para criar uma migration, executar uma migration etc.
  "scripts": {
    "build": "tsc",
    "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js"
  }

1. Descrição das flag do script dev:
  ts-node-dev - É uma ferramenta que compila o projeto typescript e reinicia a aplicação quando o arquivo é alterado.
  
  A flag --transpile-only indica que só transpila o código e não verifica se ele está certo ou errado. Nós não precisamos dessa verificação em tempo de desenvolvimento porque o VsCode com o Typescript já realiza esta verificação em tempo de desing;

  A flag --respawn serve para que o ts-node-dev fique observando alterações do código, para transpilar e fazer auto reload da aplicação;
  
  A flag --ignore-watch node_modules faz o compilador ignorar todo o conteúdo da pasta node_modules

### Estes são os scripts: dev - para start da aplicação, typeorm para executar no terminal
### comandos para criar uma migration, executar uma migration etc.
  "scripts": {
    "build": "tsc",
    "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js"
  }

## Outro exemplo que vi 
  "scripts": {
    "dev:server": "ts-node-dev -r tsconfig-paths/register  --inspect --transpile-only --ignore-watch node_modules src/server.ts",
    "start": "ts-node src/server.ts",
    "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
  },


1. Descrição das flag do script dev:
  A flag --transpile-only indica que só transpila o código e não verifica se ele está certo ou errado. Nós não precisamos dessa verificação em tempo de desenvolvimento porque o VsCode já realiza esta verificação
  A flag --respawn serve para que o ts-node-dev fique observando alterações do código, para transpilar e fazer auto reload da aplicação

5. START DA APLICAÇÃO
---------------------

### Para dar start na aplicação com o script de desenvolvimento
$ npm run dev


5. JWT
---------------------

### Estrutura do JWT
1) HEADER - ALGORITHM & TOKEN TYPE
   O cabeçalho identifica qual algoritmo é usado para gerar a assinatura e se parece com isto:
{
  "alg": "HS256",
  "typ": "JWT"
}

2) PAYLOAD - DATA
{
  "iss": "tm-api",
  "sub": "1234567890",  <== (user.Id)
  "name": "John Doe",
  "iat": 1516239022
}

3) VERIFY SIGNATURE
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
)