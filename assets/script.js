document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------
       PARTE 1: LA RESPIRACIÓN
    ------------------------------------------------ */
    const textElement = document.getElementById('instruction-text');
    const totalTime = 19000;
    const breatheTime = 4000;
    const holdTime = 7000;

    function breathAnimation() {
        if (!textElement) return;

        textElement.innerText = 'Inspira';
        textElement.style.animation = "light-pulse 1s ease-in-out infinite"; // Aseguramos animación

        setTimeout(() => {
            textElement.innerText = 'Mantén';

            setTimeout(() => {
                textElement.innerText = 'Expulsa';
            }, holdTime);

        }, breatheTime);
    }

    if (textElement) {
        breathAnimation();
        setInterval(breathAnimation, totalTime);
    }

    /* ------------------------------------------------
       PARTE 2: EL MENÚ DE AJUSTES
    ------------------------------------------------ */
    const settingsBtn = document.getElementById('settings-btn');
    const closeBtn = document.getElementById('close-btn');
    const modal = document.getElementById('settings-modal');

    if (settingsBtn && modal) {
        settingsBtn.addEventListener('click', () => {
            modal.classList.add('open');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }

    /* ------------------------------------------------
       PARTE 3: MODO OSCURO (EL INTERRUPTOR)
    ------------------------------------------------ */
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {
        // Cargar preferencia guardada
        const savedTheme = localStorage.getItem('zen478-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.classList.add('active');
        }

        // Al hacer clic
        themeToggleBtn.addEventListener('click', () => {
            console.log("¡Interruptor pulsado!"); // MIRA LA CONSOLA SI ESTO SALE

            // 1. Cambiar clase al body
            document.body.classList.toggle('dark-mode');

            // 2. Mover la bolita del interruptor
            themeToggleBtn.classList.toggle('active');

            // 3. Guardar en memoria
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('zen478-theme', isDark ? 'dark' : 'light');
        });
    } else {
        console.error("ERROR: No encuentro el elemento con id 'theme-toggle' en el HTML");
    }
});