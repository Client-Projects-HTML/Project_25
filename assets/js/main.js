/* =======================================
   Interior Painting & Home Decor Website
   Main JavaScript (vanilla, ES6+)
   Note: theme/direction choices are kept in
   memory for the session only (no localStorage
   in this delivery environment). If you host
   this yourself, persist the choice with
   localStorage — see documentation/customization-guide.md
======================================= */

// ---------- Mobile Nav Toggle ----------
function initNavToggle() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ---------- Sticky Header Shadow on Scroll ----------
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', function () {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 14px rgba(0,0,0,0.14)'
      : '0 2px 8px rgba(0,0,0,0.06)';
  });
}

// ---------- Scroll To Top Button ----------
function initScrollTopButton() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', function () {
    scrollTopBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------- FAQ Accordion ----------
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
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    }

    question.addEventListener('click', toggleItem);
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem();
      }
    });
  });
}

// ---------- Gallery Filter ----------
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterButtons.length) return;

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
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

// ---------- Gallery Skeleton Loading Simulation ----------
function initGallerySkeleton() {
  const wrap = document.getElementById('galleryGrid');
  if (!wrap) return;

  // Simulates a network/data fetch delay, then reveals real content.
  setTimeout(function () {
    wrap.classList.add('loaded');
  }, 700);
}

// ---------- Per-field Form Validation ----------
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
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);
  if (!form) return;

  const fields = form.querySelectorAll('input, textarea, select');

  fields.forEach(function (field) {
    field.addEventListener('blur', function () { validateField(field); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let allValid = true;

    fields.forEach(function (field) {
      if (!validateField(field)) allValid = false;
    });

    if (message) message.classList.remove('success', 'error');

    if (allValid) {
      if (message) {
        message.textContent = "Thank you! Your form has been submitted successfully. We'll get back to you soon.";
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

// ---------- File Upload Preview (Enquiry Form) ----------
function initFileUploadPreview() {
  const fileInput = document.getElementById('fileUpload');
  const fileNameLabel = document.getElementById('fileUploadName');
  if (!fileInput || !fileNameLabel) return;

  fileInput.addEventListener('change', function () {
    fileNameLabel.textContent = fileInput.files.length > 0
      ? 'Selected: ' + fileInput.files[0].name
      : '';
  });
}

// ---------- Simple Service Cost Calculator (Consultation page) ----------
function initServiceCalculator() {
  const calcForm = document.getElementById('calcForm');
  const calcResult = document.getElementById('calcResult');
  if (!calcForm || !calcResult) return;

  const basePrices = {
    painting: 12,
    wallpaper: 18,
    furniture: 250,
    lighting: 150,
    makeover: 35
  };

  calcForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const service = document.getElementById('calcService').value;
    const size = parseFloat(document.getElementById('calcSize').value) || 0;
    const rate = basePrices[service] || 0;
    const estimate = (service === 'furniture' || service === 'lighting') ? rate : rate * size;

    calcResult.innerHTML = 'Estimated cost: <strong>\u20B9' + estimate.toLocaleString('en-IN') + '</strong><br>' +
      '<span style="font-size:13px;color:var(--text-muted);">This is a rough placeholder estimate \u2014 final pricing is confirmed after a free on-site consultation.</span>';
    calcResult.classList.add('show');
  });
}

// ---------- Dark / Light Mode Toggle ----------
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  function applyIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (!document.documentElement.hasAttribute('data-theme') &&
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  applyIcon();

  btn.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    applyIcon();
  });
}

// ---------- RTL / LTR Direction Toggle ----------
function initDirectionToggle() {
  const btn = document.getElementById('dirToggle');
  if (!btn) return;

  function applyLabel() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    btn.setAttribute('aria-label', isRtl ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
  }

  applyLabel();

  btn.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    document.documentElement.setAttribute('dir', current === 'rtl' ? 'ltr' : 'rtl');
    applyLabel();
  });
}

// ---------- Active nav link based on current page ----------
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// ---------- Coming Soon Countdown (if present on the page) ----------
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 14); // demo: 14 days from now

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

// ---------- Init everything on DOM ready ----------
document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initStickyHeader();
  initScrollTopButton();
  initFaqAccordion();
  initGalleryFilter();
  initGallerySkeleton();
  initFormValidation('contactForm', 'contactFormMessage');
  initFormValidation('enquiryForm', 'enquiryFormMessage');
  initFormValidation('consultationForm', 'consultationFormMessage');
  initFormValidation('newsletterForm', 'newsletterFormMessage');
  initFormValidation('comingSoonForm', 'comingSoonFormMessage');
  initFileUploadPreview();
  initServiceCalculator();
  initThemeToggle();
  initDirectionToggle();
  setActiveNavLink();
  initCountdown();
});
