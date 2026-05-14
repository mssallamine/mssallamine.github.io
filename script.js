/* =============================================
   i18n — LANGUAGE DETECTION & SWITCHING
   ============================================= */

const SUPPORTED_LANGS = ['en', 'fr', 'ar'];
const RTL_LANGS       = ['ar'];
let   arabicFontLoaded = false;

function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(browser) ? browser : 'en';
}

function loadArabicFont() {
  if (arabicFontLoaded) return;
  const link  = document.createElement('link');
  link.rel    = 'stylesheet';
  link.href   = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600&display=swap';
  document.head.appendChild(link);
  arabicFontLoaded = true;
}

function applyLang(lang) {
  localStorage.setItem('lang', lang);
  const html = document.documentElement;
  html.lang  = lang;
  html.dir   = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
  if (lang === 'ar') loadArabicFont();

  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  if (t.page_title) document.title = t.page_title;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

applyLang(detectLang());

document.getElementById('lang-switcher').addEventListener('click', e => {
  const btn = e.target.closest('.lang-btn');
  if (btn) applyLang(btn.dataset.lang);
});

/* =============================================
   NAVIGATION — sticky shadow & active state
   ============================================= */

const header   = document.getElementById('site-header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Shadow when scrolled
  header.classList.toggle('scrolled', window.scrollY > 10);

  // Highlight the active nav link based on scroll position
  const scrollMid = window.scrollY + window.innerHeight / 3;

  let currentId = '';
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollMid) {
      currentId = sec.id;
    }
  });

  navLinks.forEach(link => {
    const target = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', target === currentId);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* =============================================
   MOBILE MENU TOGGLE
   ============================================= */

const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);

  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu when a link is clicked
navMenu.addEventListener('click', e => {
  if (e.target.classList.contains('nav-link')) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* =============================================
   SMOOTH SCROLL for anchor links
   ============================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerH = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =============================================
   SCROLL-IN ANIMATIONS (Intersection Observer)
   ============================================= */

const animateEls = document.querySelectorAll(
  '.research-card, .service-card, .project-card, .cv-card, .info-card'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animateEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}

// Add the .visible class to trigger animation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);
