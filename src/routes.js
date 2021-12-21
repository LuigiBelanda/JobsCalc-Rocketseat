const express = require("express");
const routes = express.Router();
// aqui pegamos os nossos ProfilesController que estão em outra pasta e arquivo
const ProfileController = require("./controllers/ProfileController");
// pegando o JobController
const JobController = require("./controllers/JobController");
// pegando o DashboardController
const DashboardController = require("./controllers/DashboardController");

// como o server entende que a pasta view está na raiz temos que arrumar isso
// por isso pegamos o __dirname, ou seja, o nome/caminho do diretório que estamos
// e concatenamos com "/views/" que é onde nossos arquivos ejs estão
// const views = __dirname + "/views/"

// Rotas
routes.get("/", DashboardController.index);
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
// :id passamos o id como um param da string http
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
// Usando o ProfileController que importamos no começo do código
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

// aqui exportamos os dados / funções desse arquivo para usarmos em outros locais
module.exports = routes;
