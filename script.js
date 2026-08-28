/**
 * Alex Morgan Portfolio - Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initProjectFiltersAndModals();
  initCopyEmail();
  initMobileMenu();
  initScrollSpyAndToTop();
  initResumeDownload();
  initCertPdfViewer();
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
   2. Project Filters & Detailed Modal Viewer
   ------------------------------------------------------------------- */
const projectData = {
  1: {
    title: 'Barangay Resident Profiling System',
    category: 'Web Information System',
    tags: ['Blade', 'PHP', 'Tailwind'],
    description: 'A digital information & profiling management system built to streamline barangay resident demographics, household records, and community administrative services.',
    features: [
      'Developed responsive UI components using Blade templates and Tailwind CSS for clean administrative navigation.',
      'Structured resident profiling data tables with fast search, filtering, and record views built on PHP.',
      'Accelerated development speed and rapid prototyping.',
      'Organized modular codebase versioned and hosted on GitHub.'
    ],
    github: 'https://github.com/BustedElbow/newBarangayProfiling',
    demo: 'https://github.com/BustedElbow/newBarangayProfiling'
  },
  2: {
    title: 'Agapay - Patient-Therapist Matching Platform',
    category: 'Capstone / Thesis',
    tags: ['Capstone / Thesis', 'TypeScript', 'JavaScript', 'C#', 'React Native Expo'],
    description: 'Agapay is a cross-platform mobile application designed to bridge the accessibility gap between patients and licensed physical therapists in Davao City.',
    features: [
      'Agapay Mobile & Web Frontend: Built with TypeScript, JavaScript, and React Native Expo for cross-platform patient-therapist matching.',
      'Agapay Core & Backend: Powered by C# for backend business logic, appointments, and user management.',
      'Multi-tier architecture coordinating data communication across mobile app, admin portal, and backend API.',
      'Designed and engineered as a Capstone / Thesis project focusing on healthcare accessibility.'
    ],
    github: 'https://github.com/BustedElbow/agapay-frontend',
    demo: 'https://github.com/BustedElbow/agapay-admin'
  },
  3: {
    title: 'IT13 CRMS - Citizen & Record Management System',
    category: 'Record Management System',
    tags: ['C#'],
    description: 'A centralized institutional record management system designed for organized data entry, record searching, resident clearance tracking, and administrative report generation.',
    features: [
      'Engineered robust management software using C#.',
      'Implemented structured data forms for fast citizen record registration and lookup.',
      'Streamlined component logic and record processing interactions.',
      'Hosted open-source on GitHub for collaborative development.'
    ],
    github: 'https://github.com/DANZPH/IT13CRMS',
    demo: 'https://github.com/DANZPH/IT13CRMS'
  },
  4: {
    title: 'IT15 Real Estate - Property & Listing Portal',
    category: 'Real Estate Web Portal',
    tags: ['HTML', 'C#', 'CSS'],
    description: 'A modern web platform for real estate property browsing, listing search filters, property details showcase, and client inquiry handling.',
    features: [
      'Crafted clean property card grids and detailed listing layouts using HTML, CSS, and C#.',
      'Implemented search & filter UI controls for location, price range, and property category.',
      'Accelerated design and backend integration for rapid deployment.',
      'Full repository published and versioned on GitHub.'
    ],
    github: 'https://github.com/RonVergel/IT15RealEstate',
    demo: 'https://github.com/RonVergel/IT15RealEstate'
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
      <span class="project-tag-badge" style="position: static; display: inline-block; margin-bottom: 12px;">${proj.category}</span>
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
   Certificate PDF Viewer Modal
   ------------------------------------------------------------------- */
function initCertPdfViewer() {
  const certModal = document.getElementById('certPdfModal');
  const certFrame = document.getElementById('certPdfFrame');
  const certTitle = document.getElementById('certModalTitle');
  const certCloseBtn = document.getElementById('certModalClose');
  const certDownload = document.getElementById('certModalDownload');
  const certOpenTab = document.getElementById('certModalOpen');
  const certPreviews = document.querySelectorAll('.cert-preview[data-pdf]');

  if (!certModal || !certFrame || certPreviews.length === 0) return;

  // Modal open/close
  function openCertModal(pdfPath, title) {
    certFrame.src = pdfPath;
    certTitle.textContent = title || 'Certificate';
    certDownload.href = pdfPath;
    certOpenTab.href = pdfPath;

    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    setTimeout(() => {
      certFrame.src = '';
    }, 350);
  }

  certPreviews.forEach(preview => {
    const pdfPath = preview.getAttribute('data-pdf');
    const card = preview.closest('.cert-card');
    const titleEl = card ? card.querySelector('.cert-title') : null;
    const certName = titleEl ? titleEl.textContent : 'Certificate';

    preview.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCertModal(pdfPath, certName);
    });

    preview.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertModal(pdfPath, certName);
      }
    });
  });

  if (certCloseBtn) {
    certCloseBtn.addEventListener('click', closeCertModal);
  }

  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeCertModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('open')) {
      closeCertModal();
    }
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
