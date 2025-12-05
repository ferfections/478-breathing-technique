const textElement = document.getElementById('instruction-text');
const totalTime = 19000; // 19s
const breatheTime = 4000; // 4s
const holdTime = 7000;    // 7s

function breathAnimation() {
    textElement.innerText = 'Inspira';

    setTimeout(() => {
        textElement.innerText = 'Mantén';

        setTimeout(() => {
            textElement.innerText = 'Expulsa';
        }, holdTime);

    }, breatheTime);
}

// Inicia inmediatamente
breathAnimation();

// Repite cada 19 segundos
setInterval(breathAnimation, totalTime);