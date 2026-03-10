(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Header elevation on scroll
  const header = $(".site-header");
  const setHeaderShadow = () => {
    if (!header) return;
    header.dataset.shadow = String(window.scrollY > 8);
  };
  setHeaderShadow();
  window.addEventListener("scroll", setHeaderShadow, { passive: true });

  // Mobile nav (class-based)
  const toggleBtn = $(".nav-toggle");
  const navPanel = $("#nav-panel");
  const backdrop = $("[data-backdrop]");

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
  };

  const openNav = () => {
    document.body.classList.add("nav-open");
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
  };

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = document.body.classList.contains("nav-open");
      isOpen ? closeNav() : openNav();
    });
  }

  if (backdrop) backdrop.addEventListener("click", closeNav);

  // Close on link click (mobile)
  $$(".nav-link").forEach((a) => a.addEventListener("click", closeNav));

  // Close with ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  // Reveal on scroll
  const revealEls = $$(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
})();
