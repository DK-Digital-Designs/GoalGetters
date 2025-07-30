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
  const container = document.getElementById('events-container');
  data.forEach((ev, i) => {
    container.innerHTML += `
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
  const container = document.getElementById('shop-container');
  data.forEach((item, i) => {
    container.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <img src="${item.img}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p><strong>${item.price}</strong></p>
        <a href="${item.link}" class="btn small">Inquire</a>
      </div>`;
  });
}

async function loadServices() {
  const data = await loadJSON('assets/data/services.json');
  const container = document.getElementById('services-container');
  data.forEach((svc, i) => {
    container.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <img src="${svc.img}" alt="${svc.title}">
        <h3>${svc.title}</h3>
        <p>${svc.description}</p>
      </div>`;
  });
}

async function loadPricing() {
  const data = await loadJSON('assets/data/pricing.json');
  const container = document.getElementById('pricing-container');
  data.forEach((plan, i) => {
    const features = plan.features.map(f => `<li>${f}</li>`).join('');
    container.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <h3>${plan.plan}</h3>
        <h4>${plan.title}</h4>
        <ul>${features}</ul>
        <a href="${plan.link}" class="btn small">Book Now</a>
      </div>`;
  });
}

async function loadTeam() {
  const data = await loadJSON('assets/data/team.json');
  const container = document.getElementById('team-container');
  data.forEach((member, i) => {
    container.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <img src="${member.img}" alt="${member.name}">
        <h4>${member.name}</h4>
        <h5>${member.role}</h5>
        <p>${member.bio}</p>
      </div>`;
  });
}

async function loadTestimonials() {
  const data = await loadJSON('assets/data/testimonials.json');
  const container = document.getElementById('testimonials-container');
  data.forEach((t, i) => {
    container.innerHTML += `
      <div class="card" data-aos="fade-up" data-aos-delay="${i * 100}">
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

  const update = () => {
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
  };

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
// Main Initialization
// ============================
document.addEventListener('DOMContentLoaded', async () => {
  // 1) Shared includes
  await includeHTML('#header-placeholder', 'assets/includes/header.html');
  await includeHTML('#footer-placeholder', 'assets/includes/footer.html');

  // 2) Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');
  navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // 3) Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // 4) AOS init
  AOS.init({ duration: 800, once: true });

  // 5) Culture carousel
  initCultureCarousel();

  // 6) Dynamic section loading
  if (document.getElementById('events-container'))      loadEvents();
  if (document.getElementById('shop-container'))        loadShop();
  if (document.getElementById('services-container'))    loadServices();
  if (document.getElementById('pricing-container'))     loadPricing();
  if (document.getElementById('team-container'))        loadTeam();
  if (document.getElementById('testimonials-container')) loadTestimonials();
});
