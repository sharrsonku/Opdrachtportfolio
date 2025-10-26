document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Timeline functionaliteit
  // =========================
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    // Achtergrondafbeelding instellen via data-attribute
    const imgUrl = item.dataset.bg;
    if (imgUrl) item.style.backgroundImage = `url(${imgUrl})`;

    // Toggle uitklappen en scrollen
    item.addEventListener('click', () => {
      // Eerst alle andere items sluiten
      timelineItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('expanded');
        }
      });

      // Huidige item togglen
      item.classList.toggle('expanded');

      // Scrollen zodat het item bovenaan het scherm staat
      item.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
