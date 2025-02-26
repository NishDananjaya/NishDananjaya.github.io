class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 157, 0.8)`;
        ctx.fill();
    }
}

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let numberOfParticles = Math.min(window.innerWidth / 10, 50);
    let mouse = { x: null, y: null };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle(canvas));
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse move effect
    canvas.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    canvas.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-over';

        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        let maxConnections = 5;
        particles.forEach((particle1, index) => {
            let connections = 0;
            for (let j = index + 1; j < particles.length && connections < maxConnections; j++) {
                const particle2 = particles[j];
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    connections++;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 157, ${Math.exp(-distance / 50) * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                }
            }
        });

        // Mouse Interaction: Attract nearby particles
        if (mouse.x !== null && mouse.y !== null) {
            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.exp(-distance / 50)})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(particle.x, particle.y);
                    ctx.stroke();
                }
            });
        }

        requestAnimationFrame(animate);
    }

    animate();
}