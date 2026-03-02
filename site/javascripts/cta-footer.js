(function () {
  const STORAGE_KEYS = {
    navVisible: "cs285-nav-visible",
    tocVisible: "cs285-toc-visible",
  };

  function ensureTrailingSlash(s) {
    return s.endsWith("/") ? s : s + "/";
  }

  function getProjectRootFromPathname() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length > 0) return `/${parts[0]}/`;
    return "/";
  }

  function getSiteRootHref() {
    try {
      if (typeof __md_get === "function") {
        const base = __md_get("__base");
        if (base && typeof base === "string") {
          return ensureTrailingSlash(new URL(base, window.location.origin).href);
        }
      }
    } catch (error) {
      // Fallback below is enough.
    }

    const baseEl = document.querySelector("base[href]");
    if (baseEl && baseEl.href) {
      return ensureTrailingSlash(new URL(".", baseEl.href).href);
    }

    return ensureTrailingSlash(new URL(getProjectRootFromPathname(), window.location.origin).href);
  }

  function url(path) {
    const normalizedPath = String(path || "").replace(/^\/+/, "");
    return new URL(normalizedPath, getSiteRootHref()).href;
  }

  function readBool(key, fallbackValue) {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallbackValue;
    return raw === "1";
  }

  function writeBool(key, value) {
    localStorage.setItem(key, value ? "1" : "0");
  }

  function updateToggleState(button, isVisible) {
    if (!button) return;
    button.setAttribute("aria-pressed", isVisible ? "true" : "false");
    button.classList.toggle("is-active", isVisible);
  }

  function applySidebarState(navVisible, tocVisible) {
    const body = document.body;
    body.classList.toggle("has-nav-collapsed", !navVisible);
    body.classList.toggle("has-toc-collapsed", !tocVisible);

    updateToggleState(document.querySelector(".js-toggle-nav"), navVisible);
    updateToggleState(document.querySelector(".js-toggle-toc"), tocVisible);
  }

  function currentState() {
    return {
      navVisible: readBool(STORAGE_KEYS.navVisible, true),
      tocVisible: readBool(STORAGE_KEYS.tocVisible, true),
    };
  }

  function bindToggles() {
    const navBtn = document.querySelector(".js-toggle-nav");
    const tocBtn = document.querySelector(".js-toggle-toc");
    if (!navBtn || !tocBtn) return;

    navBtn.onclick = function () {
      const state = currentState();
      writeBool(STORAGE_KEYS.navVisible, !state.navVisible);
      applySidebarState(!state.navVisible, state.tocVisible);
    };

    tocBtn.onclick = function () {
      const state = currentState();
      writeBool(STORAGE_KEYS.tocVisible, !state.tocVisible);
      applySidebarState(state.navVisible, !state.tocVisible);
    };
  }

  function addHeaderUtilities() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner) return;

    const old = headerInner.querySelector(".course-header-tools");
    if (old) old.remove();

    const tools = document.createElement("div");
    tools.className = "course-header-tools";
    tools.innerHTML = `
      <span class="course-badge" aria-label="Course badge">CS285 · Discrete Math</span>
      <button class="header-utility-btn js-toggle-nav" type="button" aria-label="Toggle navigation sidebar" aria-pressed="true">Nav</button>
      <button class="header-utility-btn js-toggle-toc" type="button" aria-label="Toggle table of contents sidebar" aria-pressed="true">TOC</button>
      <a class="header-cta" href="${url("report/report/")}" aria-label="Open project report">Open Report</a>
    `;

    headerInner.appendChild(tools);

    const tocExists = !!document.querySelector(".md-sidebar--secondary");
    const tocBtn = tools.querySelector(".js-toggle-toc");
    if (!tocExists && tocBtn) {
      tocBtn.disabled = true;
      tocBtn.setAttribute("aria-label", "No table of contents on this page");
      writeBool(STORAGE_KEYS.tocVisible, false);
    }

    bindToggles();
  }

  function getSiteTitle() {
    const title = document.querySelector(".md-header__topic .md-ellipsis") ||
      document.querySelector(".md-header__title .md-ellipsis");
    return title ? title.textContent.trim() : "Discrete Mathematics for Computing";
  }

  function addFooterBlock() {
    const footer = document.querySelector(".md-footer");
    if (!footer) return;

    const existing = footer.querySelector(".custom-footer");
    if (existing) existing.remove();

    const meta = footer.querySelector(".md-footer-meta");
    if (meta) meta.remove();

    const block = document.createElement("section");
    block.className = "custom-footer";
    const year = new Date().getFullYear();

    block.innerHTML = `
      <div class="custom-footer__inner">
        <div class="custom-footer__hero">
          <p class="custom-footer__label">Discrete Mathematics for Computing</p>
          <h2 class="custom-footer__project">CS285 Secure Key Exchange Documentation</h2>
          <p class="custom-footer__tagline">A bright, structured learning space for modular arithmetic, key exchange logic, and implementation evidence.</p>
          <form class="custom-footer__subscribe" novalidate>
            <label class="custom-footer__subscribe-label" for="footer-subscribe-email">Subscribe for updates</label>
            <div class="custom-footer__subscribe-row">
              <input id="footer-subscribe-email" class="custom-footer__subscribe-input" type="email" placeholder="you@example.com" required />
              <button class="custom-footer__subscribe-btn" type="submit">Subscribe</button>
            </div>
            <p class="custom-footer__subscribe-note">The button opens your email app and stores your subscription locally on this device.</p>
            <p class="custom-footer__subscribe-status" aria-live="polite"></p>
          </form>
        </div>

        <div class="custom-footer__grid">
          <div class="footer-col">
            <div class="footer-col__title">Modules</div>
            <a class="footer-link" href="${url("introduction/")}">Introduction</a>
            <a class="footer-link" href="${url("implementation/")}">Implementation</a>
            <a class="footer-link" href="${url("results/")}">Results</a>
            <a class="footer-link" href="${url("conclusion/")}">Conclusion</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Phases</div>
            <a class="footer-link" href="${url("about/")}">Project Scope</a>
            <a class="footer-link" href="${url("advantages-limitations/")}">Evaluation</a>
            <a class="footer-link" href="${url("code/main/")}">Code Walkthrough</a>
            <a class="footer-link" href="${url("team/")}">Team</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Report & Resources</div>
            <a class="footer-link" href="${url("report/report/")}">Project Report</a>
            <a class="footer-link" href="${url("references/")}">References</a>
            <a class="footer-link" href="${url("results/")}">Test Evidence</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Contact & Legal</div>
            <a class="footer-link" href="mailto:Shoug.Alomran@Shoug-Tech.com">Shoug.Alomran@Shoug-Tech.com</a>
            <a class="footer-link" href="${url("copyright/")}">Copyright & Usage</a>
          </div>
        </div>
      </div>

      <div class="custom-footer__meta">
        <span>© ${year} Shoug Fawaz Alomran</span>
        <span>All rights reserved</span>
        <a class="custom-footer__credit" href="https://blueprint.shoug-tech.com/" target="_blank" rel="noopener">Made by Blueprint</a>
      </div>
    `;

    footer.appendChild(block);
  }

  function bindSubscribeForm() {
    const form = document.querySelector(".custom-footer__subscribe");
    if (!form) return;

    const input = form.querySelector(".custom-footer__subscribe-input");
    const status = form.querySelector(".custom-footer__subscribe-status");
    if (!input || !status) return;

    form.onsubmit = function (event) {
      event.preventDefault();
      const email = input.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        return;
      }

      const key = "cs285-subscribers";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem(key, JSON.stringify(existing));
      }

      const subject = encodeURIComponent("CS285 Documentation Subscription");
      const body = encodeURIComponent(
        `Please subscribe this email to CS285 documentation updates:\n\n${email}\n\nRequested from: ${window.location.href}`
      );
      window.location.href = `mailto:Shoug.Alomran@Shoug-Tech.com?subject=${subject}&body=${body}`;

      status.textContent = "Subscription request prepared. Please send the opened email to complete signup.";
      input.value = "";
    };
  }

  function makeCodeCollapsible() {
    const blocks = document.querySelectorAll(".md-typeset pre");
    let index = 0;

    blocks.forEach((pre) => {
      if (pre.closest("details.collapsible-block")) return;

      index += 1;
      const details = document.createElement("details");
      details.className = "collapsible-block collapsible-code";

      const summary = document.createElement("summary");
      summary.textContent = `Code block ${index}`;

      pre.parentNode.insertBefore(details, pre);
      details.appendChild(summary);
      details.appendChild(pre);
    });
  }

  function makeImagesCollapsible() {
    const images = document.querySelectorAll(".md-typeset img");
    let index = 0;

    images.forEach((img) => {
      if (img.closest("details.collapsible-block")) return;

      let container = img;
      const parent = img.parentElement;
      if (parent && parent.tagName === "P" && parent.children.length === 1 && parent.textContent.trim() === "") {
        container = parent;
      }

      if (!container.parentNode) return;

      index += 1;
      const alt = (img.getAttribute("alt") || "Figure").trim();
      const details = document.createElement("details");
      details.className = "collapsible-block collapsible-figure";

      const summary = document.createElement("summary");
      summary.textContent = `${alt} (${index})`;

      container.parentNode.insertBefore(details, container);
      details.appendChild(summary);
      details.appendChild(container);
    });
  }

  function init() {
    addHeaderUtilities();
    addFooterBlock();
    bindSubscribeForm();
    makeCodeCollapsible();
    makeImagesCollapsible();

    const state = currentState();
    applySidebarState(state.navVisible, state.tocVisible);
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(init);
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
