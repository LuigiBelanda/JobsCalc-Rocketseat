const express = require('express');
const routes = express.Router();

// por padrão o EJS le a pasta views na raiz do projeto
// como a pasta views do nosso projeto está dentro de src
// então fazemos o seguinte
const views = __dirname + "/views/";

const profile = {
    name: "Jakeliny",
    avatar: "https://avatars.githubusercontent.com/u/17316392?v=4",
    // quando temas palavras com "-" podemos usar aspas duplas para usar elas em objetos, se não dá erro
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// assim que o user for na home/index de nosso site ele irá fazer o que passarmos a seguir
// request e response
routes.get('/', (req, res) => {
    console.log('Entrei no index');
    // console.log(__dirname + "/views/index");
    return res.render(views + "index"); // res.send / res.render / res.sendFile = mandamos um retorno pro user
});

routes.get('/job', (req, res) => {
    console.log('Entrei no Job');
    return res.render(views + "job"); 
});

routes.get('/job/edit', (req, res) => {
    console.log('Entrei no Job/Edit');
    return res.render(views + "job-edit"); 
});

routes.get('/profile', (req, res) => {
    console.log('Entrei no Profile');
    return res.render(views + "profile", { profile }); // aqui mandamos o objeto profile que criamos acima
});

module.exports = routes;