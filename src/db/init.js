// Para executar esse arquivo podemos ir até a pasta que ele está e rodar o comando node init.js
// ou podemos colocar o comando no package.json

const Database = require("./config");

const initDb = {
  async init() {
    // iniciando a conexão com o bd
    const db = await Database();
    // async / await (assíncrono)
    // serve para colocarmos alguma espera em algumas partes do código
    // neste caso quando o Database() terminar de executar o retorno ficará na const db
    // o await só funciona se estiver dentro de um async, isso pq o async é responsável por mostrar qual os códigos que tem await

    // roda algum comando SQL
    // criando a tabela profile
    await db.exec(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        avatar TEXT, 
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`);

    // criando a tabela jobs
    await db.exec(`CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )`);

    // inserindo dados na tabela profile
    await db.run(`INSERT INTO profile (
        name, 
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
    ) VALUES (
        "Mayk",
        "https://github.com/maykbrito.png",
        3000,
        5,
        5,
        4,
        75
    );`);

    // inserindo dados na tabela jobs
    await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "Pizzaria Guloso",
        2,
        1,
        1617514376018
    );`);

    await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "OneTwo Project",
        3,
        47,
        1617514376018
    );`);

    // fechando a conexão com o bd
    await db.close();
  },
};

// chamando o objeto initDb e a sua função init()
initDb.init();
