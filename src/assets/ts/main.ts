import { initDarkMode } from "./dark-mode";
import { initScrollReveal } from "./scroll-reveal";
import { initFonts } from "./fonts";

initDarkMode();
initFonts();

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
});
