// Obtener el estado de candidatura desde la URL
const urlParams = new URLSearchParams(window.location.search);
const estadoFiltrado = urlParams.get('estado');

// Cargar los archivos JSON
Promise.all([
    fetch('candidaturas.json').then(response => response.json()),
    fetch('OrdenDeBloques.json').then(response => response.json())
])
.then(([candidaturas, ordenDeBloques]) => {
    if (estadoFiltrado) {
        mostrarCandidaturasFiltradas(candidaturas, estadoFiltrado);
    }
})
.catch(error => console.error('Error al cargar los archivos JSON:', error));

// Función para mostrar solo las candidaturas del estado seleccionado
function mostrarCandidaturasFiltradas(candidaturas, estadoFiltrado) {
    const contenedor = document.getElementById('candidaturas');
    contenedor.innerHTML = ''; // Limpiar el contenido anterior

    // Filtrar candidaturas por estado seleccionado
    const candidaturasFiltradas = candidaturas.filter(candidatura => candidatura["Estado Candidatura"] === estadoFiltrado);

    if (candidaturasFiltradas.length === 0) {
        contenedor.innerHTML = `<p>No hay candidaturas en el estado "${estadoFiltrado}".</p>`;
        return;
    }

    // Ordenar por "Orden"
    candidaturasFiltradas.sort((a, b) => a.Orden - b.Orden);

    // Crear la sección para el estado filtrado
    const seccion = document.createElement('section');
    const encabezado = document.createElement('h2');
    encabezado.textContent = estadoFiltrado;
    seccion.appendChild(encabezado);

    // Crear lista de candidaturas
    const lista = document.createElement('ul');
    candidaturasFiltradas.forEach(candidatura => {
        const item = document.createElement('li');
        const fechaNombre = document.createElement('strong');
        fechaNombre.textContent = `${candidatura.Fecha} - ${candidatura.Nombre}`;
        item.appendChild(fechaNombre);

        // Agregar enlaces
        candidatura.URLs.forEach(url => {
            if (url.url) {
                const enlace = document.createElement('a');
                enlace.href = url.url;
                enlace.target = "_blank";
                enlace.textContent = url["Nombre Enlace"];
                item.appendChild(document.createElement('br'));
                item.appendChild(enlace);

                if (url.Nota) {
                    const notaTexto = document.createTextNode(` - ${url.Nota}`);
                    item.appendChild(notaTexto);
                }
            }
        });

        lista.appendChild(item);
    });

    seccion.appendChild(lista);
    contenedor.appendChild(seccion);
}
