document.addEventListener('DOMContentLoaded', () => {
    const listaProductos = document.getElementById('lista-productos');
    const formularioAgregarProducto = document.getElementById('formulario-agregar-producto');
    const botonLimpiarFormulario = document.getElementById('limpiar-formulario');

    /* obtener productos */
    async function obtenerProductos() {
        const respuesta = await fetch('http://localhost:3001/productos');
        const productos = await respuesta.json();
        return productos;
    }

     /* Opcion de guardar producto */
    async function guardarProducto(producto) {
        await fetch('http://localhost:3001/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
    }
     /* Opcion Eliminar producto */
    async function eliminarProducto(id) {
        await fetch(`http://localhost:3001/productos/${id}`, { method: 'DELETE' });
        mostrarProductos();
    }

    function crearElementoProducto(producto) {
        const divProducto = document.createElement('div');
        divProducto.className = 'card';
        divProducto.innerHTML = `
            <img src="${producto.imagenUrl}" alt="${producto.nombre}">
            <div class="card-container--info">
                <p>${producto.nombre}</p>
                <div class="card-container--value">
                    <p>$ ${producto.precio}</p>
                    <button class="eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            </div>
        `;
        return divProducto;
    }

    async function mostrarProductos() {
        const productos = await obtenerProductos();
        listaProductos.innerHTML = '';
        productos.forEach(producto => {
            const divProducto = crearElementoProducto(producto);
            listaProductos.appendChild(divProducto);
        });
    }

    async function agregarProducto(evento) {
        evento.preventDefault();
        const nombre = document.getElementById('nombre-producto').value;
        const precio = document.getElementById('precio-producto').value;
        const imagenUrl = document.getElementById('url-imagen-producto').value;
        const nuevoProducto = { nombre, precio, imagenUrl };
        await guardarProducto(nuevoProducto);
        mostrarProductos();
        formularioAgregarProducto.reset();
    }

    function limpiarFormulario() {
        formularioAgregarProducto.reset();
    }

    formularioAgregarProducto.addEventListener('submit', agregarProducto);
    botonLimpiarFormulario.addEventListener('click', limpiarFormulario);
    mostrarProductos();
});
