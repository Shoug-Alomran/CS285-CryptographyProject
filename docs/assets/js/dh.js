/* CS285 · Diffie–Hellman visuals: the modular ring in the hero and the key
   exchange lab. Both draw Z_q as residues on a circle and join the powers of
   alpha in order, so a primitive root visibly visits every nonzero residue.
   All numbers are computed here; q stays below 100, so plain Number maths is
   exact (the largest intermediate product is 96 * 96). */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function modpow(base, exp, m) {
    var r = 1;
    base %= m;
    while (exp > 0) {
      if (exp & 1) r = (r * base) % m;
      base = (base * base) % m;
      exp >>= 1;
    }
    return r;
  }

  // Multiplicative order of a modulo prime q: the least k >= 1 with a^k = 1.
  function order(a, q) {
    var x = a % q;
    for (var k = 1; k < q; k++) {
      if (x === 1) return k;
      x = (x * a) % q;
    }
    return q - 1;
  }

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* ---- Ring renderer ----------------------------------------------------- */
  function Ring(svg) {
    this.svg = svg;
    this.cx = 220;
    this.cy = 220;
    this.R = 156;
  }

  Ring.prototype.build = function (q, big, sub) {
    var svg = this.svg;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    this.q = q;
    this.r = q <= 23 ? 12 : q <= 31 ? 10 : q <= 53 ? 6.5 : 4.5;
    this.labels = q <= 31;
    this.tagCount = {};
    el("circle", { class: "track", cx: this.cx, cy: this.cy, r: this.R }, svg);
    this.gChords = el("g", {}, svg);
    this.gNodes = el("g", {}, svg);
    this.gTags = el("g", {}, svg);
    this.bigText = el("text", { class: "center-big", x: this.cx, y: this.cy + 6 }, svg);
    this.subText = el("text", { class: "center-sub", x: this.cx, y: this.cy + 34 }, svg);
    this.setCenter(big, sub);
    this.nodes = [];
    for (var i = 0; i < q; i++) {
      var p = this.pos(i, this.R);
      var g = el("g", { class: "node" + (i === 0 ? " zero" : "") }, this.gNodes);
      el("circle", { class: "halo", cx: p.x, cy: p.y, r: this.r + 3 }, g);
      el("circle", { cx: p.x, cy: p.y, r: this.r }, g);
      if (this.labels) {
        var t = el("text", { x: p.x, y: p.y + 0.5 }, g);
        if (q > 23) t.style.fontSize = "8.5px";
        t.textContent = i;
      }
      this.nodes.push(g);
    }
  };

  // big is [main, subscript, superscript], e.g. ["ℤ", "23", "*"] for Z_23^*.
  Ring.prototype.setCenter = function (big, sub) {
    var t = this.bigText;
    while (t.firstChild) t.removeChild(t.firstChild);
    big = big || [""];
    t.appendChild(document.createTextNode(big[0]));
    if (big[1]) el("tspan", { "baseline-shift": "sub", "font-size": "45%", "font-style": "normal" }, t).textContent = big[1];
    if (big[2]) el("tspan", { "baseline-shift": "super", "font-size": "50%", "font-style": "normal", dx: "-0.9em" }, t).textContent = big[2];
    this.subText.textContent = sub || "";
  };

  Ring.prototype.pos = function (i, R) {
    var a = -Math.PI / 2 + (2 * Math.PI * i) / this.q;
    return { x: this.cx + R * Math.cos(a), y: this.cy + R * Math.sin(a) };
  };

  Ring.prototype.chord = function (from, to, delayMs) {
    var a = this.pos(from, this.R);
    var b = this.pos(to, this.R);
    var len = Math.hypot(b.x - a.x, b.y - a.y);
    var line = el("line", { class: "chord" + (delayMs == null ? " static" : ""), x1: a.x, y1: a.y, x2: b.x, y2: b.y }, this.gChords);
    line.style.setProperty("--len", len.toFixed(1));
    if (delayMs) line.style.animationDelay = delayMs + "ms";
    return line;
  };

  Ring.prototype.light = function (i) {
    if (this.nodes[i]) this.nodes[i].classList.add("on");
  };

  // cls: "a" (Alice), "b" (Bob) or "k" (shared key). label: [main, subscript].
  Ring.prototype.mark = function (i, cls, label) {
    var node = this.nodes[i];
    if (!node) return;
    node.classList.add("is-" + cls);
    node.parentNode.appendChild(node); // draw on top
    var n = (this.tagCount[i] = (this.tagCount[i] || 0) + 1);
    var p = this.pos(i, this.R + 14 + this.r + n * 17);
    var t = el("text", { class: "tag " + cls, x: p.x, y: p.y }, this.gTags);
    t.appendChild(document.createTextNode(label[0]));
    if (label[1]) {
      var s = el("tspan", { "baseline-shift": "sub", "font-size": "70%" }, t);
      s.textContent = label[1];
    }
  };

  /* ---- Hero: the powers of 5 modulo 23 ----------------------------------- */
  var heroCard = document.querySelector("[data-ring-hero]");
  if (heroCard) {
    var Q = 23, A = 5, XA = 6, XB = 15;
    var YA = modpow(A, XA, Q), YB = modpow(A, XB, Q), K = modpow(YB, XA, Q);
    var ring = new Ring(heroCard.querySelector(".ring"));
    var eq = heroCard.querySelector("[data-ring-eq]");
    var phase = heroCard.querySelector("[data-ring-phase]");
    var timers = [];
    var STEP = 230;

    var setEq = function (html) {
      eq.innerHTML = "<span>" + html + "</span>";
      eq.classList.remove("swap");
      void eq.offsetWidth;
      eq.classList.add("swap");
    };
    var setPhase = function (p) {
      phase.textContent = p;
      phase.setAttribute("data-p", p);
    };
    var at = function (ms, fn) { timers.push(setTimeout(fn, ms)); };

    var finalState = function () {
      ring.build(Q, ["ℤ", "23", "*"], "⟨5⟩ = all 22 residues");
      var x = 1;
      ring.light(1);
      for (var k = 1; k < Q; k++) {
        var nx = (x * A) % Q;
        ring.chord(x, nx);
        ring.light(nx);
        x = nx;
      }
      ring.mark(YA, "a", ["Y", "a"]);
      ring.mark(YB, "b", ["Y", "b"]);
      ring.mark(K, "k", ["K", ""]);
      setPhase("shared");
      setEq('<span class="k"><i>K</i> = 19<sup>6</sup> ≡ 8<sup>15</sup> ≡ <b>' + K + "</b> (mod 23)</span>");
    };

    var run = function () {
      timers.forEach(clearTimeout);
      timers = [];
      ring.build(Q, ["ℤ", "23", "*"], "powers of 5");
      setPhase("generating");
      ring.light(1);
      setEq("<b>5</b><sup>0</sup> ≡ <b>1</b> (mod 23)");
      var x = 1;
      for (var k = 1; k < Q; k++) {
        (function (k, from, to) {
          at(k * STEP, function () {
            ring.chord(from, to, 0);
            ring.light(to);
            setEq("<b>5</b><sup>" + k + "</sup> ≡ <b>" + to + "</b> (mod 23)");
          });
        })(k, x, (x * A) % Q);
        x = (x * A) % Q;
      }
      var t = Q * STEP + 300;
      at(t, function () {
        ring.setCenter(["ℤ", "23", "*"], "⟨5⟩ = all 22 residues");
        setEq("ord<sub>23</sub>(5) = <b>22</b> = <i>q</i> − 1, so 5 is a primitive root");
      });
      at((t += 2200), function () {
        setPhase("alice");
        ring.mark(YA, "a", ["Y", "a"]);
        setEq('<span class="a"><i>Y</i><sub>a</sub> = 5<sup>6</sup> mod 23 = <b>' + YA + "</b></span>");
      });
      at((t += 2000), function () {
        setPhase("bob");
        ring.mark(YB, "b", ["Y", "b"]);
        setEq('<span class="b"><i>Y</i><sub>b</sub> = 5<sup>15</sup> mod 23 = <b>' + YB + "</b></span>");
      });
      at((t += 2000), function () {
        setPhase("shared");
        ring.mark(K, "k", ["K", ""]);
        setEq('<span class="k"><i>K</i> = 19<sup>6</sup> ≡ 8<sup>15</sup> ≡ <b>' + K + "</b> (mod 23)</span>");
      });
      at((t += 5200), run);
    };

    if (reduceMotion) {
      finalState();
    } else if ("IntersectionObserver" in window) {
      // Start when the card is on screen; pause the loop while it is off screen.
      var running = false;
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; run(); }
        if (!visible && running) { running = false; timers.forEach(clearTimeout); timers = []; finalState(); }
      }, { threshold: 0.15 }).observe(heroCard);
    } else {
      run();
    }
  }

  /* ---- Lab ---------------------------------------------------------------- */
  var lab = document.querySelector("[data-lab]");
  if (!lab) return;

  var PRIMES = [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  var state = { q: 23, alpha: 5, xa: 6, xb: 15 };
  var inp = function (k) { return lab.querySelector('[data-in="' + k + '"]'); };
  var out = function (k) { return lab.querySelector('[data-out="' + k + '"]'); };
  var val = function (k) { return lab.querySelector('[data-val="' + k + '"]'); };
  var labRing = new Ring(lab.querySelector("[data-lab-ring]"));

  var sel = inp("q");
  PRIMES.forEach(function (p) {
    var o = document.createElement("option");
    o.value = p;
    o.textContent = "q = " + p;
    sel.appendChild(o);
  });

  var sup = function (s) { return "<sup>" + s + "</sup>"; };
  var smallestRoot = function (q) {
    for (var a = 2; a < q; a++) if (order(a, q) === q - 1) return a;
    return 2;
  };
  var rand = function (lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); };

  function clamp() {
    var q = state.q;
    state.alpha = Math.min(Math.max(state.alpha, 2), q - 1);
    state.xa = Math.min(Math.max(state.xa, 1), q - 2);
    state.xb = Math.min(Math.max(state.xb, 1), q - 2);
  }

  function syncInputs() {
    sel.value = state.q;
    inp("alpha").max = state.q - 1;
    inp("xa").max = state.q - 2;
    inp("xb").max = state.q - 2;
    ["alpha", "xa", "xb"].forEach(function (k) {
      inp(k).value = state[k];
      val(k).textContent = state[k];
    });
  }

  function render(animate) {
    var q = state.q, a = state.alpha, xa = state.xa, xb = state.xb;
    var ya = modpow(a, xa, q), yb = modpow(a, xb, q);
    var ka = modpow(yb, xa, q), kb = modpow(ya, xb, q);
    var ord = order(a, q);
    var primitive = ord === q - 1;

    // Eve tries x = 1, 2, 3, ... until a^x matches Alice's public key.
    var eveX = 1;
    while (modpow(a, eveX, q) !== ya) eveX++;

    out("ya").textContent = ya;
    out("yb").textContent = yb;
    out("ka").textContent = ka;
    out("kb").innerHTML = kb + (ka === kb ? '<span class="ok">✓</span>' : '<span class="no">✗</span>');
    out("ord").innerHTML = ord + (primitive ? '<span class="ok">= q − 1</span>' : '<span class="no">≠ q − 1</span>');
    out("space").innerHTML = ord + "<small>of " + (q - 1) + "</small>";
    out("eve").innerHTML = eveX + "<small>" + (eveX === 1 ? "try" : "tries") + "</small>";

    // Square-and-multiply trace for Alice's public key.
    var bits = xa.toString(2);
    var parts = [], used = [], p = a % q;
    for (var i = 0; i < bits.length; i++) {
      var on = bits[bits.length - 1 - i] === "1";
      var e = Math.pow(2, i);
      parts.push('<span class="bit' + (on ? " on" : "") + '">' + a + sup(e) + " ≡ " + p + "</span>");
      if (on) used.push({ e: e, v: p });
      p = (p * p) % q;
    }
    used.reverse();
    var product = used.map(function (u) { return a + sup(u.e); }).join(" · ");
    var values = used.map(function (u) { return u.v; }).join(" · ");
    out("trace").innerHTML =
      '<span class="lbl">Square-and-multiply for Alice</span>' +
      "<i>X</i><sub>a</sub> = " + xa + " = " + bits + "<sub>2</sub> &nbsp;→&nbsp; " + parts.join(" ") +
      "<br><i>Y</i><sub>a</sub> = " + product + (used.length > 1 ? " ≡ " + values : "") + " ≡ <b>" + ya + "</b> (mod " + q + ")";

    var note;
    if (primitive) {
      note = "<b>" + a + " is a primitive root mod " + q + ".</b> Its powers reach all " + (q - 1) +
        " nonzero residues, so every private key from 1 to " + (q - 2) + " gives a different public key. Eve found <span class=\"m\">X</span> = " + eveX +
        " by trying exponents in order, which only works because <span class=\"m\">q</span> is tiny. A 2048-bit prime leaves about 10" + sup("616") + " candidates.";
    } else {
      note = "<b>" + a + " is not a primitive root mod " + q + ".</b> ord(" + a + ") = " + ord + ", so ⟨" + a + "⟩ holds only " + ord + " of the " + (q - 1) +
        " nonzero residues and <span class=\"m\">K</span> can take only " + ord + " values. <code>Validator</code> only checks 1 &lt; α &lt; q, so the program would still accept this base.";
      if (eveX !== xa) {
        note += " Eve's <span class=\"m\">X</span> = " + eveX + " is not Alice's " + xa + ", but it yields the same key because the two agree mod " + ord + ".";
      }
    }
    var noteEl = out("note");
    noteEl.innerHTML = note;
    noteEl.style.setProperty("--c", primitive ? "var(--key)" : "var(--eve)");

    // Ring: the cycle 1 → α → α² → … → 1, then the three marked values.
    labRing.build(q, ["⟨" + a + "⟩"], ord + " of " + (q - 1) + " residues");
    var x = 1, step = Math.min(40, 900 / ord);
    labRing.light(1);
    for (var k = 1; k <= ord; k++) {
      var nx = (x * a) % q;
      labRing.chord(x, nx, animate && !reduceMotion ? Math.round(k * step) : null);
      labRing.light(nx);
      x = nx;
    }
    labRing.mark(ya, "a", ["Y", "a"]);
    labRing.mark(yb, "b", ["Y", "b"]);
    labRing.mark(ka, "k", ["K", ""]);
  }

  function update(animate) {
    clamp();
    syncInputs();
    render(animate);
  }

  sel.addEventListener("change", function () { state.q = +sel.value; update(true); });
  ["alpha", "xa", "xb"].forEach(function (k) {
    inp(k).addEventListener("input", function () { state[k] = +inp(k).value; update(false); });
  });
  lab.querySelector('[data-act="example"]').addEventListener("click", function () {
    state = { q: 23, alpha: 5, xa: 6, xb: 15 };
    update(true);
  });
  lab.querySelector('[data-act="root"]').addEventListener("click", function () {
    state.alpha = smallestRoot(state.q);
    update(true);
  });
  lab.querySelector('[data-act="random"]').addEventListener("click", function () {
    state.q = PRIMES[rand(3, PRIMES.length - 1)];
    state.alpha = rand(2, state.q - 1);
    state.xa = rand(1, state.q - 2);
    state.xb = rand(1, state.q - 2);
    update(true);
  });

  update(false);
  lab.addEventListener("reveal", function () { render(true); });
  if (lab.classList.contains("in")) render(true);
})();
