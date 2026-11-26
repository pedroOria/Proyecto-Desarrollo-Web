// server/routes/contactos.js
// POST /api/contacto → valida y registra un mensaje en contactos.json

const express = require('express');
const almacen = require('../utils/almacen');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message, privacy } = req.body;

  // 1. Validar los datos recibidos
  const errores = [];
  if (typeof name !== 'string' || !name.trim() || name.length > 80) {
    errores.push('Nombre inválido');
  }
  if (
    typeof email !== 'string' ||
    email.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errores.push('Correo inválido');
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 500) {
    errores.push('Mensaje inválido (máximo 500 caracteres)');
  }
  if (privacy !== true) {
    errores.push('Debes aceptar el uso de tus datos');
  }
  if (errores.length) {
    return res.status(400).json({ errores });
  }

  try {
    // 2. Guardar el mensaje
    const contactos = almacen.leer('contactos');
    const nuevo = {
      id: contactos.reduce((max, c) => Math.max(max, c.id), 0) + 1,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    contactos.push(nuevo);
    almacen.guardar('contactos', contactos);

    // 3. Confirmar al cliente
    res.status(201).json({ id: nuevo.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo registrar el mensaje' });
  }
});

module.exports = router;