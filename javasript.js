document.addEventListener('DOMContentLoaded', function(){
	const cart = [];
	const addButtons = document.querySelectorAll('.add-to-cart');
	const cartItems = document.getElementById('cart-items');
	const cartCount = document.getElementById('cart-count');
	const cartTotal = document.getElementById('cart-total');

	function formatMoney(n){
		return '$' + n.toFixed(2);
	}

	function updateCartUI(){
		cartItems.innerHTML = '';
		if(cart.length === 0){
			const li = document.createElement('li');
			li.className = 'empty';
			li.textContent = 'El carrito está vacío.';
			cartItems.appendChild(li);
			cartCount.textContent = '0';
			cartTotal.textContent = 'Total: $0.00';
			return;
		}
		let total = 0;
		cart.forEach(item => {
			const li = document.createElement('li');
			li.textContent = item.name + ' — ' + formatMoney(item.price) + ' x' + item.qty;
			cartItems.appendChild(li);
			total += item.price * item.qty;
		});
		cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
		cartTotal.textContent = 'Total: ' + formatMoney(total);
	}

	function addToCart(id,name,price){
		const existing = cart.find(i=>i.id===id);
		if(existing){ existing.qty += 1; }
		else { cart.push({id,name,price,qty:1}); }
		updateCartUI();
	}

	addButtons.forEach(btn => {
		btn.addEventListener('click', (e)=>{
			const article = e.target.closest('.producto');
			const id = article.dataset.id;
			const name = article.dataset.name;
			const price = parseFloat(article.dataset.price);
			addToCart(id,name,price);
		});
	});

	document.getElementById('checkout').addEventListener('click', ()=>{
		if(cart.length===0){ alert('El carrito está vacío.'); return; }
		alert('Gracias por su compra (simulada). Total: ' + document.getElementById('cart-total').textContent.replace('Total: ','') );
	});

	document.getElementById('cart-toggle').addEventListener('click', ()=>{
		const cartEl = document.getElementById('cart');
		const expanded = cartEl.classList.toggle('open');
		document.getElementById('cart-toggle').setAttribute('aria-expanded', String(expanded));
	});

	updateCartUI();
});
