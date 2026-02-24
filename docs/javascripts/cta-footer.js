(function () {
  const EMAIL = "inquiry@shoug-tech.com";
  const MAIN_WEBSITE = "https://shoug-tech.com/";
  function ensureTrailingSlash(s) {
    return s.endsWith("/") ? s : s + "/";
  }

  function getProjectRootFromPathname() {
    // For mkdocs serve with --site-dir under /<project>/..., or GitHub Pages project sites
    // Example: /CS285-CryptographyProject/code/main/ -> /CS285-CryptographyProject/
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length > 0) return `/${parts[0]}/`;
    return "/";
  }

  function getSiteRootHref() {
    // 1) MkDocs Material runtime base (best when present)
    try {
      if (typeof __md_get === "function") {
        const b = __md_get("__base");
        if (b && typeof b === "string") {
          // b is usually "/CS285-CryptographyProject/" (or "/")
          return ensureTrailingSlash(new URL(b, window.location.origin).href);
        }
      }
    } catch (e) { }

    // 2) <base href="..."> is used by MkDocs Material; baseEl.href is absolute and correct
    const baseEl = document.querySelector('base[href]');
    if (baseEl && baseEl.href) {
      // We want the *directory* root that base points to
      return ensureTrailingSlash(new URL(".", baseEl.href).href);
    }

    // 3) Fallback: infer project root from URL pathname
    return ensureTrailingSlash(new URL(getProjectRootFromPathname(), window.location.origin).href);
  }

  function url(path) {
    // IMPORTANT: path must NOT start with "/" so it stays under the project root
    const p = String(path || "").replace(/^\/+/, "");
    return new URL(p, getSiteRootHref()).href;
  }

  function getSiteName() {
    const titleEl = document.querySelector(".md-header__title .md-ellipsis");
    return titleEl ? titleEl.textContent.trim() : "Website";
  }

  function addHeaderCTA() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner) return;
    if (headerInner.querySelector("a.header-cta")) return;

    const cta = document.createElement("a");
    cta.className = "header-cta";
    cta.href = `mailto:${EMAIL}`;
    cta.textContent = "Contact Us";
    cta.setAttribute("aria-label", "Contact Us");
    headerInner.appendChild(cta);
  }

  function addFooterBlock() {
    const footer = document.querySelector(".md-footer");
    if (!footer) return;
    if (footer.querySelector(".custom-footer")) return;

    const meta = footer.querySelector(".md-footer-meta");
    const block = document.createElement("section");
    block.className = "custom-footer";

    const siteName = getSiteName();

    // Matches your nav (directory URLs)
    const LINKS = {
      home: url(""),
      about: url("about/"),
      introduction: url("introduction/"),
      implementation: url("implementation/"),
      results: url("results/"),
      advLim: url("advantages-limitations/"),
      conclusion: url("conclusion/"),
      references: url("references/"),
      team: url("team/"),
      report: url("report/report/"),

      codeMain: url("code/main/"),
      codeKeyExchange: url("code/keyexchange/"),
      codeEncryptor: url("code/encryptor/"),
      codeParameters: url("code/parameters/"),
      codeHelpers: url("code/helpers/"),
      codeValidator: url("code/validator/"),
      codeUtils: url("code/utils/"),
    };

    block.innerHTML = `
      <div class="custom-footer__inner">
        <div class="custom-footer__left">
          <div class="custom-footer__brand">${siteName}</div>
          <div class="custom-footer__title">Stay Updated</div>

          <form class="custom-footer__form" action="mailto:${EMAIL}" method="get">
            <input
              class="custom-footer__input"
              type="email"
              name="email"
              placeholder="Email address"
              autocomplete="email"
              required
            >
            <button class="custom-footer__button" type="submit">Subscribe</button>
          </form>

          <div class="custom-footer__note">
            By submitting your email, you agree to be contacted regarding this website.
          </div>
        </div>

        <div class="custom-footer__right">
          <div class="footer-col">
            <div class="footer-col__title">Pages</div>
            <a class="footer-link" href="${LINKS.home}">Home</a>
            <a class="footer-link" href="${LINKS.about}">About</a>
            <a class="footer-link" href="${LINKS.introduction}">Introduction</a>
            <a class="footer-link" href="${LINKS.implementation}">Implementation</a>
            <a class="footer-link" href="${LINKS.results}">Results</a>
            <a class="footer-link" href="${LINKS.advLim}">Advantages &amp; Limitations</a>
            <a class="footer-link" href="${LINKS.conclusion}">Conclusion</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Resources</div>
            <a class="footer-link" href="${LINKS.report}">View Report</a>
            <a class="footer-link" href="${LINKS.references}">References</a>
            <a class="footer-link" href="${LINKS.team}">Team</a>

            <div style="height:10px"></div>
            <div class="footer-col__title">Contact</div>
            <a class="footer-link" href="mailto:${EMAIL}">${EMAIL}</a>
          </div>
<div class="footer-col">
  <div class="footer-col__title">Website</div>
  <a class="footer-link" href="${MAIN_WEBSITE}" target="_blank" rel="noopener">
    shoug-tech.com
  </a>
</div>
          <div class="footer-col">
            <div class="footer-col__title">Code</div>
            <a class="footer-link" href="${LINKS.codeMain}">Main</a>
            <a class="footer-link" href="${LINKS.codeKeyExchange}">Key Exchange</a>
            <a class="footer-link" href="${LINKS.codeEncryptor}">Encryptor</a>
            <a class="footer-link" href="${LINKS.codeParameters}">Parameters</a>
            <a class="footer-link" href="${LINKS.codeHelpers}">Helpers</a>
            <a class="footer-link" href="${LINKS.codeValidator}">Validator</a>
            <a class="footer-link" href="${LINKS.codeUtils}">Utils</a>
          </div>
        </div>
      </div>
    `;

    if (meta) footer.insertBefore(block, meta);
    else footer.prepend(block);
  }

  function run() {
    addHeaderCTA();
    addFooterBlock();
  }

  // MkDocs Material SPA navigation support
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
