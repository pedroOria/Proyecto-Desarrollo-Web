// server/routes/pedidos.js
// POST /api/pedidos → valida y registra un pedido en pedidos.json

const express = require('express');
const almacen = require('../utils/almacen');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, phone, notes = '', privacy, items } = req.body;

  // 1. Validar los datos recibidos
  const errores = [];
  if (typeof name !== 'string' || !name.trim() || name.length > 80) {
    errores.push('Nombre inválido');
  }
  if (typeof phone !== 'string' || !/^[0-9+\s-]{6,20}$/.test(phone)) {
    errores.push('Teléfono inválido');
  }
  if (typeof notes !== 'string' || notes.length > 300) {
    errores.push('El detalle supera los 300 caracteres');
  }
  if (privacy !== true) {
    errores.push('Debes aceptar el uso de tus datos');
  }
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    errores.push('El pedido está vacío');
  }
  if (errores.length) {
    return res.status(400).json({ errores });
  }

  try {
    // 2. Recalcular el total con los precios del servidor
    //    (los precios que llegan del navegador no son confiables)
    const productos = almacen.leer('productos');
    const detalle = [];
    let total = 0;

    for (const item of items) {
      const producto = productos.find((p) => p.id === item.id);
      const cantidad = item.quantity;

      if (!producto || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > 20) {
        return res.status(400).json({ errores: ['Producto o cantidad inválidos'] });
      }

      total += producto.price * cantidad;
      detalle.push({
        id: producto.id,
        name: producto.name,
        price: producto.price,
        quantity: cantidad,
      });
    }

    // 3. Guardar el pedido
    const pedidos = almacen.leer('pedidos');
    const nuevo = {
      id: pedidos.reduce((max, p) => Math.max(max, p.id), 0) + 1,
      name: name.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      items: detalle,
      total: Math.round(total * 100) / 100,
      createdAt: new Date().toISOString(),
    };
    pedidos.push(nuevo);
    almacen.guardar('pedidos', pedidos);

    // 4. Confirmar al cliente
    res.status(201).json({ id: nuevo.id, total: nuevo.total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo registrar el pedido' });
  }
});

module.exports = router;