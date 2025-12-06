# 🌿 Zen478 | Guía de Respiración Visual

**Zen478** es una aplicación web minimalista e inmersiva diseñada para ayudar a los usuarios a reducir la ansiedad y conciliar el sueño mediante la técnica de respiración **4-7-8**.

Combina animaciones CSS fluidas con un sistema de partículas basado en física en HTML5 Canvas para crear una experiencia visual hipnótica y relajante.

*(Aquí podrás poner una captura de pantalla de tu web)*

## ✨ Características Principales

  * **Técnica 4-7-8:** Guía visual precisa para el ciclo de respiración:
      * 👃 **Inspirar (4s):** Expansión visual.
      * ⏸️ **Mantener (7s):** Anillo de progreso circular.
      * 😮‍💨 **Expulsar (8s):** Contracción y relajación.
  * **Sistema de Partículas Orgánico:**
      * Más de 200 partículas renderizadas en `canvas`.
      * **Física interactiva:** Las partículas son "aspiradas" al inspirar y "expulsadas" suavemente al exhalar.
      * Incluye inercia, fricción y turbulencia para simular el movimiento natural del aire.
  * **Diseño Visual:**
      * Tipografía **Quicksand** para máxima legibilidad y suavidad.
      * Transiciones de texto con efecto *cross-fade*.
      * Menú de ajustes estilo **Glassmorphism** (vidrio esmerilado).
  * **Temas Personalizables:**
      * ☀️ **Modo Claro:** Paleta "Sage & Sand" (Verde Salvia y Arena).
      * 🌙 **Modo Oscuro:** Paleta "Deep Forest" (Verde Bosque Profundo) con ajuste automático de color de partículas.
      * Persistencia de datos: La web recuerda tu preferencia de tema.

## 🛠️ Tecnologías Utilizadas

El proyecto no utiliza librerías externas ni frameworks pesados, garantizando un rendimiento óptimo.

  * **HTML5:** Estructura semántica y elemento `<canvas>`.
  * **CSS3:**
      * Variables CSS (`:root`) para gestión de temas.
      * Animaciones complejas con `@keyframes`.
      * Flexbox para el layout.
  * **JavaScript (Vanilla ES6+):**
      * Lógica de sincronización precisa (Eventos `animationiteration`).
      * Motor de física para partículas.
      * Manipulación del DOM y `localStorage`.

## 🚀 Instalación y Uso

Este proyecto es una web estática, por lo que no requiere instalación de dependencias (npm, node, etc.).

1.  **Clona el repositorio** o descarga los archivos:
    ```bash
    git clone https://github.com/tu-usuario/zen478.git
    ```
2.  **Abre el proyecto:**
    Simplemente haz doble clic en el archivo `index.html` para abrirlo en tu navegador favorito.

## 📂 Estructura del Proyecto

```text
/
├── index.html      # Estructura principal, Canvas y SVG
├── style.css       # Estilos, Animaciones y Modo Oscuro
├── script.js       # Lógica de respiración y Motor de partículas
└── README.md       # Documentación
```

## 🎨 Personalización

Si quieres ajustar los tiempos o colores, puedes hacerlo fácilmente:

  * **Colores:** Edita las variables en `:root` dentro de `style.css`.
  * **Tiempos:** Busca las constantes al final de `script.js`:
    ```javascript
    const breatheTime = 4000; // Tiempo de inspiración
    const holdTime = 7000;    // Tiempo de retención
    const exhaleTime = 8000;  // Tiempo de exhalación
    ```
  * **Partículas:** Ajusta la física al inicio de `script.js`:
    ```javascript
    const PARTICLE_COUNT = 200; // Cantidad
    const FRICTION = 0.95;      // Fricción del "aire"
    ```

