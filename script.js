function checkFullscreenStatus() {
    if (document.fullscreenElement === null) {
        alert("This page is best viewed in fullscreen");
    }
}

window.addEventListener('DOMContentLoaded', checkFullscreenStatus);

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        alert("This page is best viewed in fullscreen");
    }
});