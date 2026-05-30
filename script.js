/* ============================================================
   Ridge & Iron Roofing — script.js
   ============================================================ */

'use strict';

/* ── HEADER SCROLL ──────────────────────────────────────────── */
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── MOBILE NAV ─────────────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.setAttribute('aria-hidden', String(isOpen));
    mobileNav.style.display = isOpen ? '' : 'flex';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.style.display = '';
    });
  });
}

/* ── SMOOTH SCROLL ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── FAQ ACCORDION ──────────────────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!btn || !answer) return;

  if (!answer.querySelector('div')) {
    const inner = document.createElement('div');
    while (answer.firstChild) inner.appendChild(answer.firstChild);
    answer.appendChild(inner);
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item').forEach(i => {
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      i.classList.remove('open');
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      item.classList.add('open');
    }
  });
});

/* ── SCROLL FADE ANIMATIONS ──────────────────────────────────── */
const animateSelectors = [
  '.service-card', '.why-card', '.project-card',
  '.review-card', '.storm-step', '.faq-item',
  '.contact-info', '.contact-form-wrap'
];

animateSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => el.classList.add('fade-up'));
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
}

/* ── CONTACT FORM ────────────────────────────────────────────── */
const form = document.getElementById('inspection-form');
const success = document.getElementById('form-success');

if (form && success) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      }
    });
    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });
}
