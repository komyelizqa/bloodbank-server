/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return await knex.schema.createTable('medical_worker', (table) => {
      table.increments('workerId').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('position').notNullable();
    });
  }
  
  export async function down(knex) {
    return knex.schema.dropTable('medical_worker');
  }
  
