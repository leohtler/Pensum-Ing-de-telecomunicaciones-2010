document.addEventListener('DOMContentLoaded', () => {
    const materias = document.querySelectorAll('.materia');
    const materiasAprobadas = new Set();

    // Función para verificar y actualizar el estado de todas las materias
    const actualizarEstadoMaterias = () => {
        materias.forEach(materia => {
            // No hacer nada si la materia ya está aprobada
            if (materia.classList.contains('approved')) {
                return;
            }

            const requisitosAttr = materia.getAttribute('data-requisitos');
            if (!requisitosAttr) {
                // Si no tiene requisitos, está disponible por defecto
                materia.classList.remove('blocked');
                materia.querySelector('button').disabled = false;
                return;
            }

            const requisitos = JSON.parse(requisitosAttr);
            // every() comprueba si TODOS los requisitos están en el set de aprobadas
            const requisitosCumplidos = requisitos.every(req => materiasAprobadas.has(req));

            if (requisitosCumplidos) {
                materia.classList.remove('blocked');
                materia.querySelector('button').disabled = false;
            } else {
                materia.classList.add('blocked');
                materia.querySelector('button').disabled = true;
            }
        });
    };

    // Agregar el evento de clic a cada botón de "Aprobar"
    materias.forEach(materia => {
        const boton = materia.querySelector('button');
        boton.addEventListener('click', () => {
            // Marcar la materia como aprobada
            materia.classList.add('approved');
            materia.classList.remove('blocked');
            
            // Añadir el ID de la materia al conjunto de aprobadas
            materiasAprobadas.add(materia.id);

            // Ocultar el botón después de aprobar
            boton.style.display = 'none';

            // Volver a verificar el estado de todas las materias para desbloquear las nuevas
            actualizarEstadoMaterias();
        });
    });

    // Llamada inicial para establecer el estado correcto al cargar la página
    actualizarEstadoMaterias();
});
