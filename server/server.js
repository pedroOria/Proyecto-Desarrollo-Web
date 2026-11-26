// server/server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const RAIZ = path.join(__dirname, '..'); // carpeta principal del proyecto

// Middleware: convierte el cuerpo JSON de las peticiones en req.body
app.use(express.json({ limit: '10kb' }));

// Rutas de la API
app.use('/api/productos', require('./routes/productos'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/contacto', require('./routes/contactos'));

// Cualquier otra ruta /api responde 404 en formato JSON
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Front-end: solo se publican estas carpetas (no server/ ni .env)
app.use('/assets', express.static(path.join(RAIZ, 'assets')));
app.use('/pages', express.static(path.join(RAIZ, 'pages')));
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(RAIZ, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});