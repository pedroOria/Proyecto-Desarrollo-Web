// server/utils/almacen.js
// Lee y guarda los archivos JSON de la carpeta server/data.

const fs = require('fs');
const path = require('path');

const CARPETA = path.join(__dirname, '..', 'data');

// Solo se permiten estos nombres: así nunca se arma una ruta con datos
// del usuario (protección contra path traversal).
const PERMITIDOS = ['productos', 'pedidos', 'contactos'];

function rutaDe(nombre) {
  if (!PERMITIDOS.includes(nombre)) {
    throw new Error('Archivo no permitido');
  }
  return path.join(CARPETA, `${nombre}.json`);
}

// Devuelve el contenido del archivo como arreglo (o [] si no existe)
function leer(nombre) {
  const ruta = rutaDe(nombre);
  if (!fs.existsSync(ruta)) return [];
  return JSON.parse(fs.readFileSync(ruta, 'utf8'));
}

// Reemplaza el contenido del archivo con los datos recibidos
function guardar(nombre, datos) {
  fs.writeFileSync(rutaDe(nombre), JSON.stringify(datos, null, 2), 'utf8');
}

module.exports = { leer, guardar };