// cada controller será meio que uma função que será chamada ou referenciada em algum momento

const Profile = require("../model/Profile");

// Utilizando o module.exports conseguimos exportar as funções que estão nesse arquivo
// assim conseguimos integrar nosso projeto, mas deixando cada arquivo responsável por uma parte
module.exports = {
  // apenas passas as infos para a home
  index(req, res) {
    // com o Profile.get() pegamos os dados que estão vindo do model Profile
    return res.render("profile", { profile: Profile.get() });
  },

  // att os dados dos jobs
  update(req, res) {
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

    // ... spread / rest operator
    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
