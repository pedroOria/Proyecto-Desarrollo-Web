// assets/js/app.js
// Utilidades compartidas del front-end: carrito, precios y formulario de contacto.

const CART_KEY = 'saboresNortenosCart';

// ---------- Carrito (guardado en localStorage) ----------
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cart-count').forEach((el) => (el.textContent = count));
}

function addToCart(product) {
  const cart = getCart();
  const item = cart.find((x) => x.id === product.id);
  if (item) item.quantity++;
  else cart.push({ ...product, quantity: 1 });
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter((item) => item.id !== id));
}

// ---------- Precios ----------
function formatPrice(price) {
  return `S/ ${Number(price).toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', updateCartCount);

// ---------- Formulario de contacto (POST /api/contacto) ----------
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const feedback = document.getElementById('contact-feedback');
  const boton = contactForm.querySelector('button[type="submit"]');

  const mensaje = {
    name: document.getElementById('contact-name').value,
    email: document.getElementById('contact-email').value,
    message: document.getElementById('contact-message').value,
    privacy: document.getElementById('contact-privacy').checked,
  };

  boton.disabled = true;
  feedback.textContent = 'Enviando mensaje...';

  try {
    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mensaje),
    });
    const data = await res.json();

    if (!res.ok) {
      feedback.textContent = (data.errores || [data.error]).join('. ');
      return;
    }

    feedback.textContent = '¡Mensaje enviado! Te responderemos pronto.';
    contactForm.reset();
  } catch (err) {
    feedback.textContent = 'No se pudo enviar el mensaje. Intenta nuevamente.';
  } finally {
    boton.disabled = false;
  }
});