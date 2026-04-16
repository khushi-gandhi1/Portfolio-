/* ============================================================
   KHUSHI GANDHI PORTFOLIO — script.js
   ============================================================ */

// =================== CUSTOM CURSOR ===================
const cursorDot     = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.12;
  outlineY += (mouseY - outlineY) * 0.12;
  cursorOutline.style.left = outlineX + 'px';
  cursorOutline.style.top  = outlineY + 'px';
  requestAnimationFrame(animateOutline);
}
animateOutline();

// Scale on hover interactive elements
document.querySelectorAll('a, button, .bubble, .skill-item, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.transform     = 'translate(-50%,-50%) scale(2)';
    cursorOutline.style.width     = '55px';
    cursorOutline.style.height    = '55px';
    cursorOutline.style.borderColor = 'rgba(0,212,255,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.transform   = 'translate(-50%,-50%) scale(1)';
    cursorOutline.style.width   = '36px';
    cursorOutline.style.height  = '36px';
    cursorOutline.style.borderColor = 'rgba(0,212,255,0.5)';
  });
});


// =================== PARTICLE CANVAS ===================
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 80;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.size  = Math.random() * 1.8 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color  = Math.random() > 0.6
      ? `rgba(0,212,255,${this.opacity})`
      : Math.random() > 0.5
        ? `rgba(0,255,204,${this.opacity})`
        : `rgba(255,77,166,${this.opacity * 0.5})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}
initParticles();

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth   = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();


// =================== NAVBAR ===================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNavLink();
});

// Active nav link on scroll
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.querySelectorAll('span').forEach((s, i) => {
    if (navLinks.classList.contains('open')) {
      if (i === 0) s.style.transform = 'rotate(45deg) translate(5px,5px)';
      if (i === 1) s.style.opacity   = '0';
      if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      s.style.transform = '';
      s.style.opacity   = '';
    }
  });
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});


// =================== TYPED ROLE EFFECT ===================
const roles = [
  'Tech Enthusiast 🚀',
  'Python Developer 🐍',
  'CS Student 👩‍💻',
  'Data Explorer 📊',
  'Problem Solver 🧩',
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 400); return; }
    setTimeout(typeRole, 40);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(typeRole, 1800); return; }
    setTimeout(typeRole, 65);
  }
}
typeRole();


// =================== COUNTER ANIMATION ===================
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current  = 0;
    const step   = Math.ceil(target / 30);
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
      else el.textContent = current;
    }, 40);
  });
}
let countersStarted = false;


// =================== SCROLL REVEAL ===================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Start skill bars
      if (entry.target.classList.contains('skill-category')) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Hero section observer for counters
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    setTimeout(animateCounters, 600);
  }
}, { threshold: 0.4 });
const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);


// =================== CONTACT FORM ===================
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML  = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #00ffcc, #00cc99)';
      formNote.textContent = "✨ Thanks for reaching out! I'll get back to you soon.";
      form.reset();
      setTimeout(() => {
        btn.innerHTML  = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled   = false;
        formNote.textContent = '';
      }, 4000);
    }, 1500);
  });
}


// =================== SMOOTH SCROLL ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// =================== TILT EFFECT ON PROJECT CARDS ===================
document.querySelectorAll('.project-card, .about-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotX   = ((y - cy) / cy) * 5;
    const rotY   = ((x - cx) / cx) * -5;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// =================== FLOATING CLOUDS (extra) ===================
function addFloatingClouds() {
  const clouds = ['☁️', '⛅', '🌥️'];
  const container = document.body;
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('div');
    el.textContent = clouds[i % clouds.length];
    el.style.cssText = `
      position: fixed;
      font-size: ${1.2 + Math.random() * 1.5}rem;
      opacity: 0.08;
      pointer-events: none;
      z-index: 0;
      top: ${20 + Math.random() * 60}%;
      left: ${Math.random() > 0.5 ? '-5%' : '102%'};
      animation: cloudDrift ${18 + i * 6}s linear ${i * 4}s infinite;
      filter: drop-shadow(0 0 8px rgba(0,212,255,0.3));
    `;
    container.appendChild(el);
  }
}

// Inject cloud drift keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes cloudDrift {
    from { transform: translateX(0) translateY(0); }
    25%  { transform: translateX(15vw) translateY(-20px); }
    50%  { transform: translateX(40vw) translateY(10px); }
    75%  { transform: translateX(70vw) translateY(-15px); }
    to   { transform: translateX(110vw) translateY(5px); }
  }
`;
document.head.appendChild(style);
addFloatingClouds();


// =================== SECTION LINE ANIMATION ===================
// Animate the top border of section cards on first view
const borderObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--border-scale', '1');
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.about-card').forEach(card => borderObserver.observe(card));


// =================== PAGE LOAD ===================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%c☁️ Khushi Gandhi Portfolio', 'color:#00d4ff; font-size:18px; font-weight:bold; font-family:monospace;');
console.log('%cB.Tech CSE | Manav Rachna University 🚀', 'color:#00ffcc; font-size:12px; font-family:monospace;');
