(async () => {
  try {
    const resp = await fetch('assets/includes/head.html');
    if (!resp.ok) throw new Error('Head partial not found');
    const html = await resp.text();
    // inject *after* the existing title tag
    document.head.insertAdjacentHTML('beforeend', html);
  } catch (e) {
    console.error(e);
  }
})();
