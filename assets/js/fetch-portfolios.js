// Strict mode (Course: Activating Strict Mode)
'use strict';

// Fetch and populate slides (updated to handle Swiper reinitialization)
const fetchPortfolios = async (category = 'web-development') => {
  const slideContainerIds = {
    'web-development': 'web-development-slides',
    'social-media-management': 'social-media-slides',
    'photography': 'photography-slides'
  };

  try {
    const response = await fetch('assets/json/portfolios.json');
    if (!response.ok) throw new Error('Failed to fetch Manyiri Portfolios');
    const data = await response.json();
    const portfolios = data.portfolios[category] || [];

    // Clear slides for the active tab
    const slidesContainer = document.querySelector(`#${slideContainerIds[category]}`);
    if (!slidesContainer) throw new Error(`Slide container for ${category} not found`);
    slidesContainer.innerHTML = '';

    // Populate slides
    slidesContainer.innerHTML = portfolios
      .map(({ id, title, image, alt, link }) => `
        <div class="swiper-slide">
          <div class="portfolio-item">
            <a href="${image}" class="glightbox" title="${title}">
              <img src="${image}" alt="${alt}" class="img-fluid">
            </a>
            <div class="hover-overlay">
              <h5>${title}</h5>
            </div>
            <div class="portfolio-icons">
              <a href="${image}" class="glightbox" title="Zoom Image">
                <i class="fas fa-search-plus"></i>
              </a>
              <a href="${link}" target="_blank" title="View Project">
                <i class="fas fa-link"></i>
              </a>
            </div>
          </div>
        </div>
      `)
      .join('');

    // Get the slider container
    const sliderContainer = document.querySelector(`#${category} .portfolios-slider`);

    // Destroy existing Swiper if it exists (prevents stale state on tab revisit)
    if (sliderContainer.swiper) {
      sliderContainer.swiper.destroy(true, true);
      sliderContainer.classList.remove('swiper-initialized'); // Reset for CSS hiding
    }

    // Initialize Swiper and Glightbox after images load
    const images = slidesContainer.querySelectorAll('img');
    if (images.length === 0) {
      initSwiper(category);
      initGlightbox();
      return;
    }

    await Promise.all(
      Array.from(images).map(
        img =>
          new Promise(resolve => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          })
      )
    );

    initSwiper(category);
    initGlightbox();
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    const container = document.querySelector(`#${slideContainerIds[category]}`);
    if (container) {
      container.innerHTML = '<p>Error loading portfolios.</p>';
    } else {
      console.error(`No container found for category: ${category}`);
    }
  }
};

// Tab switching (make async to wait for fetch)
const setupTabs = () => {
  const tabs = document.querySelectorAll('[data-tab-target]');
  const tabContents = document.querySelectorAll('[data-tab-content]');
  tabs.forEach(tab => {
    tab.addEventListener('click', async () => {  // Add async here
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tabTarget;
      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === target);
      });
      await fetchPortfolios(target);  // Await to ensure content loads before proceeding
      // No need for manual swiper update here—initSwiper handles it
    });
  });
};

// The rest remains the same (initSwiper, initGlightbox, init)
// Initialize Swiper (Course: Functions)
const initSwiper = (category) => {
  new Swiper(`#${category} .portfolios-slider`, {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
       pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: `#${category} .swiper-button-next`,
      prevEl: `#${category} .swiper-button-prev`,
    },
    pagination: {
      el: `#${category} .swiper-pagination`,
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 4 },
    },
  });
};

// Initialize Glightbox (Course: Functions)
const initGlightbox = () => {
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
  });
};



// Initialize (Course: Functions Calling Other Functions)
const init = () => {
  setupTabs();
  fetchPortfolios();
};
document.addEventListener('DOMContentLoaded', init);