document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("briefForm");
    
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = form.name.value;
            const project = form.project.value;
            const service = form.service ? form.service.value : "";
            const notes = form.notes.value;

            const text = `مرحباً Alaa..%0Aأنا ${name}%0Aمحتاج شغل: ${project}%0Aالخدمة: ${service}%0Aالتفاصيل: ${notes}`;
            const phone = "201064255553"; 
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });
    }
});
