const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");
const progress = document.getElementById("progress");
const typing = document.getElementById("typing");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / scrollable) * 100}%`;
});

const phrases = [
  "Aspiring Data Science Engineer",
  "Machine Learning Learner",
  "Data Analysis Enthusiast"
];
let phrase = 0;
let letter = 0;
let deleting = false;

function typeText() {
  const current = phrases[phrase];
  typing.textContent = current.slice(0, letter);

  if (!deleting && letter < current.length) {
    letter++;
    setTimeout(typeText, 70);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeText, 1200);
  } else if (letter > 0) {
    letter--;
    setTimeout(typeText, 35);
  } else {
    deleting = false;
    phrase = (phrase + 1) % phrases.length;
    setTimeout(typeText, 250);
  }
}
typeText();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project").forEach((project) => {
      project.classList.toggle("hidden", filter !== "all" && project.dataset.category !== filter);
    });
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
  const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
  formStatus.textContent = "Opening your email app...";
  window.location.href = `mailto:ananyapramod66@gmail.com?subject=${subject}&body=${body}`;
  contactForm.reset();
});

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function makeParticles() {
  particles = Array.from({ length: Math.min(70, Math.floor(window.innerWidth / 18)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 2 + 1
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "rgba(53,214,183,.75)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 120) {
        ctx.strokeStyle = `rgba(122,167,255,${1 - d / 120})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  makeParticles();
});

resizeCanvas();
makeParticles();
draw();

