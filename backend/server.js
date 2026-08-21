require("dotenv").config();
require("./database");

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const historyRoutes = require("./routes/historyRoutes");
const predictionRoutes = require("./routes/predictionRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Makes Socket.IO available inside route files
app.set("io", io);

app.use("/api/history", historyRoutes);
app.use("/api/predict", predictionRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running successfully" });
});

io.on("connection", (socket) => {
  console.log("Frontend connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Frontend disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});