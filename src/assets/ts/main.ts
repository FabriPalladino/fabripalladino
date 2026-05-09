import { initDarkMode } from "./dark-mode";
import { initScrollReveal } from "./scroll-reveal";
import { initFonts } from "./fonts";
import { initMobileMenu } from "./mobile-menu";

initDarkMode();
initFonts();

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initMobileMenu();
});
