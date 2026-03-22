/* ====================================================
   Devasena Info Project — script.js
   ==================================================== */

/* ---------- Sticky navbar: add shadow on scroll ---------- */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
    } else {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
    }
  });
})();

/* ---------- Smooth-scroll for anchor links ---------- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      const navbarHeight = document.getElementById('navbar')?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ---------- Scroll-reveal animation ---------- */
(function () {
  const ANIMATION_CLASS = 'revealed';

  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Maximum number of items in a stagger group (keeps delays reasonable)
  const MAX_STAGGER_COUNT = 6;
  // How far into the viewport an element must scroll before it reveals
  const INTERSECTION_THRESHOLD = 0.12;

  // Mark elements for animation
  const selectors = [
    '.card',
    '.timeline-item',
    '.attribute-item',
    '.worship-card',
    '.significance-block',
    '.name-card',
  ];
  document.querySelectorAll(selectors.join(', ')).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % MAX_STAGGER_COUNT) * 0.08}s`;
  });

  // Observe with IntersectionObserver when available
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(ANIMATION_CLASS);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: INTERSECTION_THRESHOLD }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add(ANIMATION_CLASS));
  }
})();

/* ---------- Active nav link on scroll ---------- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .navbar a.active {
      background: rgba(255,255,255,0.2);
      color: #ffe8a0;
    }
  `;
  document.head.appendChild(activeStyle);

  const navbarHeight = document.getElementById('navbar')?.offsetHeight ?? 70;

  function updateActive() {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= navbarHeight + 20) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
