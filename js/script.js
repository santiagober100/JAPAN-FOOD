// 1. Lógica del Menú Lateral
const botonMenu = document.getElementById('btn-menu');
const menuLateral = document.getElementById('menu-lateral');

if (botonMenu && menuLateral) {
    botonMenu.addEventListener('click', function () {
        menuLateral.classList.toggle('abierto');
    });

    // Auto-cerrar menú al hacer clic en un enlace
    const enlacesMenu = document.querySelectorAll('.sidebar a');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuLateral.classList.remove('abierto');
        });
    });
}

// 2. Lógica de los Pop-ups (Modales)
const triggers = document.querySelectorAll('.card-popup-trigger');
triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    });
});

// Cerrar modales con la X
const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

// Cerrar modal si se hace clic fuera de la caja amarilla
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});
