import FontFaceObserver from "fontfaceobserver";

export function initFonts(): void {
  const html = document.documentElement;
  html.classList.add("wf-inactive");

  // Optimization for repeat views
  if (sessionStorage.getItem("foutFontsLoaded")) {
    html.classList.remove("wf-inactive");
    html.classList.add("wf-active");
    return;
  }

  const bodyFont = new FontFaceObserver("xanti-typewriter-variable", {
    weight: 400,
  });

  Promise.all([bodyFont.load()])
    .then(() => {
      html.classList.remove("wf-inactive");
      html.classList.add("wf-active");
      sessionStorage.setItem("foutFontsLoaded", "true");
    })
    .catch(() => {
      html.classList.remove("wf-inactive");
      html.classList.add("wf-inactive");
    });
}
