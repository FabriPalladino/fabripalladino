export function initMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>(".header__menu-toggle");
  const drawer = document.querySelector<HTMLElement>("#header-drawer");
  const closeBtn = drawer?.querySelector<HTMLButtonElement>(".header__drawer-close");
  const backdrop = document.querySelector<HTMLElement>(".header__backdrop");

  if (!toggle || !drawer || !closeBtn || !backdrop) return;

  // Selectively inert when drawer is open: everything user-interactive
  // EXCEPT .header__actions (theme toggle + hamburger button) and the
  // drawer itself. This keeps the visible header controls usable.
  const inertSelectors = [
    ".skip-link",
    ".header__logo",
    ".header__nav",
    "#main",
    ".footer",
  ];
  const inertTargets = inertSelectors
    .map((sel) => document.querySelector<HTMLElement>(sel))
    .filter((el): el is HTMLElement => el !== null);

  let isOpen = false;

  function preventTouchMove(e: TouchEvent): void {
    if (!isOpen) return;
    if (drawer!.contains(e.target as Node)) return;
    e.preventDefault();
  }

  function open(): void {
    if (isOpen) return;
    isOpen = true;
    drawer!.removeAttribute("inert");
    drawer!.dataset.open = "true";
    backdrop!.removeAttribute("hidden");
    toggle!.setAttribute("aria-expanded", "true");
    toggle!.setAttribute("aria-label", "Close menu");
    inertTargets.forEach((el) => el.setAttribute("inert", ""));
    document.documentElement.classList.add("scroll-locked");
    document.addEventListener("touchmove", preventTouchMove, { passive: false });
    requestAnimationFrame(() => closeBtn!.focus());
  }

  function close(): void {
    if (!isOpen) return;
    isOpen = false;
    drawer!.setAttribute("inert", "");
    delete drawer!.dataset.open;
    backdrop!.setAttribute("hidden", "");
    toggle!.setAttribute("aria-expanded", "false");
    toggle!.setAttribute("aria-label", "Menu");
    inertTargets.forEach((el) => el.removeAttribute("inert"));
    document.documentElement.classList.remove("scroll-locked");
    document.removeEventListener("touchmove", preventTouchMove);
    requestAnimationFrame(() => toggle!.focus());
  }

  toggle.addEventListener("click", () => {
    if (isOpen) close();
    else open();
  });
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) close();
  });

  // Focus trap inside drawer
  drawer.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !isOpen) return;

    const focusable = drawer!.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Close drawer if viewport widens past mobile breakpoint
  const mq = window.matchMedia("(min-width: 600px)");
  mq.addEventListener("change", (e) => {
    if (e.matches && isOpen) close();
  });
}
