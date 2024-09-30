// Cargar el archivo JSON con el orden de los bloques
Promise.all([
    fetch('candidaturas.json').then(response => response.json()),
    fetch('OrdenDeBloques.json').then(response => response.json())
])
.then(([candidaturas, ordenDeBloques]) => {
    mostrarCandidaturas(candidaturas, ordenDeBloques);
})
.catch(error => console.error('Error al cargar los archivos JSON:', error));

// Función para mostrar las candidaturas agrupadas por "Estado Candidatura"
function mostrarCandidaturas(candidaturas, ordenDeBloques) {
    // Seleccionar el contenedor donde se mostrarán las candidaturas
    const contenedor = document.getElementById('candidaturas');

    // Agrupar las candidaturas por "Estado Candidatura"
    const agrupadasPorEstado = {};
    candidaturas.forEach(candidatura => {
        const estado = candidatura["Estado Candidatura"];
        if (!agrupadasPorEstado[estado]) {
            agrupadasPorEstado[estado] = [];
        }
        agrupadasPorEstado[estado].push(candidatura);
    });

    // Ordenar las candidaturas dentro de cada grupo por el campo "Orden"
    for (let estado in agrupadasPorEstado) {
        agrupadasPorEstado[estado].sort((a, b) => a.Orden - b.Orden);
    }

    // Ordenar los bloques de "Estado Candidatura" según el archivo "OrdenDeBloques.json"
    ordenDeBloques.sort((a, b) => a.Orden - b.Orden);

    // Generar las secciones por cada estado en el orden especificado en "OrdenDeBloques.json"
    ordenDeBloques.forEach(bloque => {
        const estado = bloque["Estado Candidatura"];
        
        // Solo crear una sección si hay candidaturas para ese estado
        if (agrupadasPorEstado[estado]) {
            // Crear un nuevo elemento sección para cada estado
            const seccion = document.createElement('section');

            // Crear el encabezado con el nombre del estado
            const encabezado = document.createElement('h2');
            encabezado.textContent = estado;
            seccion.appendChild(encabezado);

            // Crear una lista de las candidaturas bajo ese estado
            const lista = document.createElement('ul');
            agrupadasPorEstado[estado].forEach(candidatura => {
                const item = document.createElement('li');
                const fechaNombre = `${candidatura.Fecha} - ${candidatura.Nombre}`;
                item.innerHTML = `<strong>${fechaNombre}</strong>`;
                
                // Agregar las URLs de cada candidatura
                candidatura.URLs.forEach(url => {
                    const enlace = document.createElement('a');
                    enlace.href = url.url;
                    enlace.textContent = url["Nombre Enlace"];
                    const nota = url.Nota ? ` - ${url.Nota}` : '';
                    item.innerHTML += `<br><a href="${url.url}" target="_blank">${url["Nombre Enlace"]}</a>${nota}`;
                });

                lista.appendChild(item);
            });

            seccion.appendChild(lista);
            contenedor.appendChild(seccion);
        }
    });
}