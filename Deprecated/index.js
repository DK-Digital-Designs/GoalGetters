// ==========================================================================
// NAVBAR SCROLL TOGGLE
// ========================================================================== 
const nav = document.querySelector('nav.navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});


// ==========================================================================
// AOS ANIMATIONS INIT
// ========================================================================== 
AOS.init({
  once: true,        // only animate once
  duration: 800      // animation duration in ms
});


// ==========================================================================
// LOCOMOTIVE SCROLL INIT
// ========================================================================== 
// Make sure your <body> (or container) has data-scroll-container
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});


// ==========================================================================
// GSAP HERO REVEALS
// ========================================================================== 
gsap.registerPlugin(ScrollTrigger);

// Tell ScrollTrigger to use locoScroll for its scroll positions
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
});

// update ScrollTrigger on each Locomotive scroll event
locoScroll.on('scroll', ScrollTrigger.update);

// animate headline and button
gsap.from('.hero-content h1', {
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '.hero-content',
    scroller: '[data-scroll-container]'
  }
});
gsap.from('.btn-gradient', {
  y: 20,
  opacity: 0,
  delay: 0.3,
  duration: 1,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '.hero-content',
    scroller: '[data-scroll-container]'
  }
});

// Refresh ScrollTrigger & Locomotive on window update
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();


// ==========================================================================
// PARTICLES.JS BACKGROUND
// ========================================================================== 
// Container ID must match <div id="particles-bg">
particlesJS('particles-bg', {
  particles: {
    number:       { value: 30, density: { enable: true, area: 800 } },
    shape:        { type: 'image', image: { src: 'assets/img/ball.png', width: 32, height: 32 } },
    opacity:      { value: 0.1 },
    size:         { value: 20, random: true },
    move:         { enable: true, speed: 1, direction: 'none', out_mode: 'out' }
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});
