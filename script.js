(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Year in footer
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const btn = $(".nav-btn");
  const scrim = $("[data-scrim]");

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    if (btn) btn.setAttribute("aria-expanded", "false");
  };

  if (btn) {
    btn.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  if (scrim) scrim.addEventListener("click", closeMenu);
  $$(".menu a").forEach((a) => a.addEventListener("click", closeMenu));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Menu is desktop-only above 900px, drop the open state when we cross back
  const wide = window.matchMedia("(min-width: 901px)");
  wide.addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });

  // Reveal on scroll
  const items = $$(".rise");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));

  // Safety net: if the observer never reports anything, show everything anyway
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (document.querySelector(".rise.in")) return;
      items.forEach((el) => el.classList.add("in"));
    }, 1200);
  });
})();
