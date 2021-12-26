// Model responsável por fornecer dados

const Database = require("../db/config");

/*
let data = {
  name: "Mayk",
  avatar: "https://github.com/maykbrito.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75,
};
*/

// aqui exportamos algumas coisas do nosso arquivo que vão poder ser usadas em outros lugares do projeto
module.exports = {
  // quando o get deste model for chamado ele irá retornar apenas a const data
  async get() {
    const db = await Database();

    // get pega apenas 1 dado no SQLite
    const data = await db.get(`SELECT * FROM profile`);
    await db.close();

    // console.log(data);

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "days-per-week": data.days_per_week,
      "hours-per-day": data.hours_per_day,
      "vacation-per-year": data.vacation_per_year,
      "value-hour": data.value_hour,
    };
  },

  // aqui att os dados
  update(newData) {
    data = newData;
  },
};
