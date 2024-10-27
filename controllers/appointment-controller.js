import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getCalendar = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const appointments = await knex("appointments")
    .join("volunteers", "appointments.volunteerId", "=", "volunteers.volunteerId")
    .select(
      "appointments.appointmentId",
      "volunteers.name as volunteer",
      "appointments.startTime",
      "appointments.endTime"
    );  

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

export const createAppointment = async (req, res) => {
  const { startTime, endTime, status } = req.body;

  if (!startTime || !endTime || !status) {
    return res.status(400).json({
      message: "Please provide missing data"
    });
  }

  try {
    const [appointmentId] = await knex("appointments").insert({
      volunteerId: 1,
      workerId: 1,
      startTime,
      endTime,
      status: "scheduled",
      created_at: knex.fn.now()
    }).returning("appointmentId");

    // Update this query to include both startTime and endTime
    const newAppointment = await knex("appointments")
      .join("volunteers", "appointments.volunteerId", "=", "volunteers.volunteerId")
      .select(
        "appointments.appointmentId",
        "volunteers.name as volunteer",
        "appointments.startTime",
        "appointments.endTime"
      )
      .where("appointments.appointmentId", appointmentId)
      .first();

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};


export const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const deleted = await knex("appointments").where({ appointmentId }).del();

    if (deleted) {
      res.status(200).json({ message: "Appointment canceled successfully" });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

