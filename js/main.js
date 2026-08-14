/* ============================================================
   Semua data diambil dari file js/data.js — edit di sana
   ============================================================ */

const {
  name, logo, tagline, description,
  about, stats, portfolio, articles, cvFile, contact, socials,
} = SITE_CONFIG;

/* ---------- Preloader ---------- */
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
  setTimeout(() => preloader.classList.add('hidden'), 400);
});

/* ---------- Dark Mode ---------- */
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

/* ---------- Isi Data dari data.js ---------- */
document.getElementById('logo').textContent = logo;
document.getElementById('heroName').textContent = name;
document.getElementById('heroDesc').textContent = description;

document.title = `Portofolio Blog ${name}`;
document.querySelector('meta[name="author"]').setAttribute('content', name);
document.querySelector('meta[property="og:title"]').setAttribute('content', `Portofolio Blog ${name}`);

/* CV button */
const cvHref = cvFile ? cvFile : '#';
document.getElementById('cvButton').setAttribute('href', cvHref);
document.getElementById('cvButton2').setAttribute('href', cvHref);

/* About */
const photoFrame = document.getElementById('aboutPhoto');
if (about.image) {
  photoFrame.innerHTML = `<img src="${about.image}" alt="${name}">`;
} else {
  photoFrame.textContent = about.emoji;
}
document.getElementById('aboutText').textContent = about.text;

const skillsList = document.getElementById('skillsList');
about.skills.forEach((skill) => {
  const span = document.createElement('span');
  span.className = 'skill';
  span.textContent = skill;
  skillsList.appendChild(span);
});

document.getElementById('aboutEmail').textContent = contact.email;
document.getElementById('aboutEmail').setAttribute('href', `mailto:${contact.email}`);
document.getElementById('aboutPhone').textContent = contact.phone;

/* Stats */
const statsGrid = document.getElementById('statsGrid');
stats.forEach((stat) => {
  const item = document.createElement('div');
  item.className = 'stat-item';
  item.innerHTML = `
    <div class="stat-number" data-value="${stat.value}" data-suffix="${stat.suffix}">0${stat.suffix}</div>
    <div class="stat-label">${stat.label}</div>
  `;
  statsGrid.appendChild(item);
});

/* Portfolio */
const portfolioGrid = document.getElementById('portfolioGrid');
portfolio.forEach((item) => {
  const card = document.createElement('div');
  card.className = 'portfolio-card reveal';
  card.innerHTML = `
    <div class="portfolio-thumb">${item.emoji}</div>
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <span class="portfolio-tech">${item.tech}</span>
    ${item.link ? '<button class="blog-readmore">Lihat Karya →</button>' : ''}
  `;
  if (item.link) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => window.open(item.link, '_blank'));
  }
  portfolioGrid.appendChild(card);
});

/* Social links */
const socialLinks = document.getElementById('socialLinks');
socials.forEach((social) => {
  const a = document.createElement('a');
  a.href = social.url;
  a.setAttribute('aria-label', social.name);
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = social.name;
  socialLinks.appendChild(a);
});

/* Footer */
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelector('.footer p').innerHTML =
  `© ${new Date().getFullYear()} ${name}. Dibuat dengan ♥ di Indonesia.`;

/* ---------- Navbar ---------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

const sections = document.querySelectorAll('main section');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  let current = 'hero';
  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ---------- Typing effect ---------- */
const typedText = document.getElementById('typedText');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = tagline[roleIndex];
  if (deleting) {
    typedText.innerHTML = current.substring(0, charIndex - 1) + '<span class="cursor"></span>';
    charIndex--;
  } else {
    typedText.innerHTML = current.substring(0, charIndex + 1) + '<span class="cursor"></span>';
    charIndex++;
  }

  let speed = deleting ? 50 : 120;

  if (!deleting && charIndex === current.length) {
    speed = 1800;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % tagline.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ---------- Stat counter ---------- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.value, 10);
    const suffix = counter.dataset.suffix;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
statsObserver.observe(statsSection);

/* ---------- Blog: filter + search ---------- */
const blogList = document.getElementById('blogList');
const blogEmpty = document.getElementById('blogEmpty');
const searchInput = document.getElementById('searchInput');
const blogFilters = document.getElementById('blogFilters');

const categories = ['Semua', ...new Set(articles.map((a) => a.category))];
categories.forEach((category) => {
  const btn = document.createElement('button');
  btn.className = 'filter-btn' + (category === 'Semua' ? ' active' : '');
  btn.textContent = category;
  btn.dataset.filter = category;
  btn.addEventListener('click', () => {
    blogFilters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderBlog();
  });
  blogFilters.appendChild(btn);
});

function renderBlog() {
  const activeFilter = blogFilters.querySelector('.filter-btn.active').dataset.filter;
  const keyword = searchInput.value;

  const filtered = articles.filter((article) => {
    const matchCategory = activeFilter === 'Semua' || article.category === activeFilter;
    const text = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase();
    const matchSearch = text.includes(keyword.toLowerCase());
    return matchCategory && matchSearch;
  });

  blogList.innerHTML = '';
  blogEmpty.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach((article, index) => {
    const card = document.createElement('article');
    card.className = 'blog-card reveal';
    card.style.transitionDelay = `${index * 0.05}s`;
    card.innerHTML = `
      <div class="blog-card-head">
        <span class="blog-date">${article.date}</span>
        <h3>${article.title}</h3>
      </div>
      <div class="blog-card-body">
        <p>${article.excerpt}</p>
        <span class="blog-category">${article.category}</span>
        <button class="blog-readmore">Baca Selengkapnya →</button>
      </div>
    `;
    card.addEventListener('click', () => openModal(article));
    blogList.appendChild(card);
  });

  observeReveals();
}

searchInput.addEventListener('input', renderBlog);

/* ---------- Modal artikel ---------- */
const articleModal = document.getElementById('articleModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(article) {
  const paragraphs = article.content.map((p) => `<p>${p}</p>`).join('');
  modalBody.innerHTML = `
    <span class="modal-category">${article.category}</span>
    <h3>${article.title}</h3>
    <p class="modal-date">${article.date}</p>
    ${paragraphs}
  `;
  articleModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  articleModal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
articleModal.addEventListener('click', (event) => {
  if (event.target === articleModal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

/* ---------- Form kontak + toast ---------- */
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name').value;
  const emailInput = document.getElementById('email').value;
  const messageInput = document.getElementById('message').value;

  if (nameInput && emailInput && messageInput) {
    showToast(`Terima kasih, ${nameInput}! Pesan Anda sudah terkirim. 🎉`);
    contactForm.reset();
  } else {
    showToast('Mohon isi semua kolom terlebih dahulu.', 'error');
  }
});

/* ---------- Back to top ---------- */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Reveal animation ---------- */
function observeReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach((el) => observer.observe(el));
}

observeReveals();
