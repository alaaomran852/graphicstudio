/* =========================================================
   GraphicStudio — Global JS
   Author: Alaa Omran
   Scope: Theme + Language + WhatsApp + Portfolio + Brief
   Notes: Safe init per page (no errors if element missing)
========================================================= */

(() => {
  "use strict";

  /* ===================== CONFIG ===================== */
  const CONFIG = {
    whatsappPhone: "201064255553", // without + or 00
    defaultMessage: "مرحبًا، أريد الاستفسار عن خدمات التصميم (هوية/إنفوجرافيك/سوشيال).",
    storageKeys: {
      theme: "gs_theme",   // 'dark' | 'light'
      lang: "gs_lang"      // 'ar' | 'en'
    }
  };

  /* ===================== HELPERS ===================== */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const safeText = (v) => (v ?? "").toString().trim();

  const waLink = (text) => {
    const msg = safeText(text) || CONFIG.defaultMessage;
    return `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(msg)}`;
  };

  const setAttr = (el, name, value) => { if (el) el.setAttribute(name, value); };
  const setHref = (el, href) => { if (el) el.href = href; };

  /* ===================== YEAR ===================== */
  const initYear = () => {
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  };

  /* ===================== THEME ===================== */
  const applyTheme = (theme) => {
    // theme: 'dark' | 'light'
    const isLight = theme === "light";
    document.body.classList.toggle("light", isLight);
    localStorage.setItem(CONFIG.storageKeys.theme, isLight ? "light" : "dark");
  };

  const initTheme = () => {
    const themeBtn = $("#themeToggle");
    const saved = localStorage.getItem(CONFIG.storageKeys.theme);
    if (saved === "light") document.body.classList.add("light");

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light");
        localStorage.setItem(CONFIG.storageKeys.theme, isLight ? "light" : "dark");
      });
    }
  };

  /* ===================== LANGUAGE (DIR/LANG) ===================== */
  const applyLang = (lang) => {
    const normalized = (lang === "en") ? "en" : "ar";
    document.documentElement.lang = normalized;
    document.documentElement.dir = (normalized === "ar") ? "rtl" : "ltr";
    localStorage.setItem(CONFIG.storageKeys.lang, normalized);

    const langBtn = $("#langToggle");
    if (langBtn) langBtn.textContent = normalized.toUpperCase();
  };

  const initLang = () => {
    const langBtn = $("#langToggle");
    const saved = localStorage.getItem(CONFIG.storageKeys.lang) || "ar";
    applyLang(saved);

    if (langBtn) {
      langBtn.addEventListener("click", () => {
        const cur = localStorage.getItem(CONFIG.storageKeys.lang) || "ar";
        applyLang(cur === "ar" ? "en" : "ar");
      });
    }
  };

  /* ===================== WHATSAPP LINKS ===================== */
  const initWhatsApp = () => {
    setHref($("#waTop"), waLink(CONFIG.defaultMessage));
    setHref($("#waFloat"), waLink(CONFIG.defaultMessage));
  };

  /* ===================== FAQ (Accordion) ===================== */
  const initFAQ = () => {
    const qs = $$(".q");
    if (!qs.length) return;

    qs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const panel = btn.nextElementSibling;
        if (!panel) return;
        panel.style.display = (panel.style.display === "block") ? "none" : "block";
      });
    });
  };

  /* ===================== PORTFOLIO ===================== */
  const PORTFOLIO = {
    // Edit ONLY this array to customize projects
    projects: [
      { id:"p1", cat:"هوية", title:"هوية — شركة تقنية", sub:"Logo + System + Mockups", deliver:["Logo","Colors","Typography","Mockups"], tools:["AI","PS"], time:"3 أيام" },
      { id:"p2", cat:"هوية", title:"هوية — متجر", sub:"Rebrand + Visual Language", deliver:["Logo","Guidelines","Assets"], tools:["AI"], time:"4 أيام" },
      { id:"p3", cat:"إنفوجرافيك", title:"إنفوجرافيك — طبي", sub:"A4 + IG", deliver:["A4 PDF","IG Post","Carousel"], tools:["AI"], time:"48 ساعة" },
      { id:"p4", cat:"إنفوجرافيك", title:"إنفوجرافيك — تعليمي", sub:"Hierarchy + Icons", deliver:["A4","Slide"], tools:["AI"], time:"24 ساعة" },
      { id:"p5", cat:"سوشيال", title:"سوشيال — حملة", sub:"12 Post + 6 Story", deliver:["Posts","Stories","Covers"], tools:["PS"], time:"48 ساعة" },
      { id:"p6", cat:"سوشيال", title:"سوشيال — براند", sub:"Templates System", deliver:["Templates","Grid"], tools:["PS"], time:"3 أيام" },
      { id:"p7", cat:"باكجنج", title:"Packaging — ليبل", sub:"Label + Mockups", deliver:["Label","Mockups"], tools:["AI","PS"], time:"72 ساعة" },
      { id:"p8", cat:"مواد", title:"بروفايل شركة", sub:"Company Profile PDF", deliver:["PDF","Print Ready"], tools:["AI","ID"], time:"5 أيام" },
      { id:"p9", cat:"مواد", title:"بروشور", sub:"Tri-fold / A4", deliver:["PDF","Source"], tools:["ID"], time:"3 أيام" }
    ]
  };

  const initPortfolio = () => {
    const filtersEl = $("#filters");
    const gridEl = $("#grid");
    const modal = $("#modal");
    const overlay = $("#overlay");
    const closeBtn = $("#close");
    const modalBody = $("#modalBody");

    // Only init on portfolio page where these elements exist
    if (!filtersEl || !gridEl) return;

    const PROJECTS = PORTFOLIO.projects;

    const cats = ["الكل", ...Array.from(new Set(PROJECTS.map(p => p.cat)))];
    let active = "الكل";

    const renderChips = () => {
      filtersEl.innerHTML = "";
      cats.forEach((label) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "chip" + (label === active ? " active" : "");
        b.textContent = label;
        b.addEventListener("click", () => {
          active = label;
          render();
        });
        filtersEl.appendChild(b);
      });
    };

    const renderCards = () => {
      gridEl.innerHTML = "";
      const list = (active === "الكل") ? PROJECTS : PROJECTS.filter(p => p.cat === active);

      list.forEach((p) => {
        const d = document.createElement("div");
        d.className = "project";
        d.innerHTML = `
          <div class="kicker">${p.cat}</div>
          <h3>${p.title}</h3>
          <div class="meta">${p.sub}</div>
        `;
        d.addEventListener("click", () => openModal(p));
        gridEl.appendChild(d);
      });
    };

    const openModal = (p) => {
      if (!modal || !modalBody) return;

      const requestMsg = `مرحبًا، أريد مشروع مشابه: ${p.title}`;

      modalBody.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.sub}</p>
        <div class="tags">
          ${p.deliver.map(x => `<span class="tag">${x}</span>`).join("")}
          ${p.tools.map(x => `<span class="tag">${x}</span>`).join("")}
          <span class="tag">المدة: ${p.time}</span>
        </div>
        <a class="btn btnPrimary" target="_blank" rel="noopener" href="${waLink(requestMsg)}">اطلب مثل هذا</a>
      `;

      modal.classList.add("show");
      setAttr(modal, "aria-hidden", "false");
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove("show");
      setAttr(modal, "aria-hidden", "true");
    };

    // Wire modal close
    if (overlay) overlay.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    const render = () => {
      renderChips();
      renderCards();
    };

    render();
  };

  /* ===================== BRIEF FORM ===================== */
  const initBriefForm = () => {
    const form = $("#briefForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());

      const name = safeText(data.name);
      const email = safeText(data.email);
      const industry = safeText(data.industry);
      const service = safeText(data.service);
      const goal = safeText(data.goal);
      const notes = safeText(data.notes);
      const budget = safeText(data.budget) || "غير محدد";
      const timeline = safeText(data.timeline) || "غير محدد";

      const text =
`مرحبًا، هذا بريف مشروع:

- الاسم: ${name}
- الإيميل: ${email}
- المجال: ${industry}
- الخدمة: ${service}
- الهدف: ${goal}
- الميزانية: ${budget}
- المدة: ${timeline}

- التفاصيل:
${notes}

أريد عرض سعر وخطة تنفيذ.`;

      window.open(waLink(text), "_blank");
    });
  };

  /* ===================== BOOT ===================== */
  const boot = () => {
    initYear();
    initTheme();
    initLang();
    initWhatsApp();
    initFAQ();
    initPortfolio();
    initBriefForm();
  };

  // Ensure DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
