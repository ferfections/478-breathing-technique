const textElement = document.getElementById('text');
const totalTime = 19000; // 19 segundos en milisegundos
const breatheTime = 4000; // 4 segundos
const holdTime = 7000;    // 7 segundos

function breathAnimation() {
    // 1. Fase de Inspirar (4s)
    textElement.innerText = 'INSPIRA';

    // 2. Fase de Mantener (7s)
    setTimeout(() => {
        textElement.innerText = 'MANTÉN';

        // 3. Fase de Exhalar (8s)
        setTimeout(() => {
            textElement.innerText = 'EXPULSA';
        }, holdTime);

    }, breatheTime);
}

// Iniciar la primera vez
breathAnimation();

// Repetir el ciclo cada 19 segundos
setInterval(breathAnimation, totalTime);