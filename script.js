// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Intersection Observer for card animations
const observer = new IntersectionObserver(
  (entries) => {
    let visibleIndex = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = visibleIndex * 100;
        visibleIndex++;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.project-card, .contact-card').forEach((card) => {
  observer.observe(card);
});

// Filter tabs
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    filterTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === 'all' || card.dataset.lang === filter) {
        card.classList.remove('hidden');
        if (!card.classList.contains('visible')) {
          card.classList.add('visible');
        }
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
