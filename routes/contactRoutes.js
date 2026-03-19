const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST guardar contacto
router.post("/", async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    const nuevoContacto = new Contact({
      nombre,
      email,
      mensaje,
    });

    await nuevoContacto.save();

    res.status(201).json({ message: "Contacto guardado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al guardar contacto" });
  }
});

// GET contactos
router.get("/", async (req, res) => {
  try {
    const contactos = await Contact.find().sort({ fecha: -1 });
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener contactos" });
  }
});

module.exports = router;