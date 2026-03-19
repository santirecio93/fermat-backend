require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("node:dns");

// 🔥 FORZAR DNS (para evitar error SRV en Mongo)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔍 Ruta test
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Rutas
app.use("/api/contact", require("./routes/contactRoutes"));

// Puerto dinámico (Render usa esto)
const PORT = process.env.PORT || 5000;

// 🔥 Conectar a Mongo y arrancar servidor
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ ERROR MONGO:", error);
    process.exit(1); // corta el proceso si falla (PRO)
  }
};

startServer();