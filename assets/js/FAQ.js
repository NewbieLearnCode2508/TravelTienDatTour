document.addEventListener("DOMContentLoaded", () => {
    const contentTitles = document.querySelectorAll(".content__introduce-content-title");

    contentTitles.forEach(title => {
        title.addEventListener("click", function () {
            const contentBox = this.nextElementSibling;
            contentBox.classList.toggle("active");
            if (contentBox.style.display === "block") {
                contentBox.style.display = "none";
            } else {
                contentBox.style.display = "block";
            }
        });
    });
});
