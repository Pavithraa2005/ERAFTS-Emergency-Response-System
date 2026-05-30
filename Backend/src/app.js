
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const incidentRoutes = require("./routes/incident.routes");

const authRoutes =
require("./routes/auth.routes");

app.use(
"/api/auth",
authRoutes
);
app.use(express.json()); // ✅ REQUIRED
app.use("/api/incidents", incidentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
