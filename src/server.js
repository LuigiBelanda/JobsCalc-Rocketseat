// npm init -y
// npm i express

// pegando o módulo express
const express = require('express');
const server = express();
const routes = require('./routes');

// setando nossa view engine para EJS
server.set('view engine', 'ejs');

// console.log(server);

// habilitar arquivos statics
server.use(express.static("public")); // middleware

// Routes
server.use(routes);

// .listen() é onde ligamos nosso servidor na porta 3000 nesse caso
// como segundo parâmetro podemos fazer para ele executar uma função
// nesse caso executamos a função que vai mostrar no console a mensagem que escolhemos
server.listen(3000, () => console.log('Server rodando'));

// NODEMON
// npm i nodemon -D
// modificamos o arquivo package.json
// mudamos a parte de script 
/*
"scripts": {
    "dev": "nodemon ."
},
*/
// mudamos a parte do main
// "main": "src/server.js",
// Com isso conseguimos rodar o nodemon sem percorrer todo o diretório do node_modules
// com isso basta usarmos o comando npm run dev
