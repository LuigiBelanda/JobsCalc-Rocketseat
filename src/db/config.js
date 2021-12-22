// npm i sqlite3
// npm i sqlite

const sqlite3 = require("sqlite3");
// neste caso queremos apenas pegar a função { open } do módulo sqlite
const { open } = require("sqlite");
// const sqlite = require('sqlite')

// Aqui colocamos alguma configs da nossa comunicação com o BD
// o open sempre espera estar entre {}, por isso nesse caso usamos o 
// module.exports com uma arrow function
module.exports = () => {
  open({
    filename: "./database.sqlite", // arquivo em que será guardado os dados
    driver: sqlite3.Database, // qual bd iremos usar
  });
};
