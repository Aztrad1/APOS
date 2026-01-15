document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.character-grid img');
    const header = document.querySelector('header h1');

    // 1. Efecto de sonido visual al hacer clic
    images.forEach(img => {
        img.addEventListener('click', () => {
            // Efecto de "rebote"
            img.style.transform = "scale(0.8) translateY(20px)";
            
            setTimeout(() => {
                img.style.transform = "scale(1.1) translateY(-30px)";
            }, 100);

            // Crear líneas de velocidad al hacer clic
            createSpeedLines();
        });
    });

    // 2. Función para crear líneas de carrera aleatorias
    function createSpeedLines() {
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.className = 'speed-line';
            
            // Posición aleatoria
            line.style.top = Math.random() * window.innerHeight + 'px';
            line.style.left = '0px';
            
            // Retraso aleatorio
            line.style.animationDelay = Math.random() * 0.3 + 's';
            
            document.body.appendChild(line);

            // Eliminar después de la animación
            setTimeout(() => {
                line.remove();
            }, 1000);
        }
    }

    // 3. Animación suave del título al mover el mouse
    header.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        header.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    header.addEventListener('mouseleave', () => {
        header.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
});