// Para executar esse arquivo podemos ir até a pasta que ele está e rodar o comando node init.js
// ou podemos colocar o comando no package.json

const Database = require("config");

// iniciando a conexão com o bd
Database();

// roda algum comando SQL
// criando a tabela profile
Database.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    avatar TEXT, 
    monthly_budget INT,
    days-per_week INT,
    hours_per_week INT,
    vacation_per_year INT,
    value_hour INT
)`);

// criando a tabela jobs
Database.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);

// inserindo dados na tabela profile
Database.run(`INSERT INTO profile (
    name, 
    avatar,
    monthly-budget,
    days_per-week,
    hours_per_day,
    vacation_per_year,
) VALUES (
    "Mayk",
    "https://github.com/maykbrito.png",
    3000,
    5,
    5,
    4,
    75,
);`);

// inserindo dados na tabela jobs
Database.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    2,
    1,
    1617514376018,
);`);

Database.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo Project",
    3,
    47,
    1617514376018,
);`);

// fechando a conexão com o bd
Database.close();
