// Variables
const carrito = document.getElementById('carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
let articulosCarrito = []


cargarEventListeners()
function cargarEventListeners() {
    // Agregar Curso:
    listaCursos.addEventListener('click', agregarCurso)

    // Eliminar Cursos del carrito:
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar carrito:
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [] // reseteamos el arreglo

        limpiarHTML() // Eliminamos HTML
    })
}

// Funciones
function agregarCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}
// Eliminar un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')

        // Elimina del arreglo de articulosCarrito el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

        carritoHTML() // Iteramos y mostramos nuevamente HTML
    }
}    

// Leer contenido y extraer contenido 
function leerDatosCurso(curso) {

    // Creamos objeto con contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio .oferta').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe el elemento (some)
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++
                return curso // retorna el objeto actualizado
            } else {
                return curso // retorna los objetos que no son duplicados
            }
            articulosCarrito = [...cursos]
        })
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML()
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML()

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `
        // Agrega el HTML del carrito en el Tbody
        contenedorCarrito.appendChild(row)
    })
}

// Eliminar los cursos de tbody
function limpiarHTML() {
    
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
