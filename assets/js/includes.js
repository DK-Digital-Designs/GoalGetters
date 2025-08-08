/* @reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API */
/* small include helper: loads an HTML partial into the DOM
   usage: includeHTML(selector, url) or includeHTML('head','path') */

async function includeHTML(selector, url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to load ${url}`);
    const html = await resp.text();
    if (selector === 'head') {
      document.head.insertAdjacentHTML('beforeend', html);
    } else {
      const placeholder = document.querySelector(`#${selector}-placeholder`) || document.querySelector(selector);
      if (placeholder) placeholder.innerHTML = html;
    }
  } catch (err) {
    // Do not break the site - log for debugging
    console.error(err);
  }
}

// Also make it available for inline use
window.includeHTML = includeHTML;
