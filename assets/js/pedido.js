// assets/js/pedido.js
// Módulo "Mi pedido": muestra el carrito y envía el pedido a la API (POST /api/pedidos).

const list = document.getElementById('order-items');
const totalEl = document.getElementById('order-total');
const form = document.getElementById('order-form');
const feedback = document.getElementById('order-feedback');

// Evita que texto guardado en el navegador se interprete como HTML
function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Dibuja los productos del carrito y el total
function renderOrder() {
  if (!list) return;

  const cart = getCart();

  if (!cart.length) {
    list.innerHTML = `
      <div class="feature-card">
        <p class="mb-2">Tu pedido está vacío.</p>
        <a href="menu.html" class="btn btn-primary">Ver carta</a>
      </div>`;
    totalEl.textContent = formatPrice(0);
    return;
  }

  list.innerHTML = cart
    .map(
      (item) => `
        <div class="order-line">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <div class="text-secondary">${formatPrice(item.price)} × ${item.quantity}</div>
          </div>
          <div class="d-flex align-items-center gap-3">
            <strong>${formatPrice(item.price * item.quantity)}</strong>
            <button class="btn btn-outline-danger btn-sm remove" data-id="${item.id}"
              aria-label="Quitar ${escapeHtml(item.name)}">Quitar</button>
          </div>
        </div>`
    )
    .join('');

  totalEl.textContent = formatPrice(cart.reduce((s, i) => s + i.price * i.quantity, 0));

  list.querySelectorAll('.remove').forEach((b) =>
    b.addEventListener('click', () => {
      removeFromCart(Number(b.dataset.id));
      renderOrder();
    })
  );
}

// Envío del formulario
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cart = getCart();
  if (!cart.length) {
    feedback.textContent = 'Agrega al menos un producto antes de enviar.';
    return;
  }

  // Solo se envían id y cantidad: el servidor calcula el total con sus precios
  const pedido = {
    name: document.getElementById('customer-name').value,
    phone: document.getElementById('customer-phone').value,
    notes: document.getElementById('order-notes').value,
    privacy: document.getElementById('privacy').checked,
    items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
  };

  const boton = form.querySelector('button[type="submit"]');
  boton.disabled = true;
  feedback.textContent = 'Enviando pedido...';

  try {
    const res = await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    });
    const data = await res.json();

    if (!res.ok) {
      feedback.textContent = (data.errores || [data.error]).join('. ');
      return;
    }

    feedback.textContent = `¡Pedido #${data.id} registrado! Total: ${formatPrice(data.total)}`;
    saveCart([]);
    renderOrder();
    form.reset();
  } catch (err) {
    feedback.textContent = 'No se pudo enviar el pedido. Intenta nuevamente.';
  } finally {
    boton.disabled = false;
  }
});

renderOrder();