// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create sidebar toggle button
  const sidebarToggle = document.createElement('div');
  sidebarToggle.classList.add('sidebar-toggle');
  sidebarToggle.innerHTML = '<i class="ri-menu-line"></i>';
  document.body.appendChild(sidebarToggle);

  // Select elements
  const sidebar = document.querySelector('.sidebar');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');
  const downloadBtn = document.querySelector('.about-btn .btn');

  // Add CV download functionality
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Create a link to your CV file
      const link = document.createElement('a');
      link.href = 'assets/Md Saiful Islam Tuser.pdf'; // Update this path to where your CV is stored
      link.download = 'Md Saiful Islam Tuser.pdf'; // The name that will be used when downloading
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Sidebar toggle functionality
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarToggle.innerHTML = sidebar.classList.contains('active') 
      ? '<i class="ri-close-line"></i>' 
      : '<i class="ri-menu-line"></i>';
  });

  // Typed.js for animating text
  const typed = new Typed('.typed-text', {
    strings: ['Data Enthusiast', 'Aspiring Data Scientist', 'Machine Learning Enthusiast'],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 2000,
    loop: true
  });

  // Scroll animation with ScrollReveal
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false
  });

  sr.reveal('.hero-content', {});
  sr.reveal('.section-header', {});
  sr.reveal('.about-image', { origin: 'left' });
  sr.reveal('.about-content', { origin: 'right' });
  sr.reveal('.service-card', { interval: 100 });
  sr.reveal('.portfolio-card', { interval: 100 });
  sr.reveal('.contact-info', { origin: 'left' });
  sr.reveal('.contact-form', { origin: 'right' });

  // Active menu item based on scroll position
  const activateNavItem = () => {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.querySelector('a').getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNavItem);

  // Smooth scroll for nav links
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetId = item.querySelector('a').getAttribute('href');
      
      if (targetId.startsWith('#')) {
        e.preventDefault();
        
        window.scrollTo({
          top: document.querySelector(targetId).offsetTop,
          behavior: 'smooth'
        });
        
        // Close sidebar on mobile after clicking
        if (window.innerWidth <= 576) {
          sidebar.classList.remove('active');
          sidebarToggle.innerHTML = '<i class="ri-menu-line"></i>';
        }
      }
    });
  });

  // Initialize active menu item on page load
  activateNavItem();
});