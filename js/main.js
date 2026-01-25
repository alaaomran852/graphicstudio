/* =========================================================
   GraphicStudio — Main Logic
   Author: Alaa Omran
   Description: Handles Theme, WhatsApp Form, and Portfolio
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. إعدادات عامة (رقم الواتساب بتاعك)
    const CONFIG = {
        phone: "201064255553", // رقمك بدون +
        defaultMsg: "مرحبًا، أريد الاستفسار عن خدمات التصميم."
    };

    /* =====================================================
       2. الوضع الليلي / النهاري (Dark/Light Mode)
    ===================================================== */
    const themeBtn = document.getElementById("themeToggle");
    const body = document.body;
    
    // التحقق من الإعدادات المحفوظة
    if (localStorage.getItem("gs_theme") === "light") {
        body.classList.add("light");
        if(themeBtn) themeBtn.textContent = "☀️";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light");
            const isLight = body.classList.contains("light");
            
            // حفظ التفضيل
            localStorage.setItem("gs_theme", isLight ? "light" : "dark");
            themeBtn.textContent = isLight ? "☀️" : "🌙";
        });
    }

    /* =====================================================
       3. فورم البريف (Brief Form to WhatsApp)
    ===================================================== */
    const briefForm = document.getElementById("briefForm");

    if (briefForm) {
        briefForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // تجميع البيانات من الفورم
            const formData = new FormData(briefForm);
            const name = formData.get("name") || "غير محدد";
            const service = formData.get("service") || "غير محدد";
            const notes = formData.get("notes") || "لا توجد تفاصيل إضافية";

            // تنسيق الرسالة بشكل احترافي
            const message = 
`👋 مرحباً Alaa Omran،
أنا: ${name}

🚀 بخصوص مشروع: ${service}

📝 التفاصيل:
${notes}

-----------------------
أرجو الرد بالتفاصيل والسعر.`;

            // فتح الواتساب
            const url = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        });
    }

    /* =====================================================
       4. معرض الأعمال (Dynamic Portfolio)
       * بيشتغل بس لو صفحة الأعمال مفتوحة *
    ===================================================== */
    const grid = document.getElementById("grid");
    const filtersContainer = document.getElementById("filters");

    if (grid && filtersContainer) {
        
        // بيانات المشاريع (ممكن تزود براحتك هنا)
        const projects = [
            { title: "هوية شركة تقنية", cat: "branding", desc: "تصميم شعار وهوية كاملة لشركة برمجيات" },
            { title: "إنفوجرافيك طبي", cat: "infographic", desc: "تبسيط إجراءات طبية معقدة" },
            { title: "حملة سوشيال ميديا", cat: "social", desc: "تصميمات انستجرام وفيسبوك" },
            { title: "براند مطعم برجر", cat: "branding", desc: "هوية بصرية كاملة وتغليف" },
            { title: "تقرير سنوي", cat: "infographic", desc: "تحويل البيانات لرسوم بيانية" },
            { title: "إعلانات رمضان", cat: "social", desc: "حملة إعلانية موسمية" },
        ];

        // 1. إنشاء أزرار الفلتر
        const categories = ["الكل", "branding", "infographic", "social"];
        const catNames = { "الكل": "الكل", "branding": "هوية بصرية", "infographic": "إنفوجرافيك", "social": "سوشيال ميديا" };

        let activeCat = "الكل";

        // دالة رسم الأزرار
        const renderFilters = () => {
            filtersContainer.innerHTML = categories.map(cat => `
                <button class="filterBtn ${cat === activeCat ? 'active' : ''}" data-cat="${cat}">
                    ${catNames[cat]}
                </button>
            `).join("");

            // تشغيل ضغطة الزر
            document.querySelectorAll(".filterBtn").forEach(btn => {
                btn.addEventListener("click", () => {
                    activeCat = btn.dataset.cat;
                    renderProjects();
                    renderFilters(); // إعادة رسم الأزرار لتحديث الـ active
                });
            });
        };

        // دالة رسم المشاريع
        const renderProjects = () => {
            grid.innerHTML = "";
            
            const filtered = activeCat === "الكل" 
                ? projects 
                : projects.filter(p => p.cat === activeCat);

            if (filtered.length === 0) {
                grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--muted);">لا توجد مشاريع في هذا القسم حالياً.</p>`;
                return;
            }

            filtered.forEach(p => {
                const card = document.createElement("article");
                card.className = "card work-card-anim"; // كلاس للأنيميشن
                card.innerHTML = `
                    <div style="height: 200px; background: #1a1f2e; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; border-radius: 12px; color: #4a5568;">
                        <span style="font-size: 3rem;">🖼️</span>
                    </div>
                    <h3 style="margin-bottom: 5px;">${p.title}</h3>
                    <p style="color: var(--muted); font-size: 0.9rem;">${p.desc}</p>
                    <a href="https://wa.me/${CONFIG.phone}?text=ممكن تفاصيل عن مشروع: ${p.title}" target="_blank" class="btn-text" style="color: var(--blue-tech); font-weight: bold; margin-top: 10px; display: inline-block;">اطلب مثله ←</a>
                `;
                grid.appendChild(card);
            });
        };

        // التشغيل الأولي
        renderFilters();
        renderProjects();
    }

    /* =====================================================
       5. روابط الواتساب العامة
    ===================================================== */
    const waLinks = document.querySelectorAll("#waTop");
    waLinks.forEach(link => {
        link.href = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(CONFIG.defaultMsg)}`;
        link.target = "_blank";
    });

});