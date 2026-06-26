document.addEventListener('DOMContentLoaded', () => {
    // 1. VARIABLES Y SELECTORES (Guardamos los elementos de la página)
    const carrito = [];
    const botonesAgregar = document.querySelectorAll('.add-to-cart');
    const listaCarrito = document.getElementById('cart-items');
    const contadorCarrito = document.getElementById('cart-count');
    const totalCarrito = document.getElementById('cart-total');
    const botonSimularCompra = document.getElementById('checkout');
    const botonAlternarCarrito = document.getElementById('cart-toggle');
    const contenedorCarrito = document.getElementById('cart');

    // 2. FUNCIÓN AUXILIAR: Dar formato de moneda peruana (S/.)
    function formatearPrecio(monto) {
        return 'S/. ' + monto.toFixed(2);
    }

    // 3. FUNCIÓN PRINCIPAL: Actualizar el diseño (UI) del carrito
    function actualizarInterfaz() {
        // Limpiamos la lista visual antes de redibujarla
        listaCarrito.innerHTML = '';

        // Si no hay productos, mostramos mensaje de vacío
        if (carrito.length === 0) {
            const itemVacio = document.createElement('li');
            itemVacio.className = 'empty';
            itemVacio.textContent = 'El carrito está vacío.';
            listaCarrito.appendChild(itemVacio);

            contadorCarrito.textContent = '0';
            totalCarrito.textContent = 'Total: S/. 0.00';
            return;
        }

        // Si hay productos, los recorremos y sumamos el total
        let sumaTotal = 0;
        let cantidadTotalProductos = 0;

        carrito.forEach(producto => {
            // Creamos la línea de texto para el producto
            const itemLista = document.createElement('li');
            const precioFormateado = formatearPrecio(producto.precio);
            itemLista.textContent = `${producto.nombre} — ${precioFormateado} x${producto.cantidad}`;
            listaCarrito.appendChild(itemLista);

            // Calculamos totales paso a paso
            sumaTotal += producto.precio * producto.cantidad;
            cantidadTotalProductos += producto.cantidad;
        });

        // Mostramos los resultados finales en la página
        contadorCarrito.textContent = cantidadTotalProductos;
        totalCarrito.textContent = 'Total: ' + formatearPrecio(sumaTotal);
    }

    // 4. FUNCIÓN: Lógica para agregar un producto al arreglo
    function agregarAlCarrito(id, nombre, precio) {
        // Buscamos si el producto ya existe en el carrito
        const productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            // Si ya existe, solo aumentamos la cantidad
            productoExistente.cantidad += 1;
        } else {
            // Si es nuevo, lo agregamos con cantidad 1
            carrito.push({ 
                id: id, 
                nombre: nombre, 
                precio: precio, 
                cantidad: 1 
            });
        }

        // Refrescamos la pantalla
        actualizarInterfaz();
    }

    // 5. ESCUCHADORES DE EVENTOS (Clicks del usuario)

    // Detectar click en cualquier botón de "Agregar al carrito"
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            // Buscamos el contenedor del producto más cercano (.producto)
            const tarjetaProducto = evento.target.closest('.producto');
            
            // Leemos sus datos guardados en el HTML (data-id, data-name, etc.)
            const id = tarjetaProducto.dataset.id;
            const nombre = tarjetaProducto.dataset.name;
            const precio = parseFloat(tarjetaProducto.dataset.price);

            agregarAlCarrito(id, nombre, precio);
        });
    });

    // Detectar click en "Finalizar Compra"
    botonSimularCompra.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío.');
            return;
        }
        // Extraemos solo el monto limpio del texto del total
        const textoTotal = totalCarrito.textContent.replace('Total: ', '');
        alert('Gracias por su compra (simulada). Total: ' + textoTotal);
    });

    // Detectar click para abrir o cerrar la ventana del carrito
    botonAlternarCarrito.addEventListener('click', () => {
        // Abre o cierra usando una clase CSS (.open)
        const estaAbierto = contenedorCarrito.classList.toggle('open');
        // Actualiza el atributo de accesibilidad
        botonAlternarCarrito.setAttribute('aria-expanded', String(estaAbierto));
    });

    // 6. INICIO: Arrancar la interfaz vacía por primera vez
    actualizarInterfaz();
});