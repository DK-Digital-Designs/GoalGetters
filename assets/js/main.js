// ============================
// Helpers
// ============================
function byId(id) { return document.getElementById(id); }
function showError(container, msg) {
  if (!container) return;
  container.innerHTML = `<div style="color:#bbb;text-align:center;padding:1rem">${msg}</div>`;
}

// ============================
// Simple HTML Include Helper
// ============================
async function includeHTML(selector, url) {
  try {
    const resp = await fetch(url, { cache: 'no-store' });
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
  const resp = await fetch(path, { cache: 'no-store' });
  if (!resp.ok) throw new Error(`Failed to fetch ${path}`);
  return resp.json();
}

// ============================
// Section Renderers
// ============================
async function loadEvents() {
  const data = await loadJSON('assets/data/events.json');
  const c = byId('events-container');
  data.forEach((ev, i) => {
    c.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <img src="${ev.img}" alt="${ev.title}">
        <h3>${ev.title}</h3>
        <p>${ev.date}</p>
        <a href="${ev.link}" class="btn small">Learn More</a>
      </div>`;
  });
}

async function loadShop() {
  const data = await loadJSON('assets/data/shop.json');
  const c = byId('shop-container');
  data.forEach((it, i) => {
    c.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <img src="${it.img}" alt="${it.title}">
        <h3>${it.title}</h3>
        <p><strong>${it.price}</strong></p>
        <a href="${it.link}" class="btn small">Inquire</a>
      </div>`;
  });
}

async function loadServices() {
  const c = byId('services-container');
  if (!c) return;
  try {
    const data = await loadJSON('assets/data/services.json');
    if (!Array.isArray(data) || !data.length) {
      showError(c, 'No services available yet.');
      return;
    }
    c.innerHTML = data.map((svc, i) => `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <img src="${svc.img}" alt="${svc.title}">
        <h3>${svc.title}</h3>
        <p>${svc.description}</p>
      </div>
    `).join('');
  } catch (e) {
    console.error('[loadServices] failed:', e);
    showError(c, 'Could not load services.');
  }
}

async function loadPricing() {
  const c = byId('pricing-container');
  if (!c) return;
  try {
    const data = await loadJSON('assets/data/pricing.json');
    if (!Array.isArray(data) || !data.length) {
      showError(c, 'No pricing available yet.');
      return;
    }
    c.innerHTML = data.map((pl, i) => `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <h3>${pl.plan}</h3>
        <h4>${pl.title}</h4>
        <ul>${(pl.features||[]).map(f=>`<li>${f}</li>`).join('')}</ul>
        ${pl.link ? `<a href="${pl.link}" class="btn small">Book Now</a>` : ''}
      </div>
    `).join('');
  } catch (e) {
    console.error('[loadPricing] failed:', e);
    showError(c, 'Could not load pricing.');
  }
}

async function loadTeamAbout() {
  const grid = document.querySelector('#team-container');
  if (!grid) return;

  try {
    const data = await loadJSON('assets/data/team.json');
    if (!Array.isArray(data) || !data.length) return showError(grid, 'No team members yet.');

    // Build OUR clickable cards (overwrite whatever main.js rendered)
    grid.classList.add('team-grid');
    grid.innerHTML = data.map((m,i) => `
      <article class="team-card"
               data-index="${i}"
               role="button"
               tabindex="0"
               title="View ${m.name}'s profile">
        <span class="badge">Profile</span>
        <img src="${m.img}" alt="${m.name}">
        <div class="tc-cta"><div class="bubble">View profile</div></div>
        <div class="tc-body">
          <div class="tc-name">${m.name}</div>
          <div class="tc-role">${m.role ?? ''}</div>
          ${m.bio ? `<p class="tc-bio">${m.bio}</p>` : ''}
        </div>
      </article>
    `).join('');

    // Click / keyboard open
    const open = (idx) => openModal(renderModal(data[idx]));
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.team-card');
      if (!card) return;
      open(Number(card.dataset.index));
    });
    grid.addEventListener('keydown', (e) => {
      const card = e.target.closest('.team-card');
      if (!card) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(Number(card.dataset.index));
      }
    });

    // Optional deep link (?member=slug)
    const slug = new URLSearchParams(location.search).get('member');
    if (slug) {
      const idx = data.findIndex(m => (m.slug || '') === slug);
      if (idx > -1) open(idx);
    }
  } catch (e) {
    console.error('[about] loadTeam failed:', e);
    showError(grid, 'Could not load team.');
  }
}
document.addEventListener('DOMContentLoaded', loadTeamAbout);


async function loadTestimonials() {
  const c = byId('testimonials-container');
  if (!c) return;
  try {
    const data = await loadJSON('assets/data/testimonials.json'); // loadJSON already used by others
    if (!Array.isArray(data) || !data.length) {
      showError(c, 'No testimonials yet.');
      return;
    }
    c.innerHTML = data.map((t, i) => `
      <div class="card" data-aos="fade-up" data-aos-delay="${i*100}">
        <p>${t.text}</p>
        <h4>${t.name}</h4>
      </div>
    `).join('');
  } catch (e) {
    console.error('[loadTestimonials] failed:', e);
    showError(c, 'Could not load testimonials.');
  }
}





// ============================
// Optional UI bits
// ============================
function initCultureCarousel() {
  const wrapper = document.querySelector('#culture .carousel-container');
  if (!wrapper) return;
  const slidesEl = wrapper.querySelector('.slides');
  const slides = Array.from(slidesEl.children);
  const btnPrev = wrapper.querySelector('.prev');
  const btnNext = wrapper.querySelector('.next');
  let index = 0;
  function update() { slidesEl.style.transform = `translateX(-${index * 100}%)`; }
  btnNext.addEventListener('click', () => { index = (index + 1) % slides.length; update(); });
  btnPrev.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; update(); });
}

function initFAB() {
  const fab = document.querySelector('.fab-container');
  if (!fab) return;
  const mainBtn = fab.querySelector('.fab-main');
  const scrollBtn = fab.querySelector('#scrollTopBtn');
  mainBtn.addEventListener('click', () => fab.classList.toggle('open'));
  scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.addEventListener('click', e => { if (!fab.contains(e.target)) fab.classList.remove('open'); });
}

function initNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const links = document.querySelectorAll('.nav-link');
  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('open');
  });
  links.forEach(link => {
    if (link.href === location.href || location.pathname.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ============================
// App EntryPoint
// ============================
document.addEventListener('DOMContentLoaded', async () => {
  // includes
  await includeHTML('#header-placeholder', 'assets/includes/header.html');
  await includeHTML('#footer-placeholder', 'assets/includes/footer.html');

  // UI
  initNav();
  if (window.AOS) AOS.init({ duration: 800, once: true });
  initFAB();
  initCultureCarousel();

  // data sections present on this page
  if (byId('events-container'))   await loadEvents();
  if (byId('shop-container'))     await loadShop();
  if (byId('services-container')) await loadServices();
  if (byId('pricing-container'))  await loadPricing();
  if (byId('team-container'))     await loadTeamAbout();
  if (byId('testimonials-container')) await loadTestimonials();

});
