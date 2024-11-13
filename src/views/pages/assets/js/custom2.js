
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed'; 
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '999'; 
canvas.style.pointerEvents = 'none'; 
document.body.appendChild(canvas);

const particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.color = 'white';
    this.velocityX = Math.random() * 2 - 1;
    this.velocityY = Math.random() * 2 - 1;
  }

  draw() {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velocityX = -this.velocityX;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.velocityY = -this.velocityY;
    }
    this.draw();
  }
}

function init() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  requestAnimationFrame(animate);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
  });
}

init();
animate();