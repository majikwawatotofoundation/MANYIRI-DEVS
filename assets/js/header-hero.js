//EXAMPLE OF ACKNOWLEGMENT IN ALL OUR WEBSITES
// header-hero.js
// Manyiri Developers Custom Scripts
// Using Swiper.js (MIT License) - https://swiperjs.com/
// Using Lightbox (MIT License) - https://lokeshdhakar.com/projects/lightbox2/
document.addEventListener('DOMContentLoaded', () => {
  
  // Navbar Background Observer
  const navbarObserver = new IntersectionObserver((entries) => {
    const navbarBg = document.getElementById('navbar-bg');
    const navbarCollapse = document.querySelector('.navbar-collapse')
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarBrand = document.getElementById ('brand');
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Welcome-message out of view: 
        navbarBg.classList.add('onscrolldown');
         navLinks.forEach(link => {
        link.classList.add('onscrolldown');
        });
        // NavLinks.classList.add('onscrolldown');
        navbarBrand.classList.add('onscrolldown');
        navbarCollapse.classList.add('onscrolldown');
      
      } else {
        // Welcome-message in view: 
        navbarBg.classList.remove('onscrolldown');
        navLinks.forEach(link => {
        link.classList.remove('onscrolldown');
        });
        navbarBrand.classList.remove('onscrolldown');
        navbarCollapse.classList.remove('onscrolldown');
      }
    });
  }, { threshold: 0.1, // Trigger when 10% of .container is visible
        // rootMargin: '0px 0px -90% 0px' 
        // Adjust to trigger earlier

  });

  const welcome = document.getElementById('welcome-message');
  navbarObserver.observe(welcome);




});


//CLICKING OUTSIDE THE NAVBAR CLOSES IT. LEARN THIS TO HELP YOU IN MTWAPA BOOKSHOP
document.addEventListener('click', function (event) {
  const navbarCollapsed = document.querySelector('.navbar-collapse');
  const isNavbarOpen = navbarCollapsed.classList.contains('show');
  const isClickInsideNavbar = navbarCollapsed.contains(event.target) || event.target.classList.contains('navbar-toggler');

  if (isNavbarOpen && !isClickInsideNavbar) {
    // Remove the 'show' class to collapse the navbar
    bootstrap.Collapse.getInstance(navbarCollapsed)?.hide();
  }
});

//swiper.js



