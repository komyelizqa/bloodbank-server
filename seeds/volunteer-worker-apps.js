import volunteersData from '../seed-data/volunteers.js';
import medicalWorkersData from '../seed-data/medical-workers.js';
import appointmentsData from '../seed-data/appointments.js';

export async function seed(knex) {
  await knex("appointments").del();
  await knex("medical_worker").del();
  await knex("volunteers").del();

  await knex("volunteers").insert(volunteersData);
  await knex("medical_worker").insert(medicalWorkersData);
  await knex("appointments").insert(appointmentsData);
}
