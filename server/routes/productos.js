// server/routes/productos.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const ARCHIVO = path.join(__dirname, '..', 'data', 'productos.json');

// La ruta del archivo es fija: nunca se arma con datos del usuario
// (así evitamos el path traversal).
function leerProductos() {
  return JSON.parse(fs.readFileSync(ARCHIVO, 'utf8'));
}

// GET /api/productos → lista completa
router.get('/', (req, res) => {
  try {
    res.json(leerProductos());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer el catálogo' });
  }
});

// GET /api/productos/:id → un producto
router.get('/:id', (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).json({ error: 'El id debe ser un número entero' });
  }

  try {
    const producto = leerProductos().find((p) => p.id === Number(req.params.id));
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer el catálogo' });
  }
});

module.exports = router;