/* Lumen Lane Salon - nav, sticky book bar helpers, before/after slider, form UI */

(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-open", !open);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.focus();
      }
    });
  }

  /* ---------- Before / After slider ---------- */
  function initBaSlider(root) {
    var wrap = root.querySelector(".ba-before-wrap");
    var beforeImg = root.querySelector(".ba-before");
    var handle = root.querySelector(".ba-handle");
    var afterImg = root.querySelector(".ba-after");
    if (!wrap || !beforeImg || !handle) return;

    var position = 50; // percent
    var dragging = false;

    function syncBeforeWidth() {
      var w = root.getBoundingClientRect().width;
      beforeImg.style.width = w + "px";
      root.style.setProperty("--ba-full-width", w + "px");
    }

    function setPosition(pct) {
      position = Math.max(0, Math.min(100, pct));
      wrap.style.width = position + "%";
      handle.style.left = position + "%";
      handle.setAttribute("aria-valuenow", String(Math.round(position)));
    }

    function pointerToPct(clientX) {
      var rect = root.getBoundingClientRect();
      if (rect.width <= 0) return position;
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onPointerDown(e) {
      dragging = true;
      root.classList.add("is-dragging");
      if (e.pointerId != null && handle.setPointerCapture) {
        try {
          handle.setPointerCapture(e.pointerId);
        } catch (err) { /* ignore */ }
      }
      setPosition(pointerToPct(e.clientX));
      e.preventDefault();
    }

    function onPointerMove(e) {
      if (!dragging) return;
      setPosition(pointerToPct(e.clientX));
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      root.classList.remove("is-dragging");
      if (e.pointerId != null && handle.releasePointerCapture) {
        try {
          handle.releasePointerCapture(e.pointerId);
        } catch (err) { /* ignore */ }
      }
    }

    handle.addEventListener("pointerdown", onPointerDown);
    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
    handle.addEventListener("pointercancel", onPointerUp);

    /* Click / drag anywhere on the slider */
    root.addEventListener("pointerdown", function (e) {
      if (e.target === handle || handle.contains(e.target)) return;
      dragging = true;
      root.classList.add("is-dragging");
      setPosition(pointerToPct(e.clientX));
      if (e.pointerId != null && root.setPointerCapture) {
        try {
          root.setPointerCapture(e.pointerId);
        } catch (err) { /* ignore */ }
      }
    });
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);

    /* Keyboard */
    handle.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 10 : 2;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        setPosition(position - step);
        e.preventDefault();
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        setPosition(position + step);
        e.preventDefault();
      } else if (e.key === "Home") {
        setPosition(0);
        e.preventDefault();
      } else if (e.key === "End") {
        setPosition(100);
        e.preventDefault();
      }
    });

    /* Keep before image full-bleed width on resize */
    var ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(function () {
        syncBeforeWidth();
        setPosition(position);
      });
      ro.observe(root);
    } else {
      window.addEventListener("resize", function () {
        syncBeforeWidth();
        setPosition(position);
      });
    }

    function ready() {
      syncBeforeWidth();
      setPosition(50);
    }

    if (beforeImg.complete && afterImg && afterImg.complete) {
      ready();
    } else {
      var pending = 2;
      function done() {
        pending -= 1;
        if (pending <= 0) ready();
      }
      beforeImg.addEventListener("load", done);
      if (afterImg) afterImg.addEventListener("load", done);
      else pending = 1;
      /* fallback if cached */
      setTimeout(ready, 100);
    }
  }

  document.querySelectorAll("[data-ba-slider]").forEach(initBaSlider);

  /* ---------- Front-end-only forms ---------- */
  document.querySelectorAll("[data-mock-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = form.querySelector(".form-success");
      if (success) {
        success.classList.add("is-visible");
        success.setAttribute("role", "status");
      }
      form.reset();
      if (success) {
        success.focus && success.focus();
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });
})();
