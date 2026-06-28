(function () {
  // Single source of truth for both the card grid and the profile modal.
  // Fields left as `null` are genuinely unknown — render them as editable
  // placeholders instead of inventing details.
  const MEMBERS = [
    {
      id: "shoug-alomran",
      name: "Shoug Fawaz Abdullah Alomran",
      studentId: "223410392",
      role: "Team Member",
      department: "Software Engineering / Cybersecurity",
      affiliation: "Prince Sultan University · CS285",
      bio: null,
      contributions: [
        "Validation integration",
        "`Main` flow",
        "`Helpers`",
        "Testing flow design",
        "Report assembly",
        "MkDocs site integration",
      ],
      responsibilities: [
        "`Main.java` end-to-end orchestration and mode handling",
        "`Helpers.java` validated input utilities",
        "Wired `Validator` checks into the main execution flow",
        "Authored and assembled the project report",
        "Built and deployed the MkDocs documentation site",
      ],
      links: {
        github: "https://github.com/Shoug-Alomran",
        linkedin: "https://linkedin.com/in/shoug-alomran",
        portfolio: "https://shoug-tech.com",
        email: "Shoug.Alomran@Shoug-Tech.com",
      },
    },
    {
      id: "fai-khanjar",
      name: "Fai Mohammad Bin Khanjar",
      studentId: "223410071",
      role: "Team Member",
      department: null,
      affiliation: "Prince Sultan University · CS285",
      bio: null,
      contributions: [
        "Key-generation logic",
        "Shared-secret verification",
        "Numerical example review",
        "Modular arithmetic validation",
      ],
      responsibilities: [
        "`KeyExchange.java` key-pair generation and shared-secret computation",
        "Verified shared-secret equality across participants",
        "Reviewed the guided numerical example for correctness",
        "Validated modular arithmetic against `Parameters.java`",
      ],
      links: {
        github: "https://github.com/Fai-moh",
        linkedin: "https://linkedin.com/in/fai-bin-khanjar-958741380",
        portfolio: null,
        email: null,
      },
    },
    {
      id: "aljohara-albawardi",
      name: "Aljohara Waleed A Albawardi",
      studentId: "223410346",
      role: "Team Member",
      department: "Computer Science / Cybersecurity",
      affiliation: "Prince Sultan University · CS285",
      bio: null,
      contributions: [
        "`Encryptor` implementation",
        "Encryption/decryption test scenarios",
        "Output screenshot curation",
      ],
      responsibilities: [
        "`Encryptor.java` SHA-256 key derivation and message encryption/decryption",
        "Designed encryption/decryption test scenarios",
        "Curated output screenshots for the results page",
      ],
      links: {
        github: "https://github.com/joharahalbawardi",
        linkedin: "https://linkedin.com/in/aljoharah-albawardi",
        portfolio: null,
        email: null,
      },
    },
    {
      id: "yara-alzamel",
      name: "Yara Mutlaq Mohammed Alzamel",
      studentId: "223410834",
      role: "Team Member",
      department: null,
      affiliation: "Prince Sultan University · CS285",
      bio: null,
      contributions: [
        "Parameter scaffolding",
        "Support utilities",
        "Output formatting",
        "Workflow documentation support",
      ],
      responsibilities: [
        "`Parameters.java` public Diffie-Hellman parameter storage",
        "`Utils.java` random-value and display-formatting helpers",
        "Output formatting for console results",
        "Workflow documentation support",
      ],
      links: {
        github: "https://github.com/Yaraz588",
        linkedin: "https://linkedin.com/in/yara-alzamel-6a7715323",
        portfolio: null,
        email: null,
      },
    },
  ];

  const PLACEHOLDER = "Not provided yet";
  let lastFocusedCard = null;
  let modalEl = null;

  function initials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const first = parts[0] ? parts[0][0] : "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  // Renders the limited `code` inline syntax already used in team.md
  // contributions, without touching innerHTML on user-controlled text.
  function renderInline(text, target) {
    const segments = String(text).split("`");
    segments.forEach((segment, index) => {
      if (segment === "") return;
      if (index % 2 === 1) {
        const code = document.createElement("code");
        code.textContent = segment;
        target.appendChild(code);
      } else {
        target.appendChild(document.createTextNode(segment));
      }
    });
  }

  function buildList(items, emptyText) {
    const list = document.createElement("ul");
    list.className = "team-profile__list";
    if (!items || items.length === 0) {
      const li = document.createElement("li");
      li.className = "team-profile__placeholder";
      li.textContent = emptyText;
      list.appendChild(li);
      return list;
    }
    items.forEach((item) => {
      const li = document.createElement("li");
      renderInline(item, li);
      list.appendChild(li);
    });
    return list;
  }

  function buildField(label, value) {
    const wrap = document.createElement("div");
    wrap.className = "team-profile__field";

    const dt = document.createElement("div");
    dt.className = "team-profile__field-label";
    dt.textContent = label;

    const dd = document.createElement("div");
    dd.className = "team-profile__field-value";
    if (value) {
      dd.textContent = value;
    } else {
      dd.classList.add("team-profile__placeholder");
      dd.textContent = PLACEHOLDER;
    }

    wrap.appendChild(dt);
    wrap.appendChild(dd);
    return wrap;
  }

  function buildLinks(links) {
    const wrap = document.createElement("div");
    wrap.className = "team-profile__links";

    const entries = [
      { key: "github", label: "GitHub", icon: "fa-brands fa-github" },
      { key: "linkedin", label: "LinkedIn", icon: "fa-brands fa-linkedin" },
      { key: "portfolio", label: "Portfolio", icon: "fa-solid fa-globe" },
      { key: "email", label: "Email", icon: "fa-solid fa-envelope" },
    ];

    entries.forEach(({ key, label, icon }) => {
      const value = links && links[key];
      const a = document.createElement("a");
      a.className = "team-profile__link";
      const icn = document.createElement("i");
      icn.className = icon;
      icn.setAttribute("aria-hidden", "true");
      a.appendChild(icn);
      a.appendChild(document.createTextNode(" " + label));

      if (value) {
        a.href = key === "email" ? "mailto:" + value : value;
        a.target = key === "email" ? "_self" : "_blank";
        if (key !== "email") a.rel = "noopener";
      } else {
        a.href = "#";
        a.setAttribute("aria-disabled", "true");
        a.classList.add("team-profile__link--placeholder");
        a.title = PLACEHOLDER;
        a.addEventListener("click", (event) => event.preventDefault());
      }
      wrap.appendChild(a);
    });

    return wrap;
  }

  function buildCard(member) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "team-card";
    card.id = "team-card-" + member.id;
    card.setAttribute("role", "listitem");
    card.setAttribute("aria-haspopup", "dialog");
    card.dataset.memberId = member.id;

    const avatar = document.createElement("div");
    avatar.className = "team-card__avatar";
    avatar.textContent = initials(member.name);
    avatar.setAttribute("aria-hidden", "true");

    const body = document.createElement("div");
    body.className = "team-card__body";

    const name = document.createElement("div");
    name.className = "team-card__name";
    name.textContent = member.name;

    const meta = document.createElement("div");
    meta.className = "team-card__meta";
    meta.textContent = "Student ID " + member.studentId;

    const preview = document.createElement("div");
    preview.className = "team-card__preview";
    renderInline((member.contributions && member.contributions[0]) || PLACEHOLDER, preview);

    const cta = document.createElement("span");
    cta.className = "team-card__cta";
    cta.textContent = "View profile →";

    body.appendChild(name);
    body.appendChild(meta);
    body.appendChild(preview);
    body.appendChild(cta);

    card.appendChild(avatar);
    card.appendChild(body);

    card.addEventListener("click", () => openProfile(member, card));

    return card;
  }

  function renderGrid() {
    const grid = document.getElementById("team-grid");
    if (!grid) return;
    grid.innerHTML = "";
    MEMBERS.forEach((member) => grid.appendChild(buildCard(member)));
  }

  function buildModal() {
    if (modalEl) return modalEl;

    const backdrop = document.createElement("div");
    backdrop.className = "team-modal-backdrop";
    backdrop.setAttribute("hidden", "");

    const panel = document.createElement("div");
    panel.className = "team-modal";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.id = "team-profile-modal";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "team-modal__close";
    closeBtn.setAttribute("aria-label", "Close profile");
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    closeBtn.addEventListener("click", closeProfile);

    const hero = document.createElement("div");
    hero.className = "team-modal__hero";

    const avatar = document.createElement("div");
    avatar.className = "team-modal__avatar";
    avatar.setAttribute("aria-hidden", "true");

    const heroText = document.createElement("div");
    heroText.className = "team-modal__hero-text";

    const titleEl = document.createElement("h2");
    titleEl.className = "team-modal__name";
    titleEl.id = "team-profile-name";

    const roleEl = document.createElement("p");
    roleEl.className = "team-modal__role";

    heroText.appendChild(titleEl);
    heroText.appendChild(roleEl);
    hero.appendChild(avatar);
    hero.appendChild(heroText);

    const content = document.createElement("div");
    content.className = "team-modal__content";

    const fieldsWrap = document.createElement("div");
    fieldsWrap.className = "team-modal__fields";

    const main = document.createElement("div");
    main.className = "team-modal__main";

    const bioHeading = document.createElement("h3");
    bioHeading.className = "team-modal__heading";
    bioHeading.textContent = "Biography";
    const bioBody = document.createElement("p");
    bioBody.className = "team-modal__bio";

    const contribHeading = document.createElement("h3");
    contribHeading.className = "team-modal__heading";
    contribHeading.textContent = "Project Contributions";
    const contribList = document.createElement("div");
    contribList.className = "team-modal__contributions";

    const respHeading = document.createElement("h3");
    respHeading.className = "team-modal__heading";
    respHeading.textContent = "Responsibilities & Deliverables";
    const respList = document.createElement("div");
    respList.className = "team-modal__responsibilities";

    const linksHeading = document.createElement("h3");
    linksHeading.className = "team-modal__heading";
    linksHeading.textContent = "Links";
    const linksWrap = document.createElement("div");
    linksWrap.className = "team-modal__links-wrap";

    main.appendChild(bioHeading);
    main.appendChild(bioBody);
    main.appendChild(contribHeading);
    main.appendChild(contribList);
    main.appendChild(respHeading);
    main.appendChild(respList);
    main.appendChild(linksHeading);
    main.appendChild(linksWrap);

    content.appendChild(fieldsWrap);
    content.appendChild(main);

    panel.appendChild(closeBtn);
    panel.appendChild(hero);
    panel.appendChild(content);
    backdrop.appendChild(panel);
    document.body.appendChild(backdrop);

    backdrop.addEventListener("mousedown", (event) => {
      if (event.target === backdrop) closeProfile();
    });

    panel.addEventListener("keydown", handleModalKeydown);

    modalEl = {
      backdrop,
      panel,
      closeBtn,
      avatar,
      titleEl,
      roleEl,
      fieldsWrap,
      bioBody,
      contribList,
      respList,
      linksWrap,
    };
    return modalEl;
  }

  function populateModal(member) {
    const m = buildModal();
    m.avatar.textContent = initials(member.name);
    m.titleEl.textContent = member.name;
    m.roleEl.textContent = member.role || PLACEHOLDER;

    m.panel.setAttribute("aria-labelledby", "team-profile-name");

    m.fieldsWrap.innerHTML = "";
    m.fieldsWrap.appendChild(buildField("Student ID", member.studentId));
    m.fieldsWrap.appendChild(buildField("Major / Department", member.department));
    m.fieldsWrap.appendChild(buildField("Affiliation", member.affiliation));

    if (member.bio) {
      m.bioBody.classList.remove("team-profile__placeholder");
      m.bioBody.textContent = member.bio;
    } else {
      m.bioBody.classList.add("team-profile__placeholder");
      m.bioBody.textContent = PLACEHOLDER;
    }

    m.contribList.innerHTML = "";
    m.contribList.appendChild(buildList(member.contributions, PLACEHOLDER));

    m.respList.innerHTML = "";
    m.respList.appendChild(
      buildList(
        member.responsibilities && member.responsibilities.length
          ? member.responsibilities
          : null,
        PLACEHOLDER
      )
    );

    m.linksWrap.innerHTML = "";
    m.linksWrap.appendChild(buildLinks(member.links));
  }

  function getFocusable(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);
  }

  function handleModalKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeProfile();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = getFocusable(modalEl.panel);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function openProfile(member, triggerEl) {
    populateModal(member);
    lastFocusedCard = triggerEl || document.activeElement;

    document.body.classList.add("team-modal-open");
    modalEl.backdrop.removeAttribute("hidden");

    if (prefersReducedMotion()) {
      modalEl.backdrop.classList.add("team-modal-backdrop--no-motion");
    }

    requestAnimationFrame(() => {
      modalEl.backdrop.classList.add("team-modal-backdrop--visible");
    });

    modalEl.closeBtn.focus();
    document.addEventListener("keydown", handleDocumentEscape);
  }

  function handleDocumentEscape(event) {
    if (event.key === "Escape") closeProfile();
  }

  function closeProfile() {
    if (!modalEl || modalEl.backdrop.hasAttribute("hidden")) return;

    modalEl.backdrop.classList.remove("team-modal-backdrop--visible");
    document.body.classList.remove("team-modal-open");
    document.removeEventListener("keydown", handleDocumentEscape);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      modalEl.backdrop.setAttribute("hidden", "");
      modalEl.backdrop.classList.remove("team-modal-backdrop--no-motion");
      if (lastFocusedCard && document.body.contains(lastFocusedCard)) {
        lastFocusedCard.focus();
      }
    };

    if (prefersReducedMotion()) {
      finish();
    } else {
      modalEl.panel.addEventListener("transitionend", finish, { once: true });
      setTimeout(finish, 350);
    }
  }

  function init() {
    renderGrid();
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(init);
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
