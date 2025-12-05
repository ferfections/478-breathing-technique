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

// --- LÓGICA DEL MENÚ ---

const settingsBtn = document.getElementById('settings-btn');
const closeBtn = document.getElementById('close-btn');
const modal = document.getElementById('settings-modal');

// Abrir menú
if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        modal.classList.add('open');
    });
}

// Cerrar menú con la X
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });
}

// Cerrar menú si haces clic fuera de la tarjeta (en el fondo oscuro)
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
}

