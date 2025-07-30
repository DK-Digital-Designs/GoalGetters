// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  // -- Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');
  navToggle && navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // -- Navbar Background on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // -- AOS Init
  AOS.init({ duration: 800, once: true });

  // -- Dynamic Sections
  if (document.getElementById('events-container'))      loadEvents();
  if (document.getElementById('shop-container'))        loadShop();
  if (document.getElementById('services-container'))    loadServices();
  if (document.getElementById('pricing-container'))     loadPricing();
  if (document.getElementById('team-container'))        loadTeam();
  if (document.getElementById('testimonials-container')) loadTestimonials();
});

// Helper to fetch JSON
function loadJSON(path) {
  return fetch(path).then(res => res.json());
}

// Render Events on Home
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

// Render Shop Preview
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

// Render Services on Booking
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

// Render Pricing on Booking
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

// Render Team on About
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

// Render Testimonials on About
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

// CULTURE CAROUSEL
function initCultureCarousel() {
  const container = document.querySelector('#culture .carousel-container');
  if (!container) return;

  const slidesEl = container.querySelector('.slides');
  const slides   = Array.from(slidesEl.children);
  const prevBtn  = container.querySelector('.prev');
  const nextBtn  = container.querySelector('.next');
  let index = 0;

  function updateCarousel() {
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });
}

// init on DOM ready (after your other loaders)
document.addEventListener('DOMContentLoaded', () => {
  initCultureCarousel();
});

