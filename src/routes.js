const express = require('express');
const routes = express.Router();

// por padrão o EJS le a pasta views na raiz do projeto
// como a pasta views do nosso projeto está dentro de src
// então fazemos o seguinte
const views = __dirname + "/views/";

// Objeto Literal 
const Profile = {
    data: {
        name: "Jakeliny",
        avatar: "https://avatars.githubusercontent.com/u/17316392?v=4",
        // quando temas palavras com "-" podemos usar aspas duplas para usar elas em objetos, se não dá erro
        "monthly-budget": 5000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 2
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data });
        },

        update(req, res) {
            // req.body para pegar os dados
            const data = req.body;

            // definir quantas semanas tem no ano: 52
            const weeksPerYear = 52; 

            // remover as semanas de férias, para pegar as semanas que tem em 1 mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

            // quantas horas por semana estou trabalhando 
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

            // total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth;

            // qual o valor da minha hora de trabalho
            const valueHour = data["monthly-budget"] / monthlyTotalHours;

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour, 
            }

            return res.redirect('/profile');

        }
    }
}

// Objeto Literal 
const Job = {
    data: [
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
    ],

    controllers: {
        // função que usamos para passar os projects para o index e mostrar na tela
        index(req, res) {
                // aqui usamos o .map pois iremos gerar um novo array e enviar depois para o index no return
                const updatedJobs = Job.data.map((job) => {
                // aqui chamamos a função que criamos acima passando job como parametro
                // NOTA: passamos como função o services abaixo
                const remaining = Job.services.remainingDays(job);
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
                    budget: Profile.data["value-hour"] * job["total-hours"]
                }
            })
            
            return res.render(views + "index", { jobs: updatedJobs }); // res.send / res.render / res.sendFile = mandamos um retorno pro user
        },

        save(req, res) {
            // com essa linha pegamos oq o user enviou
            // console.log(req.body);

            // aqui vamos ver qual vai ser o id do nosso job
            // pegamos e contamos quantos elementos tem no nosso array jobs
            // tiramos -1 dele pois o array começa com 0
            // depois com isso ou definimos o id e se der errado definimos com 1
            const lastId = Job.data[Job.data.length - 1]?.id || 1;

            // aqui pegamos as infos e jogamos para o nosso array jobs
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"], 
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // pegando a data de hoje
            });

            return res.redirect("/"); 
        },

        create(req, res) {
            return res.render(views + "job");
        }
    },

    services: {
        remainingDays(job) {
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
    },
}

// assim que o user for na home/index de nosso site ele irá fazer o que passarmos a seguir
// request e response
// esse Job.controllers.index é o object literal que criamos acima, index é a função que usamos para att e enviar depois os projects pro index
routes.get('/', Job.controllers.index) 
routes.get('/job', Job.controllers.create);
// rota para salvarmos os dados form do job.ejs
routes.post('/job', Job.controllers.save);
routes.get('/job/edit', (req, res) => { return res.render(views + "job-edit") });
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

// exportando o arquivo / dados routes.js
// assim conseguimos chamar esse arquivo em outras partes do projeto
// assim usamos funções e dados que estão aqui
module.exports = routes;