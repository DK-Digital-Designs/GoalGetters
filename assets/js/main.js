// ============================
// Simple HTML Include Helper
// ============================
async function includeHTML(selector, url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to load ${url}`);
    const html = await resp.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

// ============================
// JSON Data Loader
// ============================
async function loadJSON(path) {
  const resp = await fetch(path);
  if (!resp.ok) throw new Error(`Failed to fetch ${path}`);
  return resp.json();
}

// ============================
// Section Renderers
// ============================
async function loadEvents() {
  const data = await loadJSON('assets/data/events.json');
  const c = document.getElementById('events-container');
  data.forEach((ev,i) => {
    c.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <img src="${ev.img}" alt="${ev.title}">
        <h3>${ev.title}</h3>
        <p>${ev.date}</p>
        <a href="${ev.link}" class="btn small">Learn More</a>
      </div>`;
  });
}

async function loadShop() {
  const data = await loadJSON('assets/data/shop.json');
  const c = document.getElementById('shop-container');
  data.forEach((it,i) => {
    c.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <img src="${it.img}" alt="${it.title}">
        <h3>${it.title}</h3>
        <p><strong>${it.price}</strong></p>
        <a href="${it.link}" class="btn small">Inquire</a>
      </div>`;
  });
}

async function loadServices() {
  const data = await loadJSON('assets/data/services.json');
  const c = document.getElementById('services-container');
  data.forEach((svc,i) => {
    c.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <img src="${svc.img}" alt="${svc.title}">
        <h3>${svc.title}</h3>
        <p>${svc.description}</p>
      </div>`;
  });
}

async function loadPricing() {
  const data = await loadJSON('assets/data/pricing.json');
  const c = document.getElementById('pricing-container');
  data.forEach((pl,i) => {
    const feats = pl.features.map(f => `<li>${f}</li>`).join('');
    c.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <h3>${pl.plan}</h3>
        <h4>${pl.title}</h4>
        <ul>${feats}</ul>
        <a href="${pl.link}" class="btn small">Book Now</a>
      </div>`;
  });
}

async function loadTeam() {
  const data = await loadJSON('assets/data/team.json');
  const c = document.getElementById('team-container');
  data.forEach((m,i) => {
    c.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <img src="${m.img}" alt="${m.name}">
        <h4>${m.name}</h4>
        <h5>${m.role}</h5>
        <p>${m.bio}</p>
      </div>`;
  });
}

async function loadTestimonials() {
  const data = await loadJSON('assets/data/testimonials.json');
  const c = document.getElementById('testimonials-container');
  data.forEach((t,i) => {
    c.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <p>${t.text}</p>
        <h4>${t.name}</h4>
      </div>`;
  });
}

// ============================
// Culture Carousel
// ============================
function initCultureCarousel() {
  const wrapper = document.querySelector('#culture .carousel-container');
  if (!wrapper) return;

  const slidesEl = wrapper.querySelector('.slides');
  const slides   = Array.from(slidesEl.children);
  const btnPrev  = wrapper.querySelector('.prev');
  const btnNext  = wrapper.querySelector('.next');
  let index = 0;

  function update() {
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
  }

  btnNext.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });
  btnPrev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
}

// ============================
// Floating Action Button (FAB)
// ============================
function initFAB() {
  const fab = document.querySelector('.fab-container');
  if (!fab) return;

  const mainBtn   = fab.querySelector('.fab-main');
  const scrollBtn = fab.querySelector('#scrollTopBtn');

  // Toggle the action list
  mainBtn.addEventListener('click', () => fab.classList.toggle('open'));

  // Scroll to top
  scrollBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // Close if clicked outside
  document.addEventListener('click', e => {
    if (!fab.contains(e.target)) fab.classList.remove('open');
  });
}

// ============================
// Navigation & Scroll Header
// ============================
function initNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');
  const links     = document.querySelectorAll('.nav-link');

  // Mobile toggle
  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('open');
  });

  // Active link highlighting
  links.forEach(link => {
    if (link.href === location.href || location.pathname.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ============================
// App EntryPoint
// ============================
document.addEventListener('DOMContentLoaded', async () => {
  // 1) Load shared header & footer
  await includeHTML('#header-placeholder', 'assets/includes/header.html');
  await includeHTML('#footer-placeholder', 'assets/includes/footer.html');

  // 2) Kick off UI components
  initNav();
  AOS.init({ duration: 800, once: true });
  initFAB();
  initCultureCarousel();

  // 3) Load dynamic sections
  if (document.getElementById('events-container'))       await loadEvents();
  if (document.getElementById('shop-container'))         await loadShop();
  if (document.getElementById('services-container'))     await loadServices();
  if (document.getElementById('pricing-container'))      await loadPricing();
  if (document.getElementById('team-container'))         await loadTeam();
  if (document.getElementById('testimonials-container')) await loadTestimonials();
});
