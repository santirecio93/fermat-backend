const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await User.findOne({ email });

    if (existe) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const nuevoUsuario = new User({
      nombre,
      email,
      password,
    });

    await nuevoUsuario.save();

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;