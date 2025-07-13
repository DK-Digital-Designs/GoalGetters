// Helper: fetch JSON
async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.json();
}

// Intersection Observer for deferred rendering
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animate');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

window.addEventListener('DOMContentLoaded', async () => {
  // Theme Toggle
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? '' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Mobile Menu
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
  });

  // Scroll Progress Bar
  const prog = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    prog.style.width = (pct * 100) + '%';
  });

  // Hero Animation Timeline
  anime.timeline({ easing: 'easeOutExpo', duration: 700 })
    .add({ targets: '.hero-content h1', opacity: [0,1], translateY: [20,0] })
    .add({ targets: '.hero-content p', opacity: [0,1], translateY: [20,0] }, '-=500')
    .add({ targets: '.hero-content .btn', opacity: [0,1], translateY: [20,0] }, '-=400');

  // Lazy‐load Services JSON when in view
  const srvSection = document.getElementById('services');
  const srvObserver = new IntersectionObserver(async ([ent], obs) => {
    if (ent.isIntersecting) {
      const services = await fetchData('data/services.json');
      const grid = srvSection.querySelector('.grid');
      services.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="assets/${item.icon}" alt="${item.title} Icon" loading="lazy">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        `;
        grid.append(card);
        observer.observe(card);
      });
      obs.unobserve(srvSection);
    }
  }, { rootMargin: '200px' });
  srvObserver.observe(srvSection);

  // About section JSON fetch immediately
  const about = await fetchData('data/about.json');
  document.querySelector('.about-text h3').textContent = about.heading;
  document.querySelector('.about-text p').textContent = about.text;
  document.querySelector('.about-image img').src = `assets/${about.image}`;

  // Smooth scroll for “Explore Services”
  document.querySelector('.btn').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });

  // Testimonials Carousel
(async function(){
  const data = await fetchData('data/testimonials.json');
  const carousel = document.querySelector('.testi-carousel');
  data.forEach(({ quote, author, avatar }, i) => {
    const slide = document.createElement('div');
    slide.className = 'testi-slide';
    if (i === 0) slide.classList.add('active');
    slide.innerHTML = `
      <p class="testi-quote">“${quote}”</p>
      <div class="testi-author">
        <img src="assets/${avatar}" alt="${author}" loading="lazy">
        <span>${author}</span>
      </div>
    `;
    carousel.append(slide);
  });

  let idx = 0;
  const slides = [...document.querySelectorAll('.testi-slide')];
  const show = newIndex => {
    slides[idx].classList.remove('active');
    idx = (newIndex + slides.length) % slides.length;
    slides[idx].classList.add('active');
  };
  document.querySelector('.testi-next')
    .addEventListener('click', () => show(idx + 1));
  document.querySelector('.testi-prev')
    .addEventListener('click', () => show(idx - 1));

  // auto-rotate every 6s
  setInterval(() => show(idx + 1), 6000);
})();

// FAQ Accordion
(async function(){
  const faqs = await fetchData('data/faq.json');
  const list = document.querySelector('.faq-list');
  faqs.forEach(({ q, a }) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-q">${q}</button>
      <div class="faq-a">${a}</div>
    `;
    list.append(item);
    item.querySelector('.faq-q').addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
})();

// Team Grid
(async function(){
  const members = await fetchData('data/team.json');
  const grid = document.querySelector('.team-grid');
  members.forEach(m => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <img src="assets/${m.photo}" alt="${m.name}" loading="lazy">
      <h3>${m.name}</h3>
      <p>${m.role}</p>
    `;
    grid.append(card);
  });
})();

  // Back-to-Top Button
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 300);
  });
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Contact Form Submission
  document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = 'Sending…';
    try {
      await fetch('/.netlify/functions/contact', {
        method: 'POST',
        body: new FormData(e.target)
      });
      status.textContent = 'Thank you! We’ll be in touch.';
    } catch {
      status.textContent = 'Oops—something went wrong.';
    }
  });
});
