export async function up(knex) {
  return await knex.schema.createTable('appointments', (table) => {
    table.increments('appointmentId').primary();
    table.integer('volunteerId').unsigned().notNullable();
    table.integer('workerId').unsigned().notNullable();
    table.timestamp('startTime').notNullable();
    table.timestamp('endTime').notNullable();
    table.string('status').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    // Foreign key constraints
    table.foreign('volunteerId').references('volunteerId').inTable('volunteers').onDelete('CASCADE');
    table.foreign('workerId').references('workerId').inTable('medical_worker').onDelete('CASCADE');
  });
}

export async function down(knex) {
  return knex.schema.dropTable('appointments');
}




  
  