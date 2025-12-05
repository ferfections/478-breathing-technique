// Esperamos a que todo el HTML esté cargado antes de arrancar
document.addEventListener("DOMContentLoaded", () => {

    const textElement = document.getElementById('instruction-text');
    const circleElement = document.querySelector('.circle-moving');

    // Tiempos en milisegundos (Total 19s)
    const totalTime = 19000;
    const breatheTime = 4000; // 4s Inspirar
    const holdTime = 7000;    // 7s Mantener

    function breathAnimation() {
        console.log("Ciclo iniciado"); // Esto aparecerá en la consola si funciona

        // 1. Fase INSPIRA (Dura 4s)
        textElement.innerText = 'Inspira';
        textElement.style.opacity = "1"; // Nos aseguramos que se vea

        // 2. Fase MANTÉN (Dura 7s)
        setTimeout(() => {
            textElement.innerText = 'Mantén';

            // 3. Fase EXPULSA (Dura 8s)
            setTimeout(() => {
                textElement.innerText = 'Expulsa';
            }, holdTime);

        }, breatheTime);
    }

    // Comprobamos si encontró el elemento de texto
    if (textElement) {
        // Iniciamos la primera vez
        breathAnimation();
        // Repetimos el ciclo infinitamente
        setInterval(breathAnimation, totalTime);
    } else {
        console.error("No he encontrado el elemento con id 'instruction-text'");
    }
});

