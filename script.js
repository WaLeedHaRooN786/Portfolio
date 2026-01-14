/**
 * Portfolio - Waleed Haroon
 * Interactive JavaScript functionality
 */

// ========================================
// Mobile Navigation Toggle
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  if (menuToggle && nav) {
    // Toggle navigation menu
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const isExpanded = nav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========================================
  // Smooth Scrolling for Navigation Links
  // ========================================
  
  // Enhanced smooth scrolling with offset for fixed header
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only handle internal links (starting with #)
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Calculate offset for fixed header
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========================================
  // Dynamic Year in Footer
  // ========================================
  
  const yearElement = document.getElementById('year');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }

  // ========================================
  // Add Active State to Navigation
  // ========================================
  
  // Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNavigation = () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
      
      if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.style.backgroundColor = '');
        navLink.style.backgroundColor = 'var(--background)';
        navLink.style.color = 'var(--primary)';
      }
    });
  };

  // Throttle scroll event for performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(highlightNavigation, 100);
  });

  // Initial call
  highlightNavigation();

  // ========================================
  // Header Shadow on Scroll
  // ========================================
  
  const header = document.querySelector('.site-header');
  
  const handleHeaderShadow = () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderShadow);

  // ========================================
  // Contact Form Enhancement
  // ========================================
  
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = contactForm.querySelector('input[type="text"]')?.value;
      const email = contactForm.querySelector('input[type="email"]')?.value;
      const message = contactForm.querySelector('textarea')?.value;
      
      // Show success message
      alert(`Thanks for reaching out, ${name || 'there'}! This is a demo form and doesn't send emails. Please contact me directly at waleedharoon786@gmail.com`);
      
      // Reset form
      contactForm.reset();
    });
  }

  // ========================================
  // Fade-in Animation on Scroll (Optional Enhancement)
  // ========================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for fade-in effect
  const fadeElements = document.querySelectorAll('.card, .skills li');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ========================================
// Console Message (Easter Egg)
// ========================================

console.log('%c👋 Hey there!', 'font-size: 24px; color: #8B5CF6; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 16px; color: #A78BFA;');
console.log('%cFeel free to reach out: waleedharoon786@gmail.com', 'font-size: 14px; color: #1E1B4B;');
