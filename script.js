document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       BLOQUE 1: MOTOR DE PARTÍCULAS
       ========================================= */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, centerX, centerY;
    let particles = [];
    let particleState = 'hold';

    // AJUSTES
    const PARTICLE_COUNT = 200;
    const FRICTION = 0.95;
    const INHALE_FORCE = 0.03;
    const EXHALE_FORCE = 0.05;
    const TURBULENCE = 0.05;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        centerX = width / 2;
        centerY = height / 2;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.size = Math.random() * 2 + 0.5;
            // Guardamos solo la transparencia, el color lo decidimos al dibujar
            this.alpha = Math.random() * 0.4 + 0.1;
        }

        update() {
            const dx = centerX - this.x;
            const dy = centerY - this.y;
            const distSq = dx * dx + dy * dy;
            const distance = Math.sqrt(distSq);
            const angle = Math.atan2(dy, dx);

            // FÍSICA SEGÚN ESTADO
            if (particleState === 'inhale') {
                this.vx += Math.cos(angle) * INHALE_FORCE;
                this.vy += Math.sin(angle) * INHALE_FORCE;
            } else if (particleState === 'exhale') {
                let force = EXHALE_FORCE;
                if (distance > 300) force *= 0.2;
                this.vx -= Math.cos(angle) * force;
                this.vy -= Math.sin(angle) * force;
            } else { // Hold
                this.vx += (Math.random() - 0.5) * 0.05;
                this.vy += (Math.random() - 0.5) * 0.05;
            }

            // CAOS Y FRICCIÓN
            this.vx += (Math.random() - 0.5) * TURBULENCE;
            this.vy += (Math.random() - 0.5) * TURBULENCE;
            this.vx *= FRICTION;
            this.vy *= FRICTION;
            this.x += this.vx;
            this.y += this.vy;

            // BORDES
            if (particleState === 'inhale' && distance < 30) this.respawnAtEdge();
            if (this.x < -50) this.x = width + 50;
            if (this.x > width + 50) this.x = -50;
            if (this.y < -50) this.y = height + 50;
            if (this.y > height + 50) this.y = -50;
        }

        respawnAtEdge() {
            const edge = Math.floor(Math.random() * 4);
            if (edge === 0) { this.x = Math.random() * width; this.y = -10; }
            else if (edge === 1) { this.x = width + 10; this.y = Math.random() * height; }
            else if (edge === 2) { this.x = Math.random() * width; this.y = height + 10; }
            else { this.x = -10; this.y = Math.random() * height; }
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        draw() {
            // DETECTAR MODO OSCURO PARA EL COLOR
            const isDark = document.body.classList.contains('dark-mode');

            // Si es oscuro: BLANCO (255,255,255). 
            // Si es claro: VERDE OSCURO (#354F52 -> 53, 79, 82)
            const r = isDark ? 255 : 53;
            const g = isDark ? 255 : 79;
            const b = isDark ? 255 : 82;

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();

    /* =========================================
       BLOQUE 2: RESPIRACIÓN
       ========================================= */
    const textElement = document.getElementById('instruction-text');
    const circleElement = document.querySelector('.circle-moving');
    const progressRing = document.querySelector('.progress-ring');
    const breatheTime = 4000;
    const holdTime = 7000;
    const exhaleTime = 8000;
    let timeoutHold, timeoutExhale, timeoutFadeHold, timeoutFadeExhale, timeoutFadeInspire;

    function runBreathingCycle() {
        if (!textElement) return;
        clearAllTimeouts();

        // INSPIRA
        textElement.innerText = 'Inspira';
        textElement.classList.remove('fade-out');
        particleState = 'inhale';
        if (progressRing) {
            progressRing.classList.remove('active');
            progressRing.classList.remove('exiting');
        }
        timeoutFadeHold = setTimeout(() => textElement.classList.add('fade-out'), breatheTime - 500);

        // MANTÉN
        timeoutHold = setTimeout(() => {
            textElement.innerText = 'Mantén';
            textElement.classList.remove('fade-out');
            particleState = 'hold';
            if (progressRing) progressRing.classList.add('active');
            timeoutFadeExhale = setTimeout(() => textElement.classList.add('fade-out'), holdTime - 500);

            // EXPULSA
            timeoutExhale = setTimeout(() => {
                textElement.innerText = 'Suelta';
                textElement.classList.remove('fade-out');
                particleState = 'exhale';
                if (progressRing) {
                    progressRing.classList.remove('active');
                    progressRing.classList.add('exiting');
                }
                timeoutFadeInspire = setTimeout(() => textElement.classList.add('fade-out'), exhaleTime - 500);
            }, holdTime);
        }, breatheTime);
    }

    function clearAllTimeouts() {
        clearTimeout(timeoutHold); clearTimeout(timeoutExhale);
        clearTimeout(timeoutFadeHold); clearTimeout(timeoutFadeExhale); clearTimeout(timeoutFadeInspire);
    }

    if (circleElement && textElement) {
        runBreathingCycle();
        circleElement.addEventListener('animationiteration', runBreathingCycle);
    }

    /* =========================================
       BLOQUE 3: MENÚ Y TEMA
       ========================================= */
    const settingsBtn = document.getElementById('settings-btn');
    const closeBtn = document.getElementById('close-btn');
    const modal = document.getElementById('settings-modal');
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (settingsBtn && modal) settingsBtn.addEventListener('click', () => modal.classList.add('open'));
    if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('zen478-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.classList.add('active');
        }
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggleBtn.classList.toggle('active');
            localStorage.setItem('zen478-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
});