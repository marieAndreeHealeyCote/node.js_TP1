async function loadLayout(id, file) {
    const container = document.getElementById(id);
    if (!container) return;

    const response = await fetch(file);
    const html = await response.text();
    container.innerHTML = html;

    // Mettre le lien actif
    setActiveLink();
}

function setActiveLink() {
    const currentPage = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add(
                'font-bold',
                'underline',
                'text-yellow-300'
            );
        }
    });
}

loadLayout('header-container', '/assets/layouts/header.html');
loadLayout('footer-container', '/assets/layouts/footer.html');
