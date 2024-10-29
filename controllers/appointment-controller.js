import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import moment from 'moment';

export const getCalendar = async (req, res) => {
  const { type, year, month, day } = req.params;
  let startDate, endDate;

  if (type === "month") {
    startDate = moment(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD");
    endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");
  } else if (type === "week") {
    startDate = moment(`${year}-${month}-${day}`).startOf("week").format("YYYY-MM-DD");
    endDate = moment(`${year}-${month}-${day}`).endOf("week").format("YYYY-MM-DD");
  } else { // day
    startDate = moment(`${year}-${month}-${day}`).startOf("day").format("YYYY-MM-DD");
    endDate = moment(`${year}-${month}-${day}`).endOf("day").format("YYYY-MM-DD");
  }

  try {
    const appointments = await knex("appointments")
      .join("volunteers", "appointments.volunteerId", "=", "volunteers.volunteerId")
      .whereBetween("appointments.startTime", [startDate + ' 00:00:00', endDate + ' 23:59:59'])
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

