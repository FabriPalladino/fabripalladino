export function initDarkMode(): void {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");

  // Apply stored preference or system preference
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
  }

  // Listen for system preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        root.setAttribute("data-theme", e.matches ? "dark" : "light");
      }
    });

  // Toggle button
  document.addEventListener("click", (e) => {
    const toggle = (e.target as HTMLElement).closest(".theme-toggle");
    if (!toggle) return;

    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}
