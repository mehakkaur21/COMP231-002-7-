const sidebarToggleBtn = document.querySelector('.sidebarDashboardToggle');
const sidebarCloseBtn = document.querySelector('.sidebarDashboardClose');

const sidebar = document.querySelector("#sidebarDashboard");
const dashboardContainer = document.querySelector("#dashboardContainer");
sidebarToggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("hideDashboardSidebar");
    dashboardContainer.classList.toggle("marginFull");
});
sidebarCloseBtn.addEventListener("click", function () {
    console.log('helloo');
    sidebar.classList.add("hideDashboardSidebar");
    dashboardContainer.classList.add("marginFull");
});

window.addEventListener('resize',()=>{
    if(window.innerWidth<=850){
        sidebar.classList.add("hideDashboardSidebar");
        dashboardContainer.classList.add("marginFull");
    }else{
        sidebar.classList.remove("hideDashboardSidebar");
        dashboardContainer.classList.remove("marginFull");
    }
})