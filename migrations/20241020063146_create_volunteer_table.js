/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return await knex.schema.createTable('volunteers', (table) => {
    table.increments('volunteerId').primary();  // Primary key, auto-incrementing ID
    table.string('name').notNullable();         // Volunteer name
    table.string('email').notNullable().unique();  // Volunteer email
    table.string('password').notNullable();     // Password
    table.date('dateOfBirth').notNullable();    // Date of birth
    table.string('bloodType', 3).notNullable(); // Blood type (A+, B-, etc.)
    table.string('sex', 6).notNullable();       // Gender (male, female, etc.)
    table.boolean('medicalEligibility').notNullable();  // Medical eligibility status
    table.timestamp('created_at').defaultTo(knex.fn.now());  // Creation timestamp
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));  // Update timestamp
  });
}

export async function down(knex) {
  return knex.schema.dropTable('volunteers');
}
  
