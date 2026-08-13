/* =======================================
   Bloom Interiors — Main JavaScript
   Vanilla ES6+, no dependencies
======================================= */

// ─── Mobile Nav Toggle ───
function initNavToggle() {
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      navToggle.focus();
    }
  });

  // Mobile dropdown toggles
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 959) {
        e.preventDefault();
        const parentDropdown = this.closest('.dropdown');
        if (parentDropdown) parentDropdown.classList.toggle('open');
      }
    });
  });

  // Close nav when a link is clicked (on mobile)
  navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 959) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });
}

// ─── Sticky Header ───
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.13)';
      header.style.backdropFilter = 'blur(4px)';
    } else {
      header.style.boxShadow = '';
      header.style.backdropFilter = '';
    }
  }, { passive: true });
}

// ─── Scroll To Top ───
function initScrollTopButton() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.style.display = window.scrollY > 500 ? 'flex' : 'none';
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Scroll-Triggered Animations (IntersectionObserver) ───
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.anim-fade, .anim-slide-up, .anim-slide-left, .anim-slide-right, .anim-scale'
  );
  if (!elements.length) return;

  // Respect reduced motion: immediately show all
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) { observer.observe(el); });
}

// ─── FAQ Accordion ───
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    question.setAttribute('aria-expanded', 'false');

    function toggleItem() {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        const q = other.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    }

    question.addEventListener('click', toggleItem);
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(); }
    });
  });
}

// ─── Gallery Filter ───
function initGalleryFilter() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        const show = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });
}

// ─── Gallery Skeleton ───
function initGallerySkeleton() {
  const wrap = document.getElementById('galleryGrid');
  if (!wrap) return;
  setTimeout(function () { wrap.classList.add('loaded'); }, 700);
}

// ─── Per-field Form Validation ───
function validateField(field) {
  const errorEl = field.parentElement.querySelector('.field-error');
  let isValid = true;
  let message = '';

  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    message = 'This field is required.';
  } else if (field.type === 'email' && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    isValid = false;
    message = 'Please enter a valid email address.';
  } else if (field.type === 'tel' && field.value.trim() && field.value.replace(/\D/g, '').length < 8) {
    isValid = false;
    message = 'Please enter a valid phone number.';
  }

  field.classList.toggle('invalid', !isValid);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.toggle('show', !isValid);
  }
  return isValid;
}

function initFormValidation(formId, messageId) {
  const form    = document.getElementById(formId);
  const message = document.getElementById(messageId);
  if (!form) return;

  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach(function (field) {
    field.addEventListener('blur', function () { validateField(field); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let allValid = true;
    fields.forEach(function (field) { if (!validateField(field)) allValid = false; });

    if (message) message.classList.remove('success', 'error', 'show');

    if (allValid) {
      if (message) {
        message.textContent = "Thank you! Your message has been submitted. We'll be in touch soon.";
        message.classList.add('success', 'show');
      }
      form.reset();
      const fileName = form.querySelector('.file-upload-name');
      if (fileName) fileName.textContent = '';
    } else if (message) {
      message.textContent = 'Please correct the highlighted fields and try again.';
      message.classList.add('error', 'show');
    }
  });
}

// ─── File Upload Preview ───
function initFileUploadPreview() {
  const fileInput     = document.getElementById('fileUpload');
  const fileNameLabel = document.getElementById('fileUploadName');
  if (!fileInput || !fileNameLabel) return;
  fileInput.addEventListener('change', function () {
    fileNameLabel.textContent = fileInput.files.length > 0
      ? 'Selected: ' + fileInput.files[0].name
      : '';
  });
}

// ─── Cost Calculator ───
function initServiceCalculator() {
  const calcForm   = document.getElementById('calcForm');
  const calcResult = document.getElementById('calcResult');
  if (!calcForm || !calcResult) return;

  const basePrices = { painting: 12, wallpaper: 18, furniture: 250, lighting: 150, makeover: 35 };

  calcForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const service = document.getElementById('calcService').value;
    const size    = parseFloat(document.getElementById('calcSize').value) || 0;
    const rate    = basePrices[service] || 0;
    const estimate = (service === 'furniture' || service === 'lighting') ? rate : rate * size;

    calcResult.innerHTML =
      'Estimated cost: <strong>&#x20B9;' + estimate.toLocaleString('en-IN') + '</strong><br>' +
      '<span style="font-size:13px;color:var(--text-muted);">This is a rough estimate — final pricing is confirmed after a free on-site consultation.</span>';
    calcResult.classList.add('show');
  });
}

// ─── Dark / Light Mode Toggle ───
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  function applyIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (window.lucide) lucide.createIcons();
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  applyIcon();

  btn.addEventListener('click', function () {
    const current  = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    applyIcon();
  });
}

// ─── RTL / LTR Direction Toggle ───
function initDirectionToggle() {
  const btn = document.getElementById('dirToggle');
  if (!btn) return;

  function applyLabel() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    btn.setAttribute('aria-label', isRtl ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
  }

  const savedDir = localStorage.getItem('direction');
  if (savedDir) document.documentElement.setAttribute('dir', savedDir);
  applyLabel();

  btn.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir  = current === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('direction', newDir);
    applyLabel();
  });
}

// ─── Active Nav Link ───
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links > a, .nav-links .dropdown-menu a');
  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });
}

// ─── Coming Soon Countdown ───
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 14);
  function update() {
    const diff = launchDate - new Date();
    if (diff <= 0) { el.textContent = "We're live!"; return; }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    el.textContent = d + 'd ' + h + 'h ' + m + 'm';
  }
  update();
  setInterval(update, 60000);
}

// ─── Favicon injection ───
(function injectFavicon() {
  if (!document.querySelector("link[rel*='icon']")) {
    const link = document.createElement('link');
    link.type  = 'image/x-icon';
    link.rel   = 'shortcut icon';
    link.href  = '../assets/images/fav.jpg';
    document.head.appendChild(link);
  }
})();

// ─── Init ───
document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initStickyHeader();
  initScrollTopButton();
  initScrollAnimations();
  initFaqAccordion();
  initGalleryFilter();
  initGallerySkeleton();
  initFormValidation('contactForm',      'contactFormMessage');
  initFormValidation('enquiryForm',      'enquiryFormMessage');
  initFormValidation('consultationForm', 'consultationFormMessage');
  initFormValidation('newsletterForm',   'newsletterFormMessage');
  initFormValidation('comingSoonForm',   'comingSoonFormMessage');
  initFileUploadPreview();
  initServiceCalculator();
  initThemeToggle();
  initDirectionToggle();
  setActiveNavLink();
  initCountdown();
});