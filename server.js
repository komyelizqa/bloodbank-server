import express from 'express';
import appointmentRoutes from './routes/appointments-routes.js';
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use(appointmentRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
