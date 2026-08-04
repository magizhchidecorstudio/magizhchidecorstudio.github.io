/* =========================================================
   மகிழ்ச்சி Decor Studio — Site Script
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const siteNav   = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close mobile menu after clicking a link
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById('siteHeader');
  function updateHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', updateHeaderShadow);
  updateHeaderShadow();

  /* ---------- Scroll Reveal (.hidden -> .show) ---------- */
  const revealEls = document.querySelectorAll('.hidden');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) { el.classList.add('show'); });
  }

  /* ---------- Animated Counters (About section) ---------- */
  const counters = document.querySelectorAll('[data-count-target]');
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      const target = parseFloat(el.getAttribute('data-count-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target + suffix;
    });
  }

  /* ---------- Gallery Video Modal (YouTube) ---------- */
  const galleryItems = document.querySelectorAll('.gallery-item[data-video]');
  if (galleryItems.length) {

    // Build modal once
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML =
      '<div class="video-modal-backdrop"></div>' +
      '<div class="video-modal-box">' +
        '<button class="video-modal-close" aria-label="Close video"><i class="fa-solid fa-xmark"></i></button>' +
        '<div class="video-modal-frame"><iframe allow="autoplay; encrypted-media" allowfullscreen></iframe></div>' +
      '</div>';
    document.body.appendChild(modal);

    const iframe   = modal.querySelector('iframe');
    const closeBtn = modal.querySelector('.video-modal-close');
    const backdrop = modal.querySelector('.video-modal-backdrop');

    function openModal(videoId) {
      if (!videoId || videoId.indexOf('YOUTUBE_VIDEO_ID') === 0) {
        // Placeholder ID — nothing to play yet
        return;
      }
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      iframe.src = '';
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        openModal(item.getAttribute('data-video'));
      });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ---------- Smooth active-link scroll (nice-to-have) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
