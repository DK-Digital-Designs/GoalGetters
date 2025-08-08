/* @reference: https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Using_event_listeners */
/* Main site JS:
   - single loader for JSON-driven sections
   - carousel with touch support
   - nav toggle + active link highlighting
   - FAB actions
   - AOS init after content inserted
*/

(async () => {
  // 1) inject header + footer
  await includeHTML('#header', 'assets/includes/header.html').catch(()=>{});
  await includeHTML('#footer', 'assets/includes/footer.html').catch(()=>{});
  // our placeholders are named header-placeholder / footer-placeholder in pages
  await includeHTML('#header-placeholder', 'assets/includes/header.html').catch(()=>{});
  await includeHTML('#footer-placeholder', 'assets/includes/footer.html').catch(()=>{});

  // 2) wire nav toggle
  initNavToggle();

  // 3) load dynamic sections (data-driven)
  await Promise.all([
    loadSection('events-container', 'assets/data/events.json', cardEventTemplate),
    loadSection('shop-container', 'assets/data/shop.json', cardShopTemplate),
    loadSection('services-container', 'assets/data/services.json', cardServiceTemplate),
    loadSection('pricing-container', 'assets/data/pricing.json', cardPricingTemplate),
    loadSection('team-container', 'assets/data/team.json', cardTeamTemplate),
    loadSection('testimonials-container', 'assets/data/testimonials.json', cardTestimonialTemplate),
  ]);

  // 4) initialize UI components
  initAOS();
  initCarousel(); // handles any .carousel instances
  initFAB();
  highlightActiveLinks();
})();

/* ---------- Generic section loader ---------- */
async function loadSection(containerId, dataPath, tmplFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    const r = await fetch(dataPath);
    if (!r.ok) throw new Error(`Failed to load ${dataPath}`);
    const data = await r.json();
    el.innerHTML = data.map((item, i) => tmplFn(item, i)).join('');
  } catch (err) {
    console.error(err);
    el.innerHTML = `<div class="muted">Unable to load content.</div>`;
  }
}

/* ---------- Template functions ---------- */
function cardEventTemplate(ev) {
  return `<article class="card" data-aos="fade-up">
    <img src="${ev.img}" alt="${escapeHtml(ev.title)}">
    <div class="card-body">
      <h3>${escapeHtml(ev.title)}</h3>
      <p class="muted">${escapeHtml(ev.date)}</p>
      <div class="meta"><a class="btn small" href="${ev.link}">Learn more</a></div>
    </div>
  </article>`;
}

function cardShopTemplate(it){
  return `<article class="card" data-aos="fade-up">
    <img src="${it.img}" alt="${escapeHtml(it.title)}">
    <div class="card-body">
      <h3>${escapeHtml(it.title)}</h3>
      <p class="muted"><strong>${escapeHtml(it.price||'')}</strong></p>
      <div class="meta"><a class="btn small" href="${it.link}">Inquire</a></div>
    </div>
  </article>`;
}

function cardServiceTemplate(s){
  return `<article class="card" data-aos="fade-up">
    <img src="${s.img}" alt="${escapeHtml(s.title)}">
    <div class="card-body">
      <h3>${escapeHtml(s.title)}</h3>
      <p class="muted">${escapeHtml(s.description||'')}</p>
    </div>
  </article>`;
}

function cardPricingTemplate(p){
  const feats = (p.features||[]).map(f=>`<li>${escapeHtml(f)}</li>`).join('');
  return `<article class="card" data-aos="fade-up">
    <div class="card-body">
      <h3>${escapeHtml(p.plan)}</h3>
      <h4>${escapeHtml(p.title)}</h4>
      <ul>${feats}</ul>
      <div class="meta"><a class="btn small" href="${p.link}">Book now</a></div>
    </div>
  </article>`;
}

function cardTeamTemplate(m){
  return `<article class="card" data-aos="fade-up">
    <img src="${m.img}" alt="${escapeHtml(m.name)}">
    <div class="card-body">
      <h3>${escapeHtml(m.name)}</h3>
      <p class="muted">${escapeHtml(m.role)}</p>
      <p class="muted">${escapeHtml(m.bio||'')}</p>
    </div>
  </article>`;
}

function cardTestimonialTemplate(t){
  return `<article class="card" data-aos="fade-up">
    <div class="card-body">
      <p>${escapeHtml(t.text)}</p>
      <h4 style="color:var(--accent);margin-top:1rem">${escapeHtml(t.name)}</h4>
    </div>
  </article>`;
}

/* small helper to escape user data in templates */
function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---------- AOS init ---------- */
function initAOS(){
  if (window.AOS) {
    AOS.init({duration:700, once:true, easing:'ease-out-cubic'});
    // refresh after content inserted
    window.setTimeout(()=>AOS.refresh(), 50);
  }
}

/* ---------- Nav toggle + close on link click ---------- */
function initNavToggle(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });

  // close when a link clicked
  nav.addEventListener('click', e => {
    if (e.target.matches('.nav__link')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
}

/* highlight active nav links */
function highlightActiveLinks(){
  const links = document.querySelectorAll('.nav__link');
  links.forEach(a=>{
    try{
      const href = new URL(a.href, location.href);
      if (href.pathname === location.pathname) a.classList.add('active');
    }catch(e){}
  });
}

/* ---------- Simple carousel with touch support ---------- */
function initCarousel(){
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(car => {
    const slidesWrap = car.querySelector('.carousel__slides');
    if (!slidesWrap) return;
    const slides = Array.from(slidesWrap.children);
    const prev = car.querySelector('.carousel__btn--prev');
    const next = car.querySelector('.carousel__btn--next');
    let idx = 0;

    function go(i){
      idx = (i + slides.length) % slides.length;
      slidesWrap.style.transform = `translateX(-${idx*100}%)`;
    }
    prev?.addEventListener('click', ()=>go(idx-1));
    next?.addEventListener('click', ()=>go(idx+1));

    // touch support
    let startX = 0, dist = 0;
    slidesWrap.addEventListener('touchstart', e => startX = e.changedTouches[0].clientX);
    slidesWrap.addEventListener('touchend', e=>{
      dist = e.changedTouches[0].clientX - startX;
      if (Math.abs(dist) > 40) go(dist > 0 ? idx-1 : idx+1);
    });
  });
}

/* ---------- Floating action button ---------- */
function initFAB(){
  const fab = document.querySelector('.fab');
  if (!fab) return;
  const main = fab.querySelector('.fab__main');
  const actions = fab.querySelector('.fab__actions');
  const scrollBtn = document.getElementById('scrollTopBtn');

  main?.addEventListener('click', () => {
    fab.classList.toggle('open');
    const open = fab.classList.contains('open');
    actions?.setAttribute('aria-hidden', String(!open));
  });

  scrollBtn?.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
  document.addEventListener('click', (ev) => {
    if (!fab.contains(ev.target)) fab.classList.remove('open');
  });
}
