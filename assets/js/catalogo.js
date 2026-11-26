// assets/js/catalogo.js
// Catálogo: carga los productos desde la API (GET /api/productos) y los muestra.

let PRODUCTS = [];

const catalog = document.getElementById('catalog');
const search = document.getElementById('search');
const category = document.getElementById('category');

// Pide los productos al servidor
async function cargarProductos() {
  if (!catalog) return;

  try {
    const res = await fetch('/api/productos');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    PRODUCTS = await res.json();
    renderProducts();
  } catch (err) {
    catalog.textContent = 'No pudimos cargar la carta. Intenta nuevamente en unos minutos.';
  }
}

// Dibuja las tarjetas según la búsqueda y la categoría elegidas
function renderProducts() {
  if (!catalog) return;

  const q = search.value.trim().toLowerCase();
  const cat = category.value;

  const filtered = PRODUCTS.filter(
    (p) =>
      (cat === 'all' || p.category === cat) &&
      (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  );

  catalog.innerHTML =
    filtered
      .map(
        (p) => `
          <div class="col-sm-6 col-lg-4">
            <article class="product-card">
              <div class="product-symbol" aria-hidden="true">${p.emoji}</div>
              <h2 class="h4">${p.name}</h2>
              <p>${p.description}</p>
              <p class="price">${formatPrice(p.price)}</p>
              <button class="btn btn-primary add-btn" data-id="${p.id}">Agregar al pedido</button>
            </article>
          </div>`
      )
      .join('') || '<p>No encontramos platos con esa búsqueda.</p>';

  // Botones "Agregar al pedido"
  catalog.querySelectorAll('.add-btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      const product = PRODUCTS.find((p) => p.id === Number(btn.dataset.id));
      addToCart(product);
      btn.textContent = 'Agregado';
      setTimeout(() => (btn.textContent = 'Agregar al pedido'), 900);
    })
  );
}

search?.addEventListener('input', renderProducts);
category?.addEventListener('change', renderProducts);

cargarProductos();