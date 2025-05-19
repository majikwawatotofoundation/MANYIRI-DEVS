document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('slide-up')) {
          entry.target.classList.add('scrolled');
        } else if (entry.target.classList.contains('from-left')) {
          entry.target.classList.add('slide-left');
        } else if (entry.target.classList.contains('from-right')) {
          entry.target.classList.add('slide-right');
        } else if (entry.target.classList.contains('go-up')) {
          entry.target.classList.add('fade-scale-up');
        } else if (entry.target.classList.contains('rotate-in')) {
          entry.target.classList.add('rotate-in');
        } else if (entry.target.classList.contains('bounce-in')) {
          entry.target.classList.add('bounce-in');
        } else if (entry.target.classList.contains('flip-in')) {
          entry.target.classList.add('flip-in');
        } else if (entry.target.classList.contains('zoom-in')) {
          entry.target.classList.add('zoom-in');
        } else if (entry.target.classList.contains('swing-in')) {
          entry.target.classList.add('swing-in');
        } else if (entry.target.classList.contains('spiral-in')) {
          entry.target.classList.add('spiral-in');
        }
        observer.unobserve(entry.target);
      }
    }
  });

  const elementsToAnimate = document.querySelectorAll('.animated');
  for (let i = 0; i < elementsToAnimate.length; i++) {
    observer.observe(elementsToAnimate[i]);
    console.log(`Observing element at index ${i}`);
  }
});