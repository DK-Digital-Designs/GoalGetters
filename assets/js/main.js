//────────────────────────────────────────────────────────────────*
// Navbar: change bg on scroll
//────────────────────────────────────────────────────────────────*
window.addEventListener('scroll', () => {
  document.querySelector('.navbar')
    .classList.toggle('scrolled', window.scrollY > 50);
});

//────────────────────────────────────────────────────────────────*
// AOS (Animate On Scroll) Init
//────────────────────────────────────────────────────────────────*
AOS.init({
  duration: 800,
  once: true
});

//────────────────────────────────────────────────────────────────*
// Locomotive Scroll (Parallax) Init
//────────────────────────────────────────────────────────────────*
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('body'),
  smooth: true
});

//────────────────────────────────────────────────────────────────*
// Particles.js: Soccer Balls
//────────────────────────────────────────────────────────────────*
particlesJS('particles-bg', {
  particles: {
    number: { value: 30 },
    shape: {
      type: 'image',
      image: { src: 'assets/images/ball.png', width: 32, height: 32 }
    },
    size: { value: 16 },
    move: { speed: 2 }
  }
});

//────────────────────────────────────────────────────────────────*
// GSAP ScrollTrigger: Text Reveal
//────────────────────────────────────────────────────────────────*
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.reveal').forEach(elem => {
  gsap.to(elem, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: 'top 85%',
      toggleActions: 'play none none reset'
    }
  });
});
