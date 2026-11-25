document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards = document.querySelectorAll(".feature-card");

  // Scroll-reveal for feature cards (default visible if IntersectionObserver unavailable or reduced motion preferred)
  if (!prefersReducedMotion && "IntersectionObserver" in window && cards.length > 0) {
    cards.forEach((card, index) => {
      card.style.setProperty("--reveal-delay", `${index * 80}ms`);
      card.classList.add("reveal-pending");
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
  }

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
