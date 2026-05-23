/* ===================================
   SHYAM LAMINATION DOOR – MAIN JS
   =================================== */

(function () {
  'use strict';

  /* ── Hero Slider ── */
  const slides = document.querySelectorAll('.hero__slide');
  const dots   = document.querySelectorAll('.hero__dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let current = 0;
  let autoSlide;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    autoSlide = setInterval(() => goToSlide(current + 1), 5000);
  }

  function stopAuto() { clearInterval(autoSlide); }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { stopAuto(); goToSlide(current - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { stopAuto(); goToSlide(current + 1); startAuto(); });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAuto();
      goToSlide(parseInt(dot.dataset.slide, 10));
      startAuto();
    });
  });

  startAuto();

  /* ── Sticky Header shadow ── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── Mobile Nav Toggle ── */
  const menuBtn = document.getElementById('menuBtn');
  const nav     = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Active Nav Link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

  function setActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav__link[href="#${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ── Product Tab Switcher ── */
  function initTabs(tabsId, pagesId) {
    const tabContainer  = document.getElementById(tabsId);
    const pagesContainer = document.getElementById(pagesId);
    if (!tabContainer || !pagesContainer) return;

    const tabs  = tabContainer.querySelectorAll('.filter-tab');
    const pages = pagesContainer.querySelectorAll('.product-page');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPage = parseInt(tab.dataset.page, 10);

        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update pages with fade
        pages.forEach((page, i) => {
          if (i === targetPage) {
            page.classList.add('active');
          } else {
            page.classList.remove('active');
          }
        });
      });
    });
  }

  initTabs('laminationTabs', 'laminationPages');
  initTabs('doorskinTabs',   'doorskinPages');

  /* ── Back to Top ── */
  const backTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (backTop) {
      backTop.classList.toggle('show', window.scrollY > 400);
    }
  }, { passive: true });

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Contact Form ── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form && formSuccess) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name  = form.querySelector('#name').value.trim();
      const phone = form.querySelector('#phone').value.trim();

      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      // Show success message (in production, send via AJAX/fetch)
      formSuccess.classList.add('show');
      form.reset();

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 6000);
    });
  }

  /* ── Intersection Observer for scroll-reveal animations ── */
  if ('IntersectionObserver' in window) {
    const revealItems = document.querySelectorAll(
      '.about__grid, .category-card, .product-card, .spec-card, .why-card, .catalogue-card, .contact__grid'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealItems.forEach(item => {
      item.style.opacity   = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });
  }

})();
