const Database = require("../db/config");

/*
let data = [
  {
    id: 1,
    name: "Pizzaria Guloso",
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
*/

module.exports = {
  async get() {
    const db = await Database();

    // db.all traz todos os dados
    const jobs = await db.all(`SELECT * FROM jobs`);

    await db.close();

    // usando o map para normalizar todos os dados do array que veio dos jobs
    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      created_at: job.created_at,
    }));
  },

  async create(newJob) {
    // data.push(newJob);

    const db = await Database();

    // inserindo o novo job no db
    await db.run(`INSERT INTO jobs (
      name, 
      daily_hours, 
      total_hours,
      created_at
      ) VALUES (
        "${newJob.name}",
        ${newJob["daily-hours"]},
        ${newJob["total-hours"]},
        ${newJob.created_at}
      )`);

    await db.close();
  },

  async update(updatedJob, jobId) {
    // data = newJob;

    const db = await Database();

    await db.run(`UPDATE jobs SET 
      name = "${updatedJob.name}",
      daily_hours = ${updatedJob["daily-hours"]},
      total_hours = ${updatedJob["total-hours"]}
      WHERE id = ${jobId}
    `);

    await db.close();
  },

  async delete(id) {
    // data = data.filter((job) => Number(job.id) !== Number(id));

    const db = await Database();

    // excluindo o job que tiver o mesmo id que veio como parâmetro para função
    await db.run(`DELETE FROM jobs WHERE id = ${id}`);

    await db.close();
  },
};
