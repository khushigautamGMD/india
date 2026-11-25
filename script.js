document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const observeStaggeredGrid = (gridSelector, cardSelector) => {
    const grid = document.querySelector(gridSelector);
    const cards = document.querySelectorAll(cardSelector);

    if (prefersReducedMotion || !("IntersectionObserver" in window) || !grid || cards.length === 0) {
      return;
    }

    const revealCards = () => {
      cards.forEach((card) => {
        card.classList.remove("reveal-pending");
        card.classList.add("reveal-visible");
      });
    };

    cards.forEach((card, index) => {
      card.style.setProperty("--reveal-delay", `${index * 80}ms`);
      card.classList.add("reveal-pending");
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            revealCards();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(grid);
  };

  observeStaggeredGrid(".arenas-grid", ".arena-card");
  observeStaggeredGrid(".features-grid", ".feature-card");

  // Optional conversion tracking hooks (compatible with gtag / fbq when added)
  const ctaButtons = document.querySelectorAll("[data-cta]");
  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const location = btn.getAttribute("data-cta") || "unknown";
      if (typeof window.gtag === "function") {
        window.gtag("event", "join_now_click", { cta_location: location });
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: location });
      }
    });
  });
});
