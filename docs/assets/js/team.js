/* CS285 · team profiles. Cards carry data-member="<key>"; clicking one opens a
   side drawer with that member's contributions. Edit the DATA object to update
   a profile. Strings are trusted, hand-written HTML. */
(function () {
  "use strict";

  var DATA = {
    shoug: {
      name: "Shoug Fawaz Abdullah Alomran",
      initials: "SA",
      color: "var(--m1)",
      studentId: "223410392",
      department: "Software Engineering / Cybersecurity",
      contributions: [
        "Validation integration",
        "<code>Main</code> flow and <code>Helpers</code>",
        "Testing flow design",
        "Report assembly",
        "Documentation site integration"
      ],
      responsibilities: [
        "<code>Main.java</code> end-to-end orchestration and mode handling",
        "<code>Helpers.java</code> validated input utilities",
        "Wired <code>Validator</code> checks into the main execution flow",
        "Authored and assembled the project report",
        "Built and deployed the documentation site"
      ],
      links: {
        github: "https://github.com/Shoug-Alomran",
        linkedin: "https://linkedin.com/in/shoug-alomran",
        portfolio: "https://shoug-tech.com",
        email: "Shoug.Alomran@Shoug-Tech.com"
      }
    },
    fai: {
      name: "Fai Mohammad Bin Khanjar",
      initials: "FK",
      color: "var(--m2)",
      studentId: "223410071",
      department: "",
      contributions: [
        "Key-generation logic",
        "Shared-secret verification",
        "Numerical example review",
        "Modular arithmetic validation"
      ],
      responsibilities: [
        "<code>KeyExchange.java</code> key-pair generation and shared-secret computation",
        "Verified shared-secret equality across participants",
        "Reviewed the guided numerical example for correctness",
        "Validated modular arithmetic against <code>Parameters.java</code>"
      ],
      links: {
        github: "https://github.com/Fai-moh",
        linkedin: "https://linkedin.com/in/fai-bin-khanjar-958741380"
      }
    },
    aljohara: {
      name: "Aljohara Waleed A Albawardi",
      initials: "AA",
      color: "var(--m3)",
      studentId: "223410346",
      department: "Computer Science / Cybersecurity",
      contributions: [
        "<code>Encryptor</code> implementation",
        "Encryption/decryption test scenarios",
        "Output screenshot curation"
      ],
      responsibilities: [
        "<code>Encryptor.java</code> SHA-256 key derivation and message encryption/decryption",
        "Designed encryption/decryption test scenarios",
        "Curated output screenshots for the results page"
      ],
      links: {
        github: "https://github.com/joharahalbawardi",
        linkedin: "https://linkedin.com/in/aljoharah-albawardi"
      }
    },
    yara: {
      name: "Yara Mutlaq Mohammed Alzamel",
      initials: "YA",
      color: "var(--m4)",
      studentId: "223410834",
      department: "",
      contributions: [
        "Parameter scaffolding",
        "Support utilities",
        "Output formatting",
        "Workflow documentation support"
      ],
      responsibilities: [
        "<code>Parameters.java</code> public Diffie–Hellman parameter storage",
        "<code>Utils.java</code> random-value and display-formatting helpers",
        "Output formatting for console results",
        "Workflow documentation support"
      ],
      links: {
        github: "https://github.com/Yaraz588",
        linkedin: "https://linkedin.com/in/yara-alzamel-6a7715323"
      }
    }
  };

  var LINK_LABEL = { github: "GitHub", linkedin: "LinkedIn", portfolio: "Portfolio", email: "Email" };

  var cards = document.querySelectorAll("[data-member]");
  if (!cards.length) return;

  var drawer = document.createElement("div");
  drawer.className = "drawer";
  drawer.setAttribute("role", "dialog");
  drawer.setAttribute("aria-modal", "true");
  drawer.setAttribute("aria-hidden", "true");
  drawer.innerHTML =
    '<div class="drawer-backdrop" data-close></div>' +
    '<div class="drawer-panel" tabindex="-1">' +
    '<button class="icon-btn drawer-close" type="button" aria-label="Close profile" data-close>' +
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
    '<div class="drawer-content"></div></div>';
  document.body.appendChild(drawer);
  var content = drawer.querySelector(".drawer-content");
  var panel = drawer.querySelector(".drawer-panel");
  var lastFocus = null;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function open(key) {
    var m = DATA[key];
    if (!m) return;
    lastFocus = document.activeElement;
    panel.style.setProperty("--c", m.color);
    var links = Object.keys(m.links || {}).filter(function (k) { return m.links[k]; }).map(function (k) {
      var href = k === "email" ? "mailto:" + m.links[k] : m.links[k];
      return '<a class="btn btn-sm" href="' + esc(href) + '"' + (k === "email" ? "" : ' target="_blank" rel="noopener"') + ">" + LINK_LABEL[k] + "</a>";
    }).join("");
    content.innerHTML =
      '<div class="avatar" style="--c:' + m.color + '">' + m.initials + "</div>" +
      '<h3 id="drawer-title">' + esc(m.name) + "</h3>" +
      '<p class="dept">' + esc(m.department || "CS285 · Discrete Mathematics for Computing") + "</p>" +
      '<div class="meta-row" style="margin-top:14px"><span class="chip">ID <b>' + esc(m.studentId) + "</b></span></div>" +
      "<h4>Contributions</h4><ul>" + m.contributions.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul>" +
      "<h4>Responsibilities</h4><ul>" + m.responsibilities.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul>" +
      (links ? '<h4>Links</h4><div class="links">' + links + "</div>" : "");
    drawer.setAttribute("aria-labelledby", "drawer-title");
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(function () { panel.focus(); }, 50);
  }

  function close() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  Array.prototype.forEach.call(cards, function (card) {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      open(card.getAttribute("data-member"));
    });
  });
  drawer.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("open")) close(); });
})();
