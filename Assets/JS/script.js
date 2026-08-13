/* ========== Loader ========== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

/* ========== AOS Animations ========== */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
  });
}

/* ========== Theme Toggle (Local Storage) ========== */
(function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const storageKey = 'portfolio-theme';

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();

/* ========== Smooth Scroll ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ========== Particle Background ========== */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
      ctx.fill();
    }
  }

  const count = Math.min(Math.floor((w * h) / 12000), 120);
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ========== Typing Animation ========== */
(function initTyping() {
  const titles = ['Web Developer', 'PHP / Laravel Developer', 'WordPress Developer', 'Frontend Developer'];
  const el = document.getElementById('typedText');
  if (!el) return;
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = titles[titleIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  type();
})();

/* ========== Sticky Navbar ========== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ========== Mobile Menu Toggle ========== */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

/* ========== Active Nav Link on Scroll ========== */
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}
window.addEventListener('scroll', highlightNav);

/* ========== Scroll Reveal ========== */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

/* ========== Animated Skill Bars ========== */
const skillCards = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(bar => skillObserver.observe(bar));

/* ========== Counter Animation ========== */
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      let count = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        entry.target.textContent = count;
      }, 40);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ========== Portfolio Filter ========== */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
})();

/* ========== Testimonials Slider ========== */
(function initTestimonialsSlider() {
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.testimonial-card');
  let currentIndex = 0;
  let autoTimer;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to review ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  function startAutoPlay() {
    autoTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoTimer);
    startAutoPlay();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); resetAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); resetAutoPlay(); });

  startAutoPlay();
})();

/* ========== Back to Top ========== */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ========== Contact Form ========== */
(function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const formNext = document.getElementById('formNext');
  const FORM_EMAIL = 'meharaliraza207333@gmail.com';

  if (formNext) {
    const returnUrl = `${window.location.origin}${window.location.pathname}?sent=1#contact`;
    formNext.value = returnUrl;
  }

  if (new URLSearchParams(window.location.search).get('sent') === '1') {
    if (formStatus) {
      formStatus.textContent = 'Thank you! Your message was sent successfully.';
      formStatus.className = 'form-status success';
    }
    history.replaceState(null, '', `${window.location.pathname}#contact`);
  }

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }
    if (formStatus) {
      formStatus.textContent = 'Sending your message...';
      formStatus.className = 'form-status';
    }
  });
})();

/* ========== Skills Tabs Switching ========== */
(function initSkillsTabs() {
  const tabs = document.querySelectorAll('.skill-tab');
  const panels = document.querySelectorAll('.skills-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update active tab button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update visible tab panel
      panels.forEach(panel => {
        if (panel.getAttribute('id') === `tab-${target}`) {
          panel.classList.add('active');
          // Re-trigger progress bar animations inside the active panel
          const progresses = panel.querySelectorAll('.skill-progress');
          progresses.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = '0%';
            setTimeout(() => {
              progress.style.width = width + '%';
            }, 50);
          });
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
})();

/* ========== Mobile Sticky Contact Bar Scroll Logic ========== */
(function initMobileStickyBar() {
  const bar = document.getElementById('mobileStickyBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
      if (window.scrollY > 300) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    } else {
      bar.classList.remove('visible');
    }
  });
})();

/* ========== WhatsApp Chat Widget Logic ========== */
(function initWhatsAppWidget() {
  const toggleBtn = document.getElementById('waToggleBtn');
  const widget = document.getElementById('waChatWidget');
  const closeBtn = document.getElementById('waChatClose');
  const sendBtn = document.getElementById('waChatSend');
  const input = document.getElementById('waChatInput');

  if (!toggleBtn || !widget) return;

  toggleBtn.addEventListener('click', () => {
    widget.classList.toggle('active');
    const badge = toggleBtn.querySelector('.whatsapp-badge');
    if (badge) badge.style.display = 'none';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      widget.classList.remove('active');
    });
  }

  function sendMsg() {
    const text = input.value.trim();
    const phone = '923281132589';
    let url = `https://wa.me/${phone}`;
    if (text) {
      url += `?text=${encodeURIComponent(text)}`;
    } else {
      url += `?text=${encodeURIComponent("Hello! I visited your portfolio and I'm interested in working with you.")}`;
    }
    window.open(url, '_blank');
    input.value = '';
    widget.classList.remove('active');
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMsg);
  }

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMsg();
      }
    });
  }
})();

