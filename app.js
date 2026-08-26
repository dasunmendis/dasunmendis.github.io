/**
 * Dasun Mendis Portfolio - Interactive Application Logic
 * Clean Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Dynamic Typewriter Effect for Hero Section
  // -------------------------------------------------------------------------
  const typedRoleElement = document.getElementById('typed-role');
  if (typedRoleElement) {
    const roles = [
      'Lead Developer',
      'Software Consultant (.NET)',
      '.NET Core Solutions Architect',
      'Full-Stack Engineer',
      'Clean Code Advocate'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        // Move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Start typing
    setTimeout(typeEffect, 600);
  }

  // -------------------------------------------------------------------------
  // 2. Header Scroll Effect & Scrollspy
  // -------------------------------------------------------------------------
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active link highlighting (Scrollspy)
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer Toggle
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const toggleIcon = document.getElementById('toggle-icon');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded.toString());

      if (toggleIcon) {
        if (isExpanded) {
          toggleIcon.classList.remove('fa-bars');
          toggleIcon.classList.add('fa-xmark');
        } else {
          toggleIcon.classList.remove('fa-xmark');
          toggleIcon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking a navigation link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          if (toggleIcon) {
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
          }
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (toggleIcon) {
          toggleIcon.classList.remove('fa-xmark');
          toggleIcon.classList.add('fa-bars');
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // 4. Project Category Filtering
  // -------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Active button styling
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category') || '';
          
          if (filterValue === 'all' || cardCategory.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. Project Details Modal Manager
  // -------------------------------------------------------------------------
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  const closeModalButtons = document.querySelectorAll('.close-modal-btn');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
      targetModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      if (modalId) {
        openModal(modalId);
      }
    });
  });

  closeModalButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close when clicking modal backdrop
  modalOverlays.forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });

  // -------------------------------------------------------------------------
  // 6. Stats Counter Animation on Scroll
  // -------------------------------------------------------------------------
  const statsBar = document.getElementById('stats-bar');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  if (statsBar && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;

            statNumbers.forEach((stat) => {
              const target = parseInt(stat.getAttribute('data-target') || '0', 10);
              const suffix = stat.textContent.replace(/[0-9]/g, '');
              let count = 0;
              const duration = 1500;
              const increment = Math.max(1, Math.ceil(target / (duration / 30)));

              const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                  stat.textContent = target + suffix;
                  clearInterval(timer);
                } else {
                  stat.textContent = count + suffix;
                }
              }, 30);
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    statsObserver.observe(statsBar);
  }

  // -------------------------------------------------------------------------
  // 7. Contact Form Validation & Handler
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !subject || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please complete all required fields before sending.';
        return;
      }

      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      // Indicate loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Preparing Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      }

      // Generate mailto link as direct communication fallback
      const mailtoUrl = `mailto:dasunmendis@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your message has been prepared.<br>
          <a href="${mailtoUrl}" class="btn btn-outline btn-sm" style="margin-top: 0.75rem; display: inline-flex;">
            <i class="fa-solid fa-envelope-open-text"></i> Open in Email Client
          </a>
        `;

        // Automatically trigger mailto link
        window.location.href = mailtoUrl;

        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
        }
      }, 600);
    });
  }

  // -------------------------------------------------------------------------
  // 8. Smooth Scroll for Internal Anchor Links
  // -------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
