document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("briefForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = `مرحباً..%0Aأنا: ${form.name.value}%0Aمحتاج: ${form.project.value}%0Aالتفاصيل: ${form.notes.value}`;
            window.open(`https://wa.me/201064255553?text=${text}`, '_blank');
        });
    }
});
