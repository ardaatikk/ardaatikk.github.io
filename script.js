const ROOT = document.body.dataset.root || ".";
const GITHUB_USER = "ardaatikk";
const LINKEDIN_URL = "https://www.linkedin.com/in/arda-atik/";
const path = p => `${ROOT}/${p}`.replace("././", "./");

function getLanguage() {
  const saved = localStorage.getItem("portfolio-language");
  if (saved === "tr" || saved === "en") return saved;
  return (navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en";
}
let currentLanguage = getLanguage();
const t = key => translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;

function renderHeader() {
  const host = document.getElementById("site-header");
  if (!host) return;
  host.innerHTML = `
    <div class="site-header">
      <nav class="navbar">
        <a class="logo" href="${path("index.html")}">ARDA ATİK</a>
        <div class="nav-right">
          <div class="nav-links">
            <a href="${path("pages/about.html")}" data-i18n="nav_about"></a>
            <a href="${path("pages/experience.html")}" data-i18n="nav_experience"></a>
            <a href="${path("pages/projects.html")}" data-i18n="nav_projects"></a>
            <a href="${path("pages/skills.html")}" data-i18n="nav_skills"></a>
            <a href="${path("pages/contact.html")}" data-i18n="nav_contact"></a>
          </div>
          <button class="language-toggle" type="button" data-lang="${currentLanguage}">
            <span class="lang-tr">TR</span>
            <span class="lang-en">EN</span>
          </button>
        </div>
      </nav>
    </div>`;
}

function renderFooter() {
  const host = document.getElementById("site-footer");
  if (!host) return;
  host.innerHTML = `
    <footer class="site-footer">
      <div class="shell footer-inner">
        <span data-i18n="footer"></span>
        <div class="footer-links">
          <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">GitHub</a>
          <a href="${LINKEDIN_URL}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </footer>`;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const label = t(el.dataset.i18nAria);
    el.setAttribute("aria-label", label);
    el.title = label;
  });
  const toggle = document.querySelector(".language-toggle");
  if (toggle) {
    toggle.dataset.lang = currentLanguage;
    const next = currentLanguage === "en" ? "Turkish" : "İngilizce";
    toggle.setAttribute("aria-label", currentLanguage === "en" ? "Switch to Turkish" : "İngilizceye geç");
    toggle.title = currentLanguage === "en" ? "Switch to Turkish" : "İngilizceye geç";
  }
  const top = document.getElementById("back-to-top");
  if (top) top.setAttribute("aria-label", t("back_top"));
  renderProjects();
  renderProjectDetail();
}

function initLanguageToggle() {
  document.addEventListener("click", e => {
    const toggle = e.target.closest(".language-toggle");
    if (!toggle) return;
    currentLanguage = currentLanguage === "tr" ? "en" : "tr";
    localStorage.setItem("portfolio-language", currentLanguage);
    applyTranslations();
  });
}

function renderBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  button.className = "back-to-top";
  button.type = "button";
  button.textContent = "↑";
  button.setAttribute("aria-label", t("back_top"));

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const SHOW_AFTER = 220;
  let framePending = false;

  const updateVisibility = () => {
    framePending = false;
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    button.classList.toggle("visible", y >= SHOW_AFTER);
  };

  const requestVisibilityUpdate = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateVisibility);
  };

  window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });
  window.addEventListener("resize", requestVisibilityUpdate, { passive: true });
  updateVisibility();
}

function projectUrl(project) {
  return `${path("pages/project.html")}?id=${encodeURIComponent(project.id)}`;
}
function githubUrl(project) {
  return `https://github.com/${GITHUB_USER}/${project.repo}`;
}
function projectCard(project) {
  const desc = project.description[currentLanguage] || project.description.en;
  return `
    <article class="project-card" tabindex="0" role="link"
      data-url="${projectUrl(project)}" aria-label="${project.title}">
      <div>
        <p class="project-kicker">${t("project_label")}</p>
        <h3>${project.title}</h3>
        <p class="project-desc">${desc}</p>
      </div>
      <div>
        <div class="tags">${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join("")}</div>
        <span class="project-open">${t("read_more")}</span>
      </div>
    </article>`;
}
function renderProjects() {
  const sorted = [...projects].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  const featured = document.getElementById("featured-projects");
  const all = document.getElementById("all-projects");
  if (featured) featured.innerHTML = sorted.filter(p => p.featured).map(projectCard).join("");
  if (all) all.innerHTML = sorted.map(projectCard).join("");
}

function initProjectCards() {
  document.addEventListener("click", e => {
    const card = e.target.closest(".project-card");
    if (card) location.href = card.dataset.url;
  });
  document.addEventListener("keydown", e => {
    const card = e.target.closest?.(".project-card");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      location.href = card.dataset.url;
    }
  });
}

function initProjectTilt() {
  if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.addEventListener("pointermove", e => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    card.style.setProperty("--spot-x", `${x * 100}%`);
    card.style.setProperty("--spot-y", `${y * 100}%`);
    card.style.setProperty("--tilt-y", `${(x - .5) * 8}deg`);
    card.style.setProperty("--tilt-x", `${(.5 - y) * 8}deg`);
  }, { passive: true });

  document.addEventListener("pointerout", e => {
    const card = e.target.closest(".project-card");
    if (!card || card.contains(e.relatedTarget)) return;
    card.style.setProperty("--spot-x", "50%");
    card.style.setProperty("--spot-y", "50%");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.classList.remove("is-pressed");
  });

  document.addEventListener("pointerdown", e => {
    const card = e.target.closest(".project-card");
    if (card) card.classList.add("is-pressed");
  });
  window.addEventListener("pointerup", () => {
    document.querySelectorAll(".project-card.is-pressed").forEach(c => c.classList.remove("is-pressed"));
  });
}


/* =========================================================
   ANIMATED GRID / LIST VIEW
   ========================================================= */

let projectViewTransitioning = false;

function updateProjectViewButtons(view) {
  document.querySelectorAll("[data-project-view]").forEach(button => {
    const active = button.dataset.projectView === view;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}


function setProjectView(view, persist = true, animate = true) {
  const grid = document.getElementById("all-projects");

  if (!grid) return;


  const nextView = view === "list" ? "list" : "grid";
  const currentView = grid.dataset.view === "list" ? "list" : "grid";


  /*
   * Initial page load:
   * Don't animate because there is nothing to transition from.
   */
  if (!animate) {
    grid.dataset.view = nextView;

    updateProjectViewButtons(nextView);

    if (persist) {
      localStorage.setItem("portfolio-project-view", nextView);
    }

    return;
  }


  /*
   * Ignore clicks on the already selected view.
   */
  if (currentView === nextView) {
    return;
  }


  /*
   * Prevent overlapping transitions if the user
   * rapidly clicks Grid / List.
   */
  if (projectViewTransitioning) {
    return;
  }

  projectViewTransitioning = true;


  /*
   * Move the toggle indicator immediately.
   *
   * The CSS sliding pill will start moving while
   * the project cards begin their exit animation.
   */
  updateProjectViewButtons(nextView);


  /*
   * STEP 1
   *
   * Fade and slightly compress the current cards.
   */
  grid.classList.remove("view-changing-in");

  grid.classList.add("view-changing-out");


  /*
   * STEP 2
   *
   * Once the cards are almost invisible,
   * change the actual layout.
   */
  window.setTimeout(() => {

    grid.dataset.view = nextView;

    grid.classList.remove("view-changing-out");

    grid.classList.add("view-changing-in");


    /*
     * Force the browser to calculate the new layout
     * before starting the entrance animation.
     */
    void grid.offsetHeight;


    /*
     * STEP 3
     *
     * On the next animation frame remove the
     * entrance state.
     *
     * Cards smoothly settle into their new positions.
     */
    window.requestAnimationFrame(() => {

      window.requestAnimationFrame(() => {

        grid.classList.remove("view-changing-in");

      });

    });


    /*
     * Save preference.
     */
    if (persist) {
      localStorage.setItem(
        "portfolio-project-view",
        nextView
      );
    }


    /*
     * Unlock the toggle after the animation finishes.
     */
    window.setTimeout(() => {

      projectViewTransitioning = false;

    }, 330);


  }, 210);
}


function initProjectViewToggle() {
  const grid = document.getElementById("all-projects");

  if (!grid) return;


  /*
   * Restore the user's previous preference.
   */
  const saved = localStorage.getItem(
    "portfolio-project-view"
  );


  const initialView =
    saved === "list"
      ? "list"
      : "grid";


  /*
   * Initial load should not animate.
   */
  setProjectView(
    initialView,
    false,
    false
  );


  /*
   * Grid / List controls.
   */
  document.addEventListener("click", event => {

    const button =
      event.target.closest("[data-project-view]");


    if (!button) return;


    const requestedView =
      button.dataset.projectView;


    setProjectView(
      requestedView,
      true,
      true
    );

  });
}

let detailToken = 0;
async function renderProjectDetail() {
  const target = document.getElementById("project-detail");
  if (!target) return;
  const token = ++detailToken;
  const id = new URLSearchParams(location.search).get("id");
  const project = projects.find(p => p.id === id);
  if (!project) {
    target.innerHTML = `<h1 class="page-title">Project not found.</h1>`;
    return;
  }

  document.title = `${project.title} | Arda Atik`;
  target.innerHTML = `
    <header class="project-header">
      <p class="eyebrow">${t("project_label")}</p>
      <h1 class="page-title">${project.title}</h1>
      <p class="page-intro">${project.description[currentLanguage] || project.description.en}</p>
      <div class="tags">${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join("")}</div>
      <div class="actions">
        <a class="button primary" href="${githubUrl(project)}" target="_blank" rel="noopener">${t("view_github")}</a>
      </div>
    </header>
    <section class="readme-shell"><div class="status">${t("loading_readme")}</div></section>
    <div class="page-end">
      <a class="back-link" style="margin:0" href="${path("pages/projects.html")}">${t("back_projects")}</a>
      <span>${t("page_end")}</span>
    </div>`;

  const shell = target.querySelector(".readme-shell");
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${project.repo}/readme`, {
      headers: { Accept: "application/vnd.github.raw+json" }
    });
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    const markdown = await response.text();
    if (token !== detailToken) return;

    shell.innerHTML = `<article class="markdown-body">${marked.parse(markdown)}</article>`;
    const body = shell.querySelector(".markdown-body");
    const raw = `https://raw.githubusercontent.com/${GITHUB_USER}/${project.repo}/HEAD/`;
    const blob = `https://github.com/${GITHUB_USER}/${project.repo}/blob/HEAD/`;

    body.querySelectorAll("img").forEach(img => {
      const src = img.getAttribute("src");
      if (src && !/^https?:\/\//i.test(src) && !src.startsWith("data:") && !src.startsWith("blob:")) {
        img.src = raw + src.replace(/^\.?\//, "");
      }
      img.loading = "lazy";
      img.decoding = "async";
    });

    body.querySelectorAll("a").forEach(a => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (!/^https?:\/\//i.test(href) && !href.startsWith("mailto:")) {
        a.href = blob + href.replace(/^\.?\//, "");
      }
      if (/^https?:\/\//i.test(a.href)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
    });
  } catch (error) {
    if (token !== detailToken) return;
    shell.innerHTML = `
      <div class="status">
        <h2>${t("readme_failed")}</h2>
        <p>${t("readme_hint")}</p>
        <p style="margin-top:18px">
          <a class="section-link" href="${githubUrl(project)}" target="_blank" rel="noopener">${t("view_github")}</a>
        </p>
      </div>`;
  }
}

function initAmbient() {
  const red = document.querySelector(".ambient-one");
  const purple = document.querySelector(".ambient-two");
  const blue = document.querySelector(".ambient-three");
  const white = document.querySelector(".ambient-four");
  const blobs = [red, purple, blue, white];

  if (blobs.some(blob => !blob)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let currentScroll = window.scrollY || 0;
  let targetScroll = currentScroll;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let raf = 0;

  const animate = () => {
    currentScroll += (targetScroll - currentScroll) * 0.085;
    mouseX += (targetMouseX - mouseX) * 0.055;
    mouseY += (targetMouseY - mouseY) * 0.055;

    const s = currentScroll;
    const phase = s / 420;

    /*
      The two primary lights trace opposite sinusoidal paths.
      Red starts right, white starts left; as the page scrolls they cross
      diagonally, separate, then bend back — visually forming an S-like flow.
    */
    const redX = Math.sin(phase) * 165 + s * 0.018 + mouseX * 28;
    const redY = s * 0.095 + Math.sin(phase * 0.72) * 55 + mouseY * 20;

    const whiteX = -Math.sin(phase) * 190 + s * 0.014 - mouseX * 38;
    const whiteY = s * 0.082 - Math.sin(phase * 0.72) * 70 + mouseY * 30;

    red.style.transform =
      `translate3d(${redX}px, ${redY}px, 0)`;

    white.style.transform =
      `translate3d(${whiteX}px, ${whiteY}px, 0)`;

    /* Secondary lights only add distant parallax depth. */
    purple.style.transform =
      `translate3d(${-s * 0.010 - mouseX * 14}px, ${-s * 0.028}px, 0)`;

    blue.style.transform =
      `translate3d(${s * 0.007 + mouseX * 10}px, ${s * 0.022 - mouseY * 12}px, 0)`;

    const moving =
      Math.abs(targetScroll - currentScroll) > 0.12 ||
      Math.abs(targetMouseX - mouseX) > 0.002 ||
      Math.abs(targetMouseY - mouseY) > 0.002;

    raf = moving ? requestAnimationFrame(animate) : 0;
  };

  const requestAnimate = () => {
    if (!raf) raf = requestAnimationFrame(animate);
  };

  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY || document.documentElement.scrollTop || 0;
    requestAnimate();
  }, { passive: true });

  window.addEventListener("pointermove", event => {
    targetMouseX = event.clientX / window.innerWidth - 0.5;
    targetMouseY = event.clientY / window.innerHeight - 0.5;
    requestAnimate();
  }, { passive: true });

  requestAnimate();
}

function init() {
  document.body.classList.add("page-enter");
  renderHeader();
  renderFooter();
  renderBackToTop();
  initLanguageToggle();
  initProjectViewToggle();
  initProjectCards();
  initProjectTilt();
  renderProjects();
  applyTranslations();
  initAmbient();
}
document.addEventListener("DOMContentLoaded", init);
