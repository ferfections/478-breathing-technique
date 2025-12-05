document.addEventListener("DOMContentLoaded", () => {

    // --- PARTE 1: LA RESPIRACIÓN ---
    const textElement = document.getElementById('instruction-text');

    // Tiempos en milisegundos (Total 19s)
    const totalTime = 19000;
    const breatheTime = 4000; // 4s Inspirar
    const holdTime = 7000;    // 7s Mantener

    function breathAnimation() {
        if (!textElement) return; // Seguridad por si no encuentra el texto

        // 1. Fase INSPIRA
        textElement.innerText = 'Inspira';

        // 2. Fase MANTÉN
        setTimeout(() => {
            textElement.innerText = 'Mantén';

            // 3. Fase EXPULSA
            setTimeout(() => {
                textElement.innerText = 'Expulsa';
            }, holdTime);

        }, breatheTime);
    }

    // Iniciamos la animación si existe el elemento
    if (textElement) {
        breathAnimation();
        setInterval(breathAnimation, totalTime);
    }

    // --- PARTE 2: EL MENÚ DE AJUSTES ---

    // Buscamos los elementos en el HTML por su ID
    const settingsBtn = document.getElementById('settings-btn');
    const closeBtn = document.getElementById('close-btn');
    const modal = document.getElementById('settings-modal');

    // Verificar si el botón existe antes de añadirle el evento
    if (settingsBtn && modal) {
        // Al hacer clic en el engranaje, añadimos la clase 'open'
        settingsBtn.addEventListener('click', () => {
            console.log("Botón ajustes pulsado"); // Esto saldrá en la consola (F12)
            modal.classList.add('open');
        });
    } else {
        console.error("Error: No encuentro el botón 'settings-btn' o el modal 'settings-modal' en el HTML");
    }

    // Botón de cerrar (X)
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });
    }

    // Cerrar haciendo clic fuera (en el fondo oscuro)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }
});