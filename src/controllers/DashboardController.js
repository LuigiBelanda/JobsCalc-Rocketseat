const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    // a var jobs pega todos os nossos jobs e armazena, essas dados vem do model Job
    const jobs = Job.get();
    // a var profile pega todos os dados do nosso profile e armazena, essas dados vem do model Profile
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      // pelo fato da var jobs já vir com todos os jobs basta apenas vermos qual o seu tamanho
      // nesse caso, qual o tamanho do array e colocarmos na propriedade abaixo esse valor
      // pra isso apenas usamos o jobs.length
      total: jobs.length,
    };

    // total de horas por dia de cada job em progress
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      // ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      // Somando a quantidade de status
      // statusCount[done] += 1;
      // statusCount[progress] += 1;
      statusCount[status] += 1;

      // total de horas por dia de cada job em progress
      jobTotalHours = status == "progress" ? (jobTotalHours + Number(job["daily-hours"])) : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    // quantidade de horas que quero trabalhar dia (PROFILE) - MENOS - quantidade de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    // mandando para o index nossos jobs, nossas infos do profile, nº de jobs etc
    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
