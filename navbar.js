const navbarContainer = document.querySelector('.sidebar');
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((dropdown) => {
    dropdown.querySelector('.fa-caret-down').addEventListener("click", () => {
        dropdown.querySelector('.dropdown-content').classList.toggle('openMenu');
    })
})

window.addEventListener('scroll', () => {
    if (window.innerWidth > 1000) {
        const scrollHeight = window.pageYOffset;
        if (scrollHeight > 70) {
            navbarContainer.classList.add('fixedNav');
        }
        else {
            navbarContainer.classList.remove('fixedNav');
        }
    }

})

const toggleBtn = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("show-sidebar");
});
closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar");
});