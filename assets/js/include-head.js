// Injects /assets/includes/head.html, then any EXTRA_HEAD_LINKS (so overrides win)
(async () => {
  try {
    const resp = await fetch('assets/includes/head.html', { cache: 'no-store' });
    if (!resp.ok) throw new Error('Head partial not found');
    const html = await resp.text();
    document.head.insertAdjacentHTML('beforeend', html);

    // append page-specific CSS (ensures loaded AFTER style.css)
    if (Array.isArray(window.EXTRA_HEAD_LINKS)) {
      window.EXTRA_HEAD_LINKS.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      });
    }
  } catch (e) {
    console.error(e);
  }
})();
