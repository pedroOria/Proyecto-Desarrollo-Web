// Utilidades compartidas del front-end (datos de demo hasta conectar la API).
const CART_KEY = 'saboresNortenosCart';
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch{return []}}
function saveCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCartCount()}
function updateCartCount(){const count=getCart().reduce((sum,item)=>sum+item.quantity,0);document.querySelectorAll('#cart-count').forEach(el=>el.textContent=count)}
function addToCart(product){const cart=getCart();const item=cart.find(x=>x.id===product.id);if(item)item.quantity++;else cart.push({...product,quantity:1});saveCart(cart)}
function removeFromCart(id){saveCart(getCart().filter(item=>item.id!==id))}
function formatPrice(price){return `S/ ${Number(price).toFixed(2)}`}
document.addEventListener('DOMContentLoaded',updateCartCount);
// Formularios de demostración: no se transmiten datos a un servidor.
document.getElementById('contact-form')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('contact-feedback').textContent='Mensaje registrado en la demostración. En la siguiente etapa se conectará con el servidor.';e.target.reset()});