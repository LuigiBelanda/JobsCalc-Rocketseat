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
    "vacation-per-year": 4,
    "value-hour": 75
}

const jobs = [
    {
        id: 1,
        name: "Pizzaria guloso",
        "daily-hours": 2, 
        "total-hours": 1,
        created_at: Date.now(), 
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3, 
        "total-hours": 47,
        created_at: Date.now(),
    },
];

function remainingDays(job) {
    // ajustes nos jobs
    // calculo de tempo restante
    const remainingDays =  (job['total-hours'] / job['daily-hours']).toFixed();
    
    // aqui pegamos e colocamos na var createdDate o dia que criamos o job
    const createdDate = new Date(job.created_at);
    // aqui vemos em que dia iremos terminar nosso projeto
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateInMs = createdDate.setDate(dueDay);

    // aqui vemos a diferença em ms do dia que vamos terminar o projeto pra data de hoje
    const timeDiffInMs = dueDateInMs - Date.now();       

    // transformando ms em dias
    const dayInMs = 1000 * 60 * 60 * 24;

    // diferença de dias
    const dayDiff = Math.floor((timeDiffInMs / dayInMs));

    // dias restantes
    return dayDiff;
}

// assim que o user for na home/index de nosso site ele irá fazer o que passarmos a seguir
// request e response
routes.get('/', (req, res) => {
    console.log('Entrei no index');
    // console.log(__dirname + "/views/index");

    // aqui usamos o .map pois iremos gerar um novo array e enviar depois para o index no return
    const updatedJobs = jobs.map((job) => {
        // aqui chamamos a função que criamos acima passando job como parametro
        const remaining = remainingDays(job);
        // aqui vemos se o número de dias faltando é menor ou igual 0 ou não
        // se for 0 o status é done
        // se for outro valor é progress
        const status = remaining <= 0 ? 'done' : 'progress';

        // aqui usamos spread operators
        // em vez de colocarmos cada propriedade do objeto usamos ...job
        // assim pegamos todas as props de uma vez e colocamos elas no objeto que será retornado
        return {
            ...job,
            remaining,
            status,
            budget: profile["value-hour"] * job["total-hours"]
        }
    })

    return res.render(views + "index", { jobs: updatedJobs }); // res.send / res.render / res.sendFile = mandamos um retorno pro user
});

routes.get('/job', (req, res) => {
    console.log('Entrei no Job');
    return res.render(views + "job"); 
});

// rota para salvarmos os dados o form do job.ejs
routes.post('/job', (req, res) => {
    console.log('Salvando dados / Job');

    // com essa linha pegamos oq o user enviou
    // console.log(req.body);

    // aqui vamos ver qual vai ser o id do nosso job
    // pegamos e contamos quantos elementos tem no nosso array jobs
    // tiramos -1 dele pois o array começa com 0
    // depois com isso ou definimos o id e se der errado definimos com 1
    const lastId = jobs[jobs.length - 1]?.id || 1;

    // aqui pegamos as infos e jogamos para o nosso array jobs
    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"], 
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // pegando a data de hoje
    });
    console.log(jobs);

    return res.redirect("/"); 
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