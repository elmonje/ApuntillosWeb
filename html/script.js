// Función para cargar el JSON desde un archivo local
async function cargarCandidaturas() {
    try {
        const response = await fetch('candidaturas.json');
        const candidaturas = await response.json();

        // Ordenar candidaturas por el campo "Orden"
        candidaturas.sort((a, b) => a.Orden - b.Orden);

        // Mapeo de secciones a los identificadores de sus respectivos divs
        // Mapeo de secciones a los identificadores de sus respectivos divs
        const secciones = {
            "Apuntado": "apuntado-list",
            "En lista de admitidos": "en-lista-admitidos-list",
            "A la espera de notas": "a-la-espera-notas-list",
            "Aprobado Fase 1": "aprobado-fase1-list",
            "Lista de Interinos": "lista-interinos-list",
            "Proceso Terminado": "proceso-terminado-list",
            "Recopilacion de examenes": "recopilacion-examenes-list",
            "Otros enlaces": "otros-enlaces-list"
        };

        // Iterar sobre las candidaturas y asignarlas a la sección correspondiente
        candidaturas.forEach(candidatura => {
            const sectionId = secciones[candidatura["Estado Candidatura"]];
            const sectionElement = document.getElementById(sectionId);

            if (sectionElement) {
                // Crear un div para la candidatura
                const candidaturaDiv = document.createElement('div');
                candidaturaDiv.classList.add('candidatura');

                // Agregar la fecha y el nombre
                const fechaNombre = document.createElement('p');
                fechaNombre.textContent = `${candidatura.Fecha} - ${candidatura.Nombre}`;
                candidaturaDiv.appendChild(fechaNombre);

                // Agregar las URLs
                const urlsDiv = document.createElement('div');
                urlsDiv.classList.add('urls');
                candidatura.URLs.forEach(urlData => {
                    const enlace = document.createElement('a');
                    enlace.href = urlData.url;
                    enlace.textContent = urlData["Nombre Enlace"];
                    enlace.target = "_blank"; // Para abrir en una nueva pestaña
                    urlsDiv.appendChild(enlace);
                    const nota = document.createElement('p');
					if (urlData.Nota != "") 
					{
                    nota.textContent = `Nota: ${urlData.Nota}`;
					}
                    urlsDiv.appendChild(nota);
                });

                candidaturaDiv.appendChild(urlsDiv);
                sectionElement.appendChild(candidaturaDiv);
            }
        });
    } catch (error) {
        console.error('Error al cargar las candidaturas:', error);
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarCandidaturas);
