# Sabores Norteños

Sitio web para una MYPE gastronómica ficticia de Lambayeque, orientado a centralizar el catálogo y los pedidos en línea, mejorar su presencia digital y facilitar la atención al cliente.

## Objetivo
Reducir pedidos perdidos o mal registrados, mantener un catálogo visible y ofrecer una experiencia de pedido sencilla desde móvil o escritorio.

## Alcance inicial (front-end)
- Página de inicio con presentación del restaurante.
- Catálogo con productos, categorías y precios.
- Carrito / módulo **Mi pedido**, con cantidades y total.
- Formulario de datos del pedido y confirmación visual.
- Contacto e información del negocio.
- Diseño responsive y criterios básicos de accesibilidad.

> La interfaz inicialmente usa datos de demostración. La integración con Node.js/Express y la API REST se implementará posteriormente.

## Stack previsto
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3
- Próxima etapa: Node.js + Express + API REST + almacenamiento JSON

## Estructura
```text
Sabores_Nortenos/
├── index.html
├── pages/
│   ├── menu.html
│   ├── pedido.html
│   └── contacto.html
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── catalogo.js
│   │   └── pedido.js
│   └── images/ (imágenes por agregar)
└── README.md
```

## Ejecutar
1. Clonar el repositorio.
2. Abrir la carpeta en VS Code.
3. Ejecutar `index.html` usando Live Server.

## Próximas etapas
1. Definir historias de usuario y criterios de aceptación.
2. Completar el catálogo con productos reales y fotografías.
3. Implementar y probar el carrito y formularios.
4. Crear API con Express (`GET /api/productos`, `GET /api/productos/:id`, `POST /api/pedidos`, `POST /api/contacto`).
5. Integrar el front-end con `fetch()`.
6. Evaluar accesibilidad, privacidad y seguridad.

## Equipo
Agregar aquí nombres y roles del equipo.

## Uso de IA
Documentar las herramientas utilizadas, sus usos y cómo se verificaron las sugerencias, según las indicaciones del curso.