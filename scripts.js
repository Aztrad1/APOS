document.addEventListener('DOMContentLoaded', () => {
    // 1. Animación de Entrada "Sparkle Pop"
    const revealItems = document.querySelectorAll('.reveal-item');
    revealItems.forEach((item) => {
        // Usa Intersection Observer para detectar cuando el elemento entra en vista
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(item.getAttribute('data-delay')) * 100; // Retraso secuencial
                    setTimeout(() => {
                        item.classList.add('active');
                    }, delay);
                    observer.unobserve(item); // Deja de observar una vez que se activa
                }
            });
        }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible
        observer.observe(item);
    });

    // 2. Generación de Estrellas Flotantes de Fondo
    const starsContainer = document.querySelector('.background-stars');
    for (let i = 0; i < 50; i++) { // 50 estrellas
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = star.style.height = `${Math.random() * 3 + 1}px`; // Tamaño aleatorio
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`; // Retraso de animación aleatorio
        starsContainer.appendChild(star);
    }

    // 3. Glitch en el Título al cargar (simple)
    const title = document.querySelector('.uma-title');
    title.style.opacity = 0;
    setTimeout(() => {
        title.style.opacity = 1;
        title.innerHTML = title.getAttribute('data-text').split('').map((char, i) => {
            return `<span style="animation-delay: ${0.05 * i}s;">${char}</span>`;
        }).join('');
        title.querySelectorAll('span').forEach(span => {
            span.style.display = 'inline-block';
            span.style.animation = 'glitchText 0.3s ease-out forwards';
        });
    }, 100); // Pequeño retraso para ver el glitch

    // CSS para el glitch del título
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .uma-title span {
            opacity: 0;
            transform: scale(0.5);
        }
        @keyframes glitchText {
            0% { transform: scale(0.5) translateY(-5px); opacity: 0; }
            50% { transform: scale(1.1) translateY(5px); opacity: 0.7; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(styleSheet);


    // 4. Partículas de Brillo al hacer Click
    document.addEventListener('mousedown', (e) => {
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'click-sparkle';
            document.body.appendChild(sparkle);

            const size = Math.random() * 10 + 5;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;

            const moveX = (Math.random() - 0.5) * 300;
            const moveY = (Math.random() - 0.5) * 300;
            const rotate = Math.random() * 360;

            const anim = sparkle.animate([
                { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                { transform: `translate(${moveX}px, ${moveY}px) scale(0) rotate(${rotate}deg)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'ease-out'
            });

            anim.onfinish = () => sparkle.remove();
        }
    });
});