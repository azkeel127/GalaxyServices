// Animación de aparición al hacer scroll usando IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    threshold: 0.15,
  };

  const revealOnIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnIntersect, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // Navegación suave para enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Opcional: actualizar el hash en URL sin salto brusco
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
});
