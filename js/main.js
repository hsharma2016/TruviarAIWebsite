/* ==========================================================
   TRUVIAR AI CONSULTING — Main JavaScript
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ──────────────────────────────────────
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.includes(currentPage)) a.classList.add('active');
  });

  // ── Nav scroll shadow ────────────────────────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    const btn = document.querySelector('.back-to-top');
    if (btn) btn.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Hamburger menu ───────────────────────────────────────
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileMenu  = document.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll reveal ────────────────────────────────────────
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ── Back to top ──────────────────────────────────────────
  const topBtn = document.querySelector('.back-to-top');
  if (topBtn) {
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── FAQ accordion ────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Contact form ─────────────────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Simulate async (replace with real fetch to your backend / Formspree)
      await new Promise(r => setTimeout(r, 1200));

      submitBtn.textContent = '✓ Request Sent — We\'ll be in touch shortly.';
      submitBtn.style.background = '#1B8A60';
      form.querySelectorAll('input, select, textarea').forEach(f => f.disabled = true);
    });
  }

  // ── Smooth scroll for anchor links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Hero counter animation ───────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el  = e.target;
        const end = parseInt(el.dataset.count, 10);
        const dur = 1600;
        const step = dur / end;
        let cur = 0;
        const tick = () => {
          cur = Math.min(cur + 1, end);
          el.textContent = cur + (el.dataset.suffix || '');
          if (cur < end) setTimeout(tick, step);
        };
        tick();
        counterIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterIO.observe(el));
  }

});
