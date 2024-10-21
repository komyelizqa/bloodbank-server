export async function up(knex) {
  return await knex.schema.createTable('appointments', (table) => {
    table.increments('appointmentId').primary();      // Primary key
    table.integer('volunteerId').unsigned().notNullable();   // Foreign key to volunteers
    table.integer('workerId').unsigned().notNullable();      // Foreign key to medical workers
    table.timestamp('startTime').notNullable();             // Start time of the appointment
    table.timestamp('endTime').notNullable();               // End time of the appointment
    table.string('status').notNullable();                   // Appointment status
    table.timestamp('created_at').defaultTo(knex.fn.now());  // Date the appointment was created

    // Foreign key constraints
    table.foreign('volunteerId').references('volunteerId').inTable('volunteers').onDelete('CASCADE');
    table.foreign('workerId').references('workerId').inTable('medical_worker').onDelete('CASCADE');
  });
}

export async function down(knex) {
  return knex.schema.dropTable('appointments');
}




  
  