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
    const contenedor = document.getElementById('candidaturas');

    const agrupadasPorEstado = {};
    candidaturas.forEach(candidatura => {
        const estado = candidatura["Estado Candidatura"];
        if (!agrupadasPorEstado[estado]) {
            agrupadasPorEstado[estado] = [];
        }
        agrupadasPorEstado[estado].push(candidatura);
    });

    for (let estado in agrupadasPorEstado) {
        agrupadasPorEstado[estado].sort((a, b) => a.Orden - b.Orden);
    }

    ordenDeBloques.sort((a, b) => a.Orden - b.Orden);

    ordenDeBloques.forEach(bloque => {
        const estado = bloque["Estado Candidatura"];

        if (agrupadasPorEstado[estado]) {
            const seccion = document.createElement('section');

            const encabezado = document.createElement('h2');
            encabezado.textContent = estado;

            // Buscar todas las URLs con "Convocatoria" dentro del estado
            const urlsConvocatorias = [];
            agrupadasPorEstado[estado].forEach(candidatura => {
                candidatura.URLs.forEach(url => {
                    if ((url["Nombre Enlace"] === "Convocatoria" || url["Nombre Enlace"] === "BuscarConvocatoria") && url.url) {
                        urlsConvocatorias.push(url.url);
                    }
                });
            });

            // Si hay convocatorias, añadir el botón
            if (urlsConvocatorias.length > 0) {
                const botonConvocatoria = document.createElement('button');
                botonConvocatoria.textContent = "Abrir Convocatorias";
                botonConvocatoria.style.marginLeft = "10px";
                botonConvocatoria.onclick = () => {
                    urlsConvocatorias.forEach(url => {
                        window.open(url, '_blank');
                    });
                };
                encabezado.appendChild(botonConvocatoria);
            }

            seccion.appendChild(encabezado);

            const lista = document.createElement('ul');
            agrupadasPorEstado[estado].forEach(candidatura => {
                const item = document.createElement('li');
                const fechaNombre = document.createElement('strong');
                fechaNombre.textContent = `${candidatura.Fecha} - ${candidatura.Nombre}`;
                item.appendChild(fechaNombre);

                candidatura.URLs.forEach(url => {
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
                });

                lista.appendChild(item);
            });

            seccion.appendChild(lista);
            contenedor.appendChild(seccion);
        }
    });
}

