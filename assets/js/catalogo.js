const PRODUCTS=[
{id:1,name:'Arroz con pato',description:'Arroz verde con pato, sazón norteña y acompañamiento.',price:28,category:'platos',emoji:'🍛'},
{id:2,name:'Seco de cabrito',description:'Cabrito guisado al estilo tradicional, con frejoles y arroz.',price:32,category:'platos',emoji:'🍲'},
{id:3,name:'Chinguirito',description:'Preparación tradicional de pescado seco deshilachado.',price:24,category:'entradas',emoji:'🐟'},
{id:4,name:'Causa norteña',description:'Causa de papa con relleno y toque regional.',price:16,category:'entradas',emoji:'🥔'},
{id:5,name:'King Kong',description:'Dulce tradicional lambayecano para compartir.',price:12,category:'entradas',emoji:'🍰'},
{id:6,name:'Chicha de jora',description:'Bebida tradicional de sabor característico.',price:8,category:'bebidas',emoji:'🥤'},
{id:7,name:'Limonada',description:'Limonada fresca preparada al momento.',price:7,category:'bebidas',emoji:'🍋'},
{id:8,name:'Sudado norteño',description:'Pescado en caldo aromático con sabores del norte.',price:26,category:'platos',emoji:'🐠'}
];
const catalog=document.getElementById('catalog'),search=document.getElementById('search'),category=document.getElementById('category');
function renderProducts(){if(!catalog)return;const q=search.value.trim().toLowerCase();const cat=category.value;const filtered=PRODUCTS.filter(p=>(cat==='all'||p.category===cat)&&(p.name.toLowerCase().includes(q)||p.description.toLowerCase().includes(q)));catalog.innerHTML=filtered.map(p=>`<div class="col-sm-6 col-lg-4"><article class="product-card"><div class="product-symbol" aria-hidden="true">${p.emoji}</div><h2 class="h4">${p.name}</h2><p>${p.description}</p><p class="price">${formatPrice(p.price)}</p><button class="btn btn-primary add-btn" data-id="${p.id}">Agregar al pedido</button></article></div>`).join('')||'<p>No encontramos platos con esa búsqueda.</p>';catalog.querySelectorAll('.add-btn').forEach(btn=>btn.addEventListener('click',()=>{const product=PRODUCTS.find(p=>p.id===Number(btn.dataset.id));addToCart(product);btn.textContent='Agregado';setTimeout(()=>btn.textContent='Agregar al pedido',900)}))}
search?.addEventListener('input',renderProducts);category?.addEventListener('change',renderProducts);renderProducts();