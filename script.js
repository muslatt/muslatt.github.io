/**
 * Alex Morgan Portfolio - Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initProjectFiltersAndModals();
  initHeroCardTilt();
  initContactForm();
  initCopyEmail();
  initMobileMenu();
  initScrollSpyAndToTop();
  initResumeDownload();
});

/* -------------------------------------------------------------------
   1. Theme Toggle (Dark / Light) with LocalStorage
   ------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeToggle, currentTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(themeToggle, newTheme);
    showToast(`Switched to ${newTheme} theme 🌓`);
  });
}

function updateThemeIcon(button, theme) {
  const icon = button.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-moon';
  } else {
    icon.className = 'fa-solid fa-sun';
  }
}

/* -------------------------------------------------------------------
   2. Typing Effect in Hero Section
   ------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingElement');
  if (!typingElement) return;

  const phrases = [
    'Tailwind & Bootstrap UIs',
    'Responsive Front-End Sites',
    'AI-Assisted Web Projects',
    'School & Web Applications'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at complete word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 450;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* -------------------------------------------------------------------
   3. Interactive 3D Card Tilt Effect
   ------------------------------------------------------------------- */
function initHeroCardTilt() {
  const card = document.getElementById('heroCard');
  if (!card) return;

  // Only run tilt on devices that support hover/pointers
  if (window.matchMedia('(hover: hover)').matches) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }
}

/* -------------------------------------------------------------------
   4. Project Filters & Detailed Modal Viewer
   ------------------------------------------------------------------- */
const projectData = {
  1: {
    title: 'DevPulse - Real-time Developer Analytics Dashboard',
    category: 'Full Stack Web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Chart.js', 'GitHub REST API'],
    description: 'DevPulse aggregates GitHub metrics, PR turnaround velocity, commit frequency, and automated test coverage across engineering teams into unified visual charts.',
    features: [
      "Built responsive layout using Tailwind CSS",
      "Designed clean navigation using Bootstrap components",
      "Utilized AI assistance to speed up code creation"
    ],
    github: "https://github.com/muslatt/miguelportfolio",
    demo: "https://github.com/muslatt/miguelportfolio"
  },
  2: {
    title: 'NeuroDoc - AI Technical Documentation Assistant',
    category: 'AI / Machine Learning',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    tags: ['Python', 'FastAPI', 'LangChain', 'OpenAI / Gemini API', 'ChromaDB', 'React'],
    description: 'An intelligent retrieval-augmented generation (RAG) assistant designed for software engineering teams to parse repositories and API documentations in seconds.',
    features: [
      'Built vector search pipeline with ChromaDB and semantic embeddings to index markdown and code files.',
      'Implemented FastAPI backend with asynchronous streaming responses for near-zero perceived latency.',
      'Integrated markdown code block syntax highlighting with copy-to-clipboard functionality.',
      'Configured evaluation metrics to verify answer relevance and eliminate hallucinations.'
    ],
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  3: {
    title: 'CollabSpace - Realtime Collaborative Kanban',
    category: 'Full Stack Web App',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80',
    tags: ['TypeScript', 'Next.js', 'Socket.io', 'Node.js', 'TailwindCSS', 'Redis'],
    description: 'A slick, agile project workspace enabling distributed teams to organize sprints, assign story points, and collaborate with sub-second drag-and-drop state syncing.',
    features: [
      'Real-time multi-user cursor presence and live card updates using WebSockets & Redis Pub/Sub.',
      'Drag-and-drop task reordering with optimistic UI updates and conflict resolution.',
      'Role-based access control (Admin, Member, Guest) with JWT authentication.',
      'Automated dark mode theme support and keyboard accessibility shortcuts.'
    ],
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  4: {
    title: 'QuickScaffold - Interactive Project Generator CLI',
    category: 'Developer Tools',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    tags: ['Node.js', 'JavaScript', 'Commander.js', 'Inquirer.js', 'npm', 'ESLint'],
    description: 'A modular, high-speed CLI tool published to npm that helps engineers generate robust boilerplate structures for modern full-stack web and API projects.',
    features: [
      'Interactive CLI prompts to customize framework, testing suite, and CI/CD pipelines in seconds.',
      'Built-in validation, automated git repository initialization, and initial commit creation.',
      'Downloaded over 2,500+ times by fellow student developers and open source contributors.'
    ],
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  5: {
    title: 'VisionGuard - Edge Object Detection & Alerting',
    category: 'AI & Computer Vision',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1000&auto=format&fit=crop&q=80',
    tags: ['Python', 'OpenCV', 'PyTorch', 'YOLOv8', 'Flask', 'WebRTC'],
    description: 'Edge-compatible computer vision security system capable of detecting anomalies and objects across multiple live camera streams with instant alerts.',
    features: [
      'Trained and fine-tuned custom YOLOv8 model weights achieving 94.8% mAP on custom datasets.',
      'Built Flask REST API with WebRTC video streaming support.',
      'Won Best Hardware / Edge AI project at collegiate hackathon.'
    ],
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  6: {
    title: 'CryptoTrace - Market Intel & Portfolio Tracker',
    category: 'FinTech Web App',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1000&auto=format&fit=crop&q=80',
    tags: ['React', 'Redux Toolkit', 'CoinGecko REST API', 'Chart.js', 'CSS Grid'],
    description: 'Modern financial web platform providing live cryptocurrency price tracking, interactive historical charts, market sentiment metrics, and portfolio tracking.',
    features: [
      'Sub-minute polling for live market quotes with local caching to preserve API rate limits.',
      'Interactive historical time-range filters (24H, 7D, 30D, 1Y) with custom tooltip overlays.',
      'Simulated paper-trading portfolio ledger with live P&L percentage calculators.'
    ],
    github: 'https://github.com',
    demo: 'https://example.com'
  }
};

function initProjectFiltersAndModals() {
  // Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Setup
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalButtons = document.querySelectorAll('.view-details-btn, .modal-trigger-btn');

  function openModal(projectId) {
    const proj = projectData[projectId];
    if (!proj || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <img src="${proj.image}" alt="${proj.title}" class="modal-proj-img" />
      <span class="project-tag-badge">${proj.category}</span>
      <h2 class="modal-proj-title">${proj.title}</h2>
      
      <div class="project-tags" style="margin-bottom: 16px;">
        ${proj.tags.map(t => `<span class="badge">${t}</span>`).join('')}
      </div>

      <p class="project-desc">${proj.description}</p>

      <h4 style="font-family: var(--font-heading); margin-top: 18px; font-size: 1.1rem;">Key Highlights & Architecture:</h4>
      <ul class="modal-features">
        ${proj.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <div class="modal-actions">
        <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
        </a>
        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          <i class="fa-brands fa-github"></i> View GitHub Code
        </a>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      openModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------
   5. Interactive Contact Form with Validation & Feedback
   ------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const subjectInput = document.getElementById('subjectInput');
  const messageInput = document.getElementById('messageInput');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset previous errors
    form.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      subjectInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) {
      showToast('⚠️ Please check the form errors before submitting.');
      return;
    }

    // Simulate sending message
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>`;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      showToast('🎉 Message sent successfully! Alex will get back to you shortly.');
    }, 1200);
  });
}

/* -------------------------------------------------------------------
   6. Copy Email to Clipboard
   ------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-email');
    if (navigator.clipboard && email) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('📋 Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    } else {
      showToast('Email: ' + email);
    }
  });
}

/* -------------------------------------------------------------------
   7. Mobile Navigation Menu Toggle
   ------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .resume-btn');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------------------------------------------------------
   8. Scroll Spy & Scroll-to-Top Button
   ------------------------------------------------------------------- */
function initScrollSpyAndToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Toggle Scroll to Top Button
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Scroll Spy for Nav Links
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* -------------------------------------------------------------------
   9. Resume Download Trigger
   ------------------------------------------------------------------- */
function initResumeDownload() {
  const downloadBtn = document.getElementById('downloadCvBtn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    showToast('📄 Resume downloaded (Sample placeholder). Link your real PDF here!');
  });
}

/* -------------------------------------------------------------------
   10. Toast Notification System
   ------------------------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
