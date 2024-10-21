/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return await knex.schema.createTable('medical_worker', (table) => {
      table.increments('workerId').primary();  // Primary key, auto-incrementing ID
      table.string('name').notNullable();      // Medical worker name
      table.string('email').notNullable().unique();  // Email address
      table.string('password').notNullable();  // Password
      table.string('position').notNullable();  // Role or position (e.g., doctor, nurse)
    });
  }
  
  export async function down(knex) {
    return knex.schema.dropTable('medical_worker');
  }
  
