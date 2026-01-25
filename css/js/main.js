document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("briefForm");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = form.name.value;
        const project = form.project.value;
        const budget = form.budget.value;
        const notes = form.notes.value;

        const message = `يا هلا Alaa..%0Aأنا ${name}%0Aمحتاج شغل: ${project}%0Aالميزانية: ${budget}%0Aالتفاصيل: ${notes}`;
        
        const phone = "201064255553"; // رقم تليفونك
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    });

    // سكرول ناعم
  document.addEventListener("DOMContentLoaded", () => {
    // كود فورم الواتساب
    const form = document.getElementById("briefForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = form.name.value;
            const project = form.project.value;
            const budget = form.budget ? form.budget.value : "غير محدد";
            const notes = form.notes.value;

            const message = `يا هلا..%0Aأنا ${name}%0Aمحتاج شغل: ${project}%0Aالميزانية: ${budget}%0Aالتفاصيل: ${notes}`;
            const phone = "201064255553"; 
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        });
    }

    // سكرول ناعم للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});