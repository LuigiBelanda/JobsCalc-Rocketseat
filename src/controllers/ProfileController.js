// cada controller será meio que uma função que será chamada ou referenciada em algum momento

const Profile = require("../model/Profile");

// Utilizando o module.exports conseguimos exportar as funções que estão nesse arquivo
// assim conseguimos integrar nosso projeto, mas deixando cada arquivo responsável por uma parte
module.exports = {
  // apenas passas as infos para a home
  async index(req, res) {
    // com o Profile.get() pegamos os dados que estão vindo do model Profile
    return res.render("profile", { profile: await Profile.get() }); // add o await pq o get é async e quando chamamos algo que é async usamos o await também para a chamada
  },

  // att os dados dos jobs
  async update(req, res) {
    // req.body para pegar os dados
    const data = req.body;

    // definir quantas semanas tem num ano: 52
    const weeksPerYear = 52;

    // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    // total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    // horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    // qual será o valor da minha hora?
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get();

    // ... spread / rest operator
    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
