class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1; // Varying size for depth effect
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.8 + 0.2;
    }

    update(mouse) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Repel from mouse if close
        if (distance < 100) {
            this.x -= dx * 0.02;
            this.y -= dy * 0.02;
        }

        // Add slight oscillation for smooth movement
        this.x += this.speedX + Math.sin(Date.now() * 0.001) * 0.3;
        this.y += this.speedY + Math.cos(Date.now() * 0.001) * 0.3;

        // Screen wrap-around
        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(0, 255, 157, ${this.opacity})`;
        ctx.shadowColor = "rgba(0, 255, 157, 0.8)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numberOfParticles = 60; // Increase particle count
    let mouse = { x: null, y: null };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse movement tracking
    canvas.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas));
    }

    let gradientColor = 0;

    function animate() {
        gradientColor += 0.5; // Change gradient over time

        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `hsl(${gradientColor % 360}, 50%, 15%)`);
        gradient.addColorStop(1, `hsl(${(gradientColor + 100) % 360}, 50%, 5%)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update(mouse);
            particle.draw(ctx);
        });

        // Improved Connector Lines
        particles.forEach((particle1, index) => {
            for (let j = index + 1; j < particles.length; j++) {
                const particle2 = particles[j];
                const distance = Math.hypot(particle1.x - particle2.x, particle1.y - particle2.y);
                
                if (distance < 120) {
                    const opacity = Math.exp(-distance / 50) * 0.7;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 157, ${opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

document.addEventListener('DOMContentLoaded', initParticles);