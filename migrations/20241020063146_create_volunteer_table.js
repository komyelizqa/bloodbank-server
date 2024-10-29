/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return await knex.schema.createTable('volunteers', (table) => {
    table.increments('volunteerId').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.date('dateOfBirth').notNullable();
    table.string('bloodType', 3).notNullable();
    table.string('sex', 6).notNullable();
    table.boolean('medicalEligibility').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));  // Update timestamp
  });
}

export async function down(knex) {
  return knex.schema.dropTable('volunteers');
}
  
