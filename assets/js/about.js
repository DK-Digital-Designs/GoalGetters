// About page logic: enhance team section with modal
(function(){
  // expects byId, loadJSON, showError from main.js

  function ensureModalRoot() {
    if (byId('about-modal')) return;
    const div = document.createElement('div');
    div.id = 'about-modal';
    div.className = 'modal';
    div.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button class="modal-close" aria-label="Close">Close ✕</button>
        <div id="modalContent"></div>
      </div>
    `;
    document.body.appendChild(div);
    div.addEventListener('click', e => { if (e.target === div) div.classList.remove('open'); });
    div.querySelector('.modal-close').addEventListener('click', () => div.classList.remove('open'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') div.classList.remove('open'); });
  }

  function openModal(html) {
    ensureModalRoot();
    byId('modalContent').innerHTML = html;
    byId('about-modal').classList.add('open');
  }

  function renderModal(member) {
    const quals = member.qualifications || {};
    const list = (arr) => (arr || []).map(x => `<li>${x}</li>`).join('') || '<li>—</li>';
    const quote = member.quote ? `<div class="modal-quote">“${member.quote}”</div>` : '';
    return `
      <div class="modal-header">
        <img src="${member.img}" alt="${member.name}">
        <div>
          <div id="modalTitle" class="modal-title">${member.name}</div>
          <div class="modal-role">${member.role ?? ''}</div>
          ${quote}
        </div>
      </div>

      <div class="modal-section">
        <h4>Biography</h4>
        <p>${member.bio ?? ''}</p>
      </div>

      <div class="modal-section">
        <h4>Qualifications & Experience</h4>
        <div class="columns-3">
          <div>
            <h5>Player Experience</h5>
            <ul>${list(quals.player)}</ul>
          </div>
          <div>
            <h5>Referee Qualifications</h5>
            <ul>${list(quals.referee)}</ul>
          </div>
          <div>
            <h5>Coaching Qualifications</h5>
            <ul>${list(quals.coaching)}</ul>
            ${quals.experience?.length ? `<h5 style="margin-top:.75rem">Coaching Experience</h5><ul>${list(quals.experience)}</ul>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  function normalize(s){ return (s||'').trim().toLowerCase(); }

  async function enhanceTeam() {
    const grid = document.querySelector('#team-container');
    if (!grid) return;

    let data;
    try {
      data = await loadJSON('assets/data/team.json');
      if (!Array.isArray(data) || !data.length) return showError(grid,'No team members yet.');
    } catch (e) {
      console.error('[about] load team.json failed:', e);
      return showError(grid, 'Could not load team.');
    }

    // Build lookup by slug + name
    const bySlug = new Map(data.map(m => [m.slug || '', m]));
    const byName = new Map(data.map(m => [normalize(m.name), m]));

    // Make existing simple .card tiles clickable (from main.js),
    // OR .team-card tiles if you switched to that layout.
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.team-card, .card');
      if (!card || !grid.contains(card)) return;

      // Try dataset first (for .team-card)
      let member = null;
      const slug = card.dataset.slug;
      if (slug && bySlug.has(slug)) {
        member = bySlug.get(slug);
      }

      // Fallback: read the name in the card (.card from main.js has <h4>)
      if (!member) {
        const nameEl = card.querySelector('.tc-name, h4');
        const name = normalize(nameEl?.textContent);
        if (name && byName.has(name)) member = byName.get(name);
      }

      if (member) openModal(renderModal(member));
    });

    // Optional: auto-open via ?member=slug
    const paramSlug = new URLSearchParams(location.search).get('member');
    if (paramSlug && bySlug.has(paramSlug)) {
      openModal(renderModal(bySlug.get(paramSlug)));
    }
  }

  document.addEventListener('DOMContentLoaded', enhanceTeam);
})();
