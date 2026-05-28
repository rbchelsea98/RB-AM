/* ============================================================
   script.js — Red Beacon Asset Management
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. SMOOTH SCROLL — intercept all anchor links
     Manually calculates offset so content never hides under the
     sticky / fixed nav bar.
     ============================================================ */
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    const navHeight = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      e.preventDefault();
      smoothScrollTo(href);
      closeMobileMenu();
    });
  });


  /* ============================================================
     2. NAV — toggle solid background on scroll
     ============================================================ */
  const navbar = document.getElementById('navbar');

  function updateNavStyle() {
    if (window.scrollY > 56) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', updateNavStyle, { passive: true });
  updateNavStyle(); // run once in case page loads mid-scroll


  /* ============================================================
     3. HAMBURGER MENU (mobile)
     ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  }

  hamburger.addEventListener('click', () => {
    const willOpen = !navLinks.classList.contains('open');
    hamburger.classList.toggle('open', willOpen);
    hamburger.setAttribute('aria-expanded', String(willOpen));
    navLinks.classList.toggle('open', willOpen);
  });

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) closeMobileMenu();
  });


  /* ============================================================
     4. FADE-IN ON SCROLL — IntersectionObserver
     Adds .visible to .fade-in elements as they enter the viewport.
     ============================================================ */
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // animate once only
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


  /* ============================================================
     5. COUNTER ANIMATION
     Counts from 0 to the data-target value using an ease-out
     cubic easing over 2 seconds.  Triggered once by
     IntersectionObserver when the counter row scrolls into view.
     ============================================================ */
  const counterEls    = document.querySelectorAll('.counter-value');
  let countersStarted = false;

  function runCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counterEls.forEach(el => {
      const target   = parseFloat(el.dataset.target   || '0');
      const prefix   = el.dataset.prefix  || '';
      const suffix   = el.dataset.suffix  || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const duration = 2200; // ms
      const startTime = performance.now();

      // Reset display to zero before animating (no-JS fallback keeps real value)
      el.textContent = prefix + (0).toFixed(decimals) + suffix;

      function tick(now) {
        const elapsed  = Math.min(now - startTime, duration);
        const progress = elapsed / duration;
        // Ease-out cubic: decelerates as it approaches the target
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }

  const counterSection = document.querySelector('.counters');
  if (counterSection) {
    const counterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCounters();
          counterObserver.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    counterObserver.observe(counterSection);
  }


  /* ============================================================
     6. TESTIMONIALS CAROUSEL
     Index-based: translates the track to show the current slide.
     Auto-advances every 5 s; resets timer on manual interaction.
     Supports touch/swipe on mobile.
     ============================================================ */
  const track   = document.getElementById('carouselTrack');
  const dots    = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track) {
    const slides  = track.querySelectorAll('.testimonial-card');
    const total   = slides.length;
    let   current = 0;
    let   timer   = null;

    function goTo(index) {
      current = ((index % total) + total) % total; // wrap around
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-selected', String(active));
      });
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 5000);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index, 10));
        resetTimer();
      });
    });

    // Touch swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 48) {
        goTo(delta > 0 ? current + 1 : current - 1);
        resetTimer();
      }
    }, { passive: true });

    // Pause auto-rotation while the user hovers over the carousel
    const carousel = document.querySelector('.carousel-wrapper');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(timer));
      carousel.addEventListener('mouseleave', resetTimer);
    }

    resetTimer(); // start auto-rotation
  }


  /* ============================================================
     7. ENQUIRY FORM — client-side validation + async submit
     Submits via fetch to the FormSubmit AJAX endpoint so the
     page never reloads.  Shows an inline success or error message.

     *** ACTION REQUIRED ***
     Replace "your-email@example.com" in the fetch URL below with
     your real email address (same address used in <form action>).
     ============================================================ */
  const form         = document.getElementById('contactForm');
  const submitBtn    = document.getElementById('submitBtn');
  const formResponse = document.getElementById('form-response');

  if (!form) return;

  /* ---- Validation rules ---- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateField(id, value) {
    switch (id) {
      case 'fullName':
        return value.trim() === '' ? 'Please enter your full name.' : '';
      case 'email':
        if (value.trim() === '')      return 'Please enter your email address.';
        if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      default:
        return '';
    }
  }

  function setFieldError(id, message) {
    const field   = document.getElementById(id);
    const errorEl = document.getElementById(`${id}-error`);
    if (!field || !errorEl) return;
    errorEl.textContent = message;
    field.classList.toggle('error', message !== '');
  }

  /* ---- Live validation on blur / re-check on input ---- */
  ['fullName', 'email'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur',  () => setFieldError(id, validateField(id, el.value)));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        setFieldError(id, validateField(id, el.value));
      }
    });
  });

  /* ---- Form submit ---- */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validate required fields
    const required = ['fullName', 'email'];
    let hasErrors  = false;

    required.forEach(id => {
      const el    = document.getElementById(id);
      const error = validateField(id, el ? el.value : '');
      setFieldError(id, error);
      if (error) hasErrors = true;
    });

    if (hasErrors) return;

    // Enter loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled      = true;
    formResponse.className  = 'form-response'; // hide any previous message
    formResponse.textContent = '';

    // Collect data as a plain object (FormSubmit AJAX accepts JSON)
    const payload = {
      fullName:        document.getElementById('fullName').value.trim(),
      email:           document.getElementById('email').value.trim(),
      phone:           document.getElementById('phone').value.trim() || '—',
      investmentRange: document.getElementById('investmentRange').value || '—',
      message:         document.getElementById('message').value.trim() || '—',
    };

    try {
      /*
       * FormSubmit AJAX endpoint — replace the email address here.
       * Docs: https://formsubmit.co/
       * On first submission you will receive a one-time activation
       * email; click that link before messages will start delivering.
       */
      const res  = await fetch('https://formsubmit.co/ajax/your-email@example.com', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && (json.success === 'true' || json.success === true)) {
        formResponse.className   = 'form-response success';
        formResponse.textContent =
          'Thank you! Your enquiry has been received. An advisor will be in touch within one business day.';
        form.reset();
      } else {
        throw new Error(json.message || `Server responded with status ${res.status}`);
      }

    } catch (err) {
      formResponse.className   = 'form-response error';
      formResponse.textContent =
        'Something went wrong and your message could not be sent. Please try again, or contact us directly at enquiries@redbeaconam.com.';
      console.error('[FormSubmit error]', err);

    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      // Scroll the response message into view smoothly
      formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });


  /* ============================================================
     8. FOOTER — dynamic copyright year
     ============================================================ */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

}); // end DOMContentLoaded
