/* ============================================================
   VORYZAQ SERVICES — interactions
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById("preloader");
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("is-hidden");
      document.body.classList.add("loaded");
    }, reduceMotion ? 0 : 900);
  });
  // Fallback in case load event is delayed
  setTimeout(function () {
    preloader.classList.add("is-hidden");
    document.body.classList.add("loaded");
  }, 3000);

  /* ---------- Custom cursor ---------- */
  var dot = document.getElementById("cursorDot");
  var ring = document.getElementById("cursorRing");
  var mx = 0, my = 0, rx = 0, ry = 0;
  var hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hasFinePointer) {
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px)";
      moveSpot(e.clientX, e.clientY);
    });

    (function raf() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(raf);
    })();

    document.querySelectorAll("a, button, .magnetic, input, textarea, select").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("is-active"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("is-active"); });
    });

    document.querySelectorAll(".section--dark, .hero, .pf-hero, .legal-hero, .cta, .footer").forEach(function (el) {
      el.addEventListener("mouseenter", function () { document.body.classList.add("cursor-invert"); });
      el.addEventListener("mouseleave", function () { document.body.classList.remove("cursor-invert"); });
    });
  }

  /* ---------- Blueprint spotlight ---------- */
  var spot = document.getElementById("blueprintSpot");
  function moveSpot(x, y) {
    if (!spot) return;
    spot.style.left = x + "px";
    spot.style.top = y + "px";
  }

  /* ---------- Tilt hover on project previews ---------- */
  if (hasFinePointer && !reduceMotion) {
    document.querySelectorAll(".tilt").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(700px) rotateX(" + (py * -6) + "deg) rotateY(" + (px * 8) + "deg) translateY(-4px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Blueprint parallax on scroll ---------- */
  var grid = document.querySelector(".blueprint-grid");
  if (grid && !reduceMotion) {
    window.addEventListener("scroll", function () {
      grid.style.transform = "translateY(" + window.scrollY * 0.06 + "px)";
    }, { passive: true });
  }

  /* ---------- Magnetic buttons ---------- */
  if (hasFinePointer && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var relX = e.clientX - r.left - r.width / 2;
        var relY = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + relX * 0.28 + "px," + relY * 0.5 + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "translate(0,0)";
      });
    });
  }

  /* ---------- Nav scroll behavior ---------- */
  var nav = document.getElementById("siteNav");
  var lastY = window.scrollY;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    if (y > lastY && y > 200) {
      nav.classList.add("is-hidden");
    } else {
      nav.classList.remove("is-hidden");
    }
    lastY = y;
    updateCoord();
  }, { passive: true });

  /* ---------- Scroll coordinate readout (signature detail) ---------- */
  var coord = document.getElementById("scrollCoord");
  function updateCoord() {
    if (!coord) return;
    var pct = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 9999
    );
    coord.textContent = "X:" + String(mx | 0).padStart(4, "0") + " Y:" + String(pct).padStart(4, "0");
  }
  updateCoord();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Mobile nav toggle ---------- */
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      links.style.display = open ? "flex" : "";
      if (open) {
        links.style.cssText =
          "display:flex;flex-direction:column;position:fixed;top:var(--nav-h);left:0;right:0;background:var(--paper);padding:28px 40px;gap:20px;border-bottom:1px solid var(--line-dark);";
      } else {
        links.removeAttribute("style");
      }
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        links.removeAttribute("style");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Portfolio filter ---------- */
  var filterTabs = document.getElementById("filterTabs");
  var pfGrid = document.getElementById("portfolioGrid");
  var pfEmpty = document.getElementById("pfEmpty");
  if (filterTabs && pfGrid) {
    var cards = Array.prototype.slice.call(pfGrid.querySelectorAll(".portfolio-card"));

    function applyFilter(cat) {
      var visibleCount = 0;
      cards.forEach(function (card) {
        var match = cat === "all" || card.dataset.cat === cat;
        if (match) {
          visibleCount++;
          card.classList.remove("is-hidden");
          card.classList.add("is-fading");
          // force reflow so the fade-in transition actually runs
          void card.offsetWidth;
          requestAnimationFrame(function () { card.classList.remove("is-fading"); });
        } else {
          card.classList.add("is-fading");
          setTimeout(function () {
            if (card.classList.contains("is-fading")) card.classList.add("is-hidden");
          }, 320);
        }
      });
      if (pfEmpty) pfEmpty.hidden = visibleCount !== 0;
    }

    filterTabs.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterTabs.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      applyFilter(btn.dataset.filter);
    });
  }

  /* ---------- Cookie consent banner ---------- */
  var cookieBanner = document.getElementById("cookieBanner");
  var cookieAccept = document.getElementById("cookieAccept");
  if (cookieBanner) {
    var CONSENT_KEY = "voryzaq_cookie_notice_dismissed";
    var alreadyDismissed = false;
    try { alreadyDismissed = localStorage.getItem(CONSENT_KEY) === "1"; } catch (e) {}
    if (!alreadyDismissed) {
      setTimeout(function () { cookieBanner.classList.add("is-visible"); }, 1200);
    }
    if (cookieAccept) {
      cookieAccept.addEventListener("click", function () {
        cookieBanner.classList.remove("is-visible");
        try { localStorage.setItem(CONSENT_KEY, "1"); } catch (e) {}
      });
    }
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var submitBtn = document.getElementById("formSubmit");
  if (form) {
    var noteDefault = note.textContent;
    var endpointIsPlaceholder = /YOUR_FORM_ID/.test(form.getAttribute("action") || "");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (endpointIsPlaceholder) {
        note.textContent = "Form isn't connected yet — add your Formspree endpoint to the form's action attribute (see README).";
        note.style.color = "#b3261e";
        return;
      }

      var btnLabel = submitBtn.querySelector("span");
      var btnLabelDefault = btnLabel.textContent;
      submitBtn.disabled = true;
      btnLabel.textContent = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            note.textContent = "Thanks — your message is in. We usually reply within a day.";
            note.style.color = "var(--ink)";
            form.reset();
          } else {
            return response.json().then(function (data) {
              var msg = (data && data.errors && data.errors.map(function (x) { return x.message; }).join(", ")) ||
                "Something went wrong sending that — please email hello@voryzaq.com directly.";
              note.textContent = msg;
              note.style.color = "#b3261e";
            });
          }
        })
        .catch(function () {
          note.textContent = "Network error — please try again, or email hello@voryzaq.com directly.";
          note.style.color = "#b3261e";
        })
        .finally(function () {
          submitBtn.disabled = false;
          btnLabel.textContent = btnLabelDefault;
        });
    });
  }
})();
