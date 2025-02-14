document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    
    let isScratching = false;
    const brushSize = 25;

    // Flip de la carta
    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            initScratch();
        }
    });

    function initScratch() {
        // Configurar canvas
        canvas.width = card.offsetWidth;
        canvas.height = card.offsetHeight;
        
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-out';

        // Eventos de rascado
        canvas.addEventListener('mousedown', startScratch);
        canvas.addEventListener('mousemove', scratch);
        canvas.addEventListener('mouseup', endScratch);
        canvas.addEventListener('mouseleave', endScratch);
    }

    function startScratch(e) {
        isScratching = true;
        scratch(e);
    }

    function scratch(e) {
        if (!isScratching) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, Math.PI * 2);
        ctx.fill();
        
        checkProgress();
    }

    function endScratch() {
        isScratching = false;
    }

    function checkProgress() {
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let transparent = 0;
        
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparent++;
        }
        
        const percentage = (transparent / (pixels.length / 4)) * 100;
        if (percentage > 96) {
            canvas.style.opacity = '0';
            setTimeout(() => {
                canvas.style.display = 'none';
            }, 500);
        }
    }
});

function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const hearts = ['❤️', '💖', '💘', '💝', '💗', '💓'];
    
    function generateHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const size = Math.random() * 30 + 15;
        const left = Math.random() * 100;
        
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${left}%`;
        
        heartsContainer.appendChild(heart);
        
        // Eliminar el corazón después de la animación
        setTimeout(() => heart.remove(), 8000);
    }
    
    // Generar corazones cada 500ms
    setInterval(generateHeart, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    createHearts();
});