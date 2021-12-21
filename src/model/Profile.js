// Model responsável por fornecer dados

let data = {
    name: "Mayk",
    avatar: "https://github.com/maykbrito.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
};

// aqui exportamos algumas coisas do nosso arquivo que vão poder ser usadas em outros lugares do projeto
module.exports = {
    // quando o get deste model for chamado ele irá retornar apenas a const data
    get() {
        return data;
    },

    // aqui att os dados 
    update(newData) {
        data = newData;
    }
}
