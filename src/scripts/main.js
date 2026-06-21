/**
 * UNIVERSO MUSICAL — Main JavaScript
 * Premium Music Store Landing Page
 */

'use strict';

(function fixHorizontalOverflow() {
  const html = document.documentElement;
  const body = document.body;
  html.style.overflowX = 'hidden';
  body.style.overflowX = 'hidden';
  html.style.maxWidth = '100%';
  body.style.maxWidth = '100%';
  html.style.width = '100%';
  body.style.width = '100%';

  const allEls = document.querySelectorAll('*');
  allEls.forEach(el => {
    const s = getComputedStyle(el);
    if (s.position === 'fixed' || s.position === 'sticky') return;
    if (el.tagName === 'HTML' || el.tagName === 'BODY') return;
    if (s.overflowX === 'hidden' || s.overflowX === 'clip' || s.overflow === 'hidden' || s.overflow === 'clip') return;
    if (el.scrollWidth > el.clientWidth) {
      el.style.overflowX = 'hidden';
    }
  });

  window.addEventListener('resize', () => {
    html.style.overflowX = 'hidden';
    body.style.overflowX = 'hidden';
  });
})();

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const prefersFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobileViewport = () => window.innerWidth < 640;

/* ===========
=================================================
   1. PRELOADER
   ============================================================ */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progress = document.getElementById('preloaderProgress');
  let pct = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 18 + 5;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'visible';
        initRevealAnimations();
        initCounters();
      }, 400);
    }
    progress.style.width = pct + '%';
  }, 80);
})();

/* ============================================================
   2. CUSTOM CURSOR (desktop only)
   ============================================================ */
if (prefersFinePointer && !isTouchDevice) {
  (function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    (function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    })();

    document.querySelectorAll('a, button, .instrument-card, .service-card, .testimonial-card, .class-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        follower.style.width = '60px';
        follower.style.height = '60px';
        follower.style.borderColor = 'rgba(212, 175, 55, 0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = 'rgba(26, 58, 108, 0.6)';
      });
    });
  })();
}

/* ============================================================
   3. PARTICLES CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const COLORS = ['rgba(26, 58, 108,', 'rgba(212, 175, 55,', 'rgba(255, 255, 255,'];
  const NUM = (isTouchDevice || isMobileViewport()) ? 25 : 60;
  const enableMouseRepulsion = prefersFinePointer && !isTouchDevice;
  const particles = Array.from({ length: NUM }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.5 + 0.1,
  }));

  let mx = W / 2, my = H / 2;
  if (enableMouseRepulsion) {
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      if (enableMouseRepulsion) {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.vx += (dx / dist) * 0.08;
          p.vy += (dy / dist) * 0.08;
        }
      }

      // Friction
      p.vx *= 0.99;
      p.vy *= 0.99;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(26, 58, 108, ${0.05 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ============================================================
   4. NAVBAR
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function setMenuOpen(open) {
    hamburger.classList.toggle('active', open);
    navLinks.classList.toggle('mobile-open', open);
    document.body.classList.toggle('menu-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    setMenuOpen(!navLinks.classList.contains('mobile-open'));
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
      setMenuOpen(false);
    }
  });
})();

/* ============================================================
   5. SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initRevealAnimations() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-card, .reveal-right, .reveal-left');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================================
   6. COUNTER ANIMATIONS
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ============================================================
   7. 3D TILT EFFECT ON CARDS (desktop only)
   ============================================================ */
if (prefersFinePointer && !isTouchDevice) {
  (function initTilt() {
    const cards = document.querySelectorAll('.instrument-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;

        card.style.transform = `
          translateY(-8px)
          perspective(600px)
          rotateX(${-dy * 6}deg)
          rotateY(${dx * 6}deg)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => { card.style.transition = ''; }, 600);
      });
    });
  })();
}

/* ============================================================
   8. TESTIMONIALS SLIDER
   ============================================================ */
(function initTestimonials() {
  const wrapper = document.querySelector('.testimonials-wrapper');
  const track = document.getElementById('testimonialsTrack');
  const cards = track ? [...track.querySelectorAll('.testimonial-card')] : [];
  const progressFill = document.querySelector('#testimonialsProgress .tp-bar');
  let current = 0;
  let autoPlay = null;
  const N = cards.length;
  const GAP = 24;
  if (!wrapper || !track || N === 0) return;

  function visible() { return wrapper.offsetWidth <= 640 ? 1 : 2; }
  function pages() { return Math.ceil(N / visible()); }

  function cw() {
    const w = wrapper.offsetWidth;
    const v = visible();
    const total = w - GAP * (v - 1);
    return total > 0 ? Math.floor(total / v) : 520;
  }

  function resetProgress() {
    if (!progressFill) return;
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    progressFill.offsetHeight;
    progressFill.style.transition = `width 4000ms linear`;
    progressFill.style.width = '100%';
  }

  function goTo(index) {
    const v = visible();
    const p = pages();
    current = Math.max(0, Math.min(index, p - 1));
    const w = cw();
    track.style.transform = `translateX(-${current * (w + GAP) * v}px)`;
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    resetProgress();
  }

  function layout() {
    const w = cw();
    const v = visible();
    wrapper.style.padding = '0';
    track.style.display = 'flex';
    track.style.flexWrap = 'nowrap';
    track.style.gap = GAP + 'px';
    track.style.width = (N * w + (N - 1) * GAP) + 'px';
    cards.forEach(c => {
      c.style.width = w + 'px';
      c.style.flexShrink = '0';
      c.style.boxSizing = 'border-box';
    });
    if (current >= pages()) current = 0;
    goTo(current);
  }

  function start() {
    if (prefersReducedMotion) return;
    resetProgress();
    autoPlay = setInterval(() => goTo(current < pages() - 1 ? current + 1 : 0), 4000);
  }
  function stop() {
    clearInterval(autoPlay);
    autoPlay = null;
    if (progressFill) progressFill.style.width = '0%';
  }

  function init() {
    if (wrapper.offsetWidth === 0) { setTimeout(init, 30); return; }
    layout();
    window.addEventListener('resize', layout);
    start();
    wrapper.addEventListener('mouseenter', stop);
    wrapper.addEventListener('mouseleave', start);
  }

  let sx = 0, dx = 0;
  wrapper.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; dx = 0; stop(); }, { passive: true });
  wrapper.addEventListener('touchmove', (e) => { dx = e.touches[0].clientX - sx; }, { passive: true });
  wrapper.addEventListener('touchend', () => {
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    start();
  });

  init();
})();

/* ============================================================
   9. CONTACT FORM
   ============================================================ */
(function initForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      shakeForm();
      return;
    }

    // Simulate sending
    submitBtn.querySelector('.btn-text').textContent = 'Enviando...';
    submitBtn.disabled = true;

    await new Promise(r => setTimeout(r, 1800));

    submitBtn.querySelector('.btn-text').textContent = '✓ Mensaje Enviado';
    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

    setTimeout(() => {
      form.reset();
      submitBtn.querySelector('.btn-text').textContent = 'Enviar Mensaje';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  });

  function shakeForm() {
    form.style.animation = 'shake 0.4s ease';
    setTimeout(() => { form.style.animation = ''; }, 400);
  }

  // Inject shake keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-8px)}
      40%{transform:translateX(8px)}
      60%{transform:translateX(-5px)}
      80%{transform:translateX(5px)}
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   10. SMOOTH SCROLL & ACTIVE NAV
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Active nav highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));
})();

/* ============================================================
   11. PARALLAX ON HERO & EVENTS
   ============================================================ */
(function initParallax() {
  if (prefersReducedMotion || isTouchDevice || isMobileViewport()) return;

  const heroImg = document.querySelector('.hero-bg-img');
  const heroContent = document.querySelector('.hero-content');
  const eventsImg = document.querySelector('.events-bg-img');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;

    if (heroImg) heroImg.style.transform = `translateY(${sy * 0.3}px) scale(1.1)`;
    if (heroContent) heroContent.style.transform = `translateY(${sy * 0.15}px)`;
    if (eventsImg) {
      const eventsTop = document.getElementById('eventos')?.offsetTop || 0;
      const offset = sy - eventsTop;
      if (Math.abs(offset) < 800) eventsImg.style.transform = `translateY(${offset * 0.2}px) scale(1.1)`;
    }
  });
})();

/* ============================================================
   12. MAGNETIC BUTTONS (desktop only)
   ============================================================ */
if (prefersFinePointer && !isTouchDevice) {
  (function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        setTimeout(() => { btn.style.transition = ''; }, 500);
      });
    });
  })();
}

/* ============================================================
   13. INSTRUMENT CARD SOUND WAVE EFFECT
   ============================================================ */
(function initCardRipple() {
  document.querySelectorAll('.instrument-card, .service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        width:10px; height:10px;
        left:${x - 5}px; top:${y - 5}px;
        background:rgba(212,175,55,0.3);
        pointer-events:none; z-index:10;
        animation:rippleEffect 0.7s ease-out forwards;
      `;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      0% { transform: scale(0); opacity:1; }
      100% { transform: scale(30); opacity:0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   14. SCROLL PROGRESS BAR
   ============================================================ */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; z-index:9999;
    background:linear-gradient(90deg, #D4AF37, #E8C55A);
    width:0%; transition:width 0.1s linear; pointer-events:none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / docH * 100) + '%';
  });
})();

/* ============================================================
   15. ACTIVE NAV STYLE INJECTION
   ============================================================ */
(function injectActiveStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active { color: white; }
    .nav-link.active::after { transform: scaleX(1); background: var(--yellow); }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   16. MUSICAL NOTE CLICK SPAWNER
   ============================================================ */
(function initNoteSpawner() {
  const notes = ['♪', '♫', '♩', '♬', '♭', '♮', '🎵', '🎶'];
  document.addEventListener('click', (e) => {
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('select')) return;

    const note = document.createElement('span');
    const noteChar = notes[Math.floor(Math.random() * notes.length)];
    const color = Math.random() > 0.5 ? '#1A3A6C' : '#D4AF37';

    note.textContent = noteChar;
    note.style.cssText = `
      position:fixed; left:${e.clientX}px; top:${e.clientY}px;
      color:${color}; font-size:1.5rem; pointer-events:none;
      z-index:9990; animation:noteFloat 1.2s ease-out forwards;
      transform:translateX(-50%);
    `;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 1200);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes noteFloat {
      0% { transform:translateX(-50%) translateY(0) scale(0.5); opacity:1; }
      100% { transform:translateX(-50%) translateY(-80px) scale(1.3); opacity:0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   17. HERO LOGO ANIMATION ON LOAD
   ============================================================ */
(function initLogoAnimation() {
  const logo = document.getElementById('navLogo');
  if (!logo) return;
  logo.addEventListener('mouseenter', () => {
    logo.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    logo.style.transform = 'scale(1.08) rotate(-2deg)';
  });
  logo.addEventListener('mouseleave', () => {
    logo.style.transform = '';
  });
})();

console.log('%c🎵 UNIVERSO MUSICAL', 'color:#1A3A6C; font-size:2rem; font-weight:bold;');
console.log('%cDonde la música cobra vida.', 'color:#D4AF37; font-size:1rem;');
