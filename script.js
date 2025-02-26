const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const backgroundParticleCount = 50;
const cursorParticleCount = 1;

class Particle {
    constructor(x, y, isCursorParticle = false) {
        this.x = x !== undefined ? x : Math.random() * canvas.width;
        this.y = y !== undefined ? y : Math.random() * canvas.height;
        this.radius = Math.random() * 5 + 2;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.isCursorParticle = isCursorParticle;
        this.life = isCursorParticle ? 100 : Infinity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        if (this.isCursorParticle) {
            this.opacity -= 0.01;
            this.life--;
        }

        this.draw();
    }
}

for (let i = 0; i < backgroundParticleCount; i++) {
    particles.push(new Particle());
}

window.addEventListener("mousemove", (event) => {
    for (let i = 0; i < cursorParticleCount; i++) {
        particles.push(new Particle(event.clientX, event.clientY, true));
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].isCursorParticle && particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* Skill Section Scroll Animation */
const skillsSection = document.querySelector(".skills-container");
const progressBars = document.querySelectorAll(".progress");

function checkScroll() {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
        skillsSection.classList.add("visible");

        progressBars.forEach(bar => {
            bar.style.width = bar.dataset.percent + "%"; 
            bar.classList.add("animate"); 
        });
    }
}

window.addEventListener("scroll", checkScroll);

/* Project Section Animation */
const projectSection = document.querySelector(".projects-container");
const projectCards = document.querySelectorAll(".project");

function checkProjectScroll() {
    const sectionTop = projectSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
        projectSection.classList.add("visible");

        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("fade-in");
            }, index * 200);
        });
    }
}

window.addEventListener("scroll", checkProjectScroll);
