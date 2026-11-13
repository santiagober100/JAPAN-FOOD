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

// Lógica de los Pop-ups (Modales) Actualizado teniendo en cuanta la corrección de la Tarea 3
const triggers = document.querySelectorAll('[data-modal]');
const closeButtons = document.querySelectorAll('.close-modal');
let ultimoTrigger = null;
const abrirModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        ultimoTrigger = document.activeElement;
        modal.style.display = 'flex';
        const botonCerrar = modal.querySelector('.close-modal');
        if (botonCerrar) botonCerrar.focus();
    }
};
const cerrarModal = (modal) => {
    modal.style.display = 'none';
    if (ultimoTrigger) {
        ultimoTrigger.focus();
        ultimoTrigger = null;
    }
};
triggers.forEach(trigger => {
    trigger.addEventListener('click', () => abrirModal(trigger.getAttribute('data-modal')));
    if (trigger.tagName !== 'BUTTON') {
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                abrirModal(trigger.getAttribute('data-modal'));
            }
        });
    }
});
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => cerrarModal(btn.closest('.modal')));
});
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        cerrarModal(event.target);
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach((modal) => {
            if (modal.style.display === 'flex') {
                cerrarModal(modal);
            }
        });
    }
});
//Actualización del código Tarea 4
const bannerSaludo = document.getElementById('saludo-banner');
const pintarSaludo = (idioma) => {
    if (!bannerSaludo) return;
    const hora = new Date().getHours();
    let mensaje;
    if (hora >= 5 && hora < 12) {
        mensaje = idioma === 'en'
            ? 'Good morning'
            : 'Buenos días'
    } else if (hora >= 12 && hora < 19) {
        mensaje = idioma === 'en'
            ? 'Good afternoon'
            : 'Buenas tardes'
    } else {
        mensaje = idioma === 'en'
            ? 'Good Evening'
            : 'Buenas Noches'
    }
    //Se escribe el mensaje en el banner
    bannerSaludo.textContent = mensaje;
}
//Menú desplegable
const dropdown = document.getElementById('dropdown-platillos');
const botonDropdown = document.getElementById('dropdown-boton');
const listaDropdown = document.getElementById('dropdown-lista');
if (dropdown && botonDropdown && listaDropdown) {
    //El mouse abre el menú
    dropdown.addEventListener('mouseover', (event) => {
        if (!dropdown.contains(event.relatedTarget)) {
            listaDropdown.classList.add('abierto');
            botonDropdown.setAttribute('aria-expanded', 'true');
        }
    });
    dropdown.addEventListener('mouseout', (event) => {
        if (!dropdown.contains(event.relatedTarget)) {
            listaDropdown.classList.remove('abierto');
            botonDropdown.setAttribute('aria-expanded', 'false');
        }
    });
    //Compatibilidad con la tecla tab
    dropdown.addEventListener('focusin', () => {
        listaDropdown.classList.add('abierto');
        botonDropdown.setAttribute('aria-expanded', 'true');
    });
    dropdown.addEventListener('focusout', (event) => {
        if (!dropdown.contains(event.relatedTarget)) {
            listaDropdown.classList.remove('abierto');
            botonDropdown.setAttribute('aria-expanded', 'false');
        }
    });
}
//Carrusel de imagenes Tarea 4
const slides = document.querySelectorAll('.slider-slide');
const puntos = document.querySelectorAll('.slider-punto');
const btnAnterior = document.getElementById('slider-anterior');
const btnSiguiente = document.getElementById('slider-siguiente');
const slider = document.getElementById('slider');
//Duración de cada imagen 6 segundos
const DURACION_SLIDE = 6000;
if (slides.length > 0 && btnAnterior && btnSiguiente) {
    //Imagen que se esta mostrando
    let indiceActual = 0;
    let intervalo = null;
    //Muestra la imagen del carrusel
    const mostrarSlide = (indice) => {
        if (indice >= slides.length) indice = 0;
        if (indice < 0) indice = slides.length - 1;
        indiceActual = indice;
        slides.forEach((slide, i) => slide.classList.toggle('activo', i === indiceActual));
        puntos.forEach((punto, i) => punto.classList.toggle('activo', i === indiceActual));
    };
    const siguiente = () => mostrarSlide(indiceActual + 1);
    const anterior = () => mostrarSlide(indiceActual - 1);
    //Cambia la imagen cada 6 segundos
    const iniciarAutoplay = () => {
        clearInterval(intervalo);
        intervalo = setInterval(siguiente, DURACION_SLIDE);
    };
    //Navegación manual
    btnSiguiente.addEventListener('click', () => {
        siguiente();
        iniciarAutoplay();
    });
    btnAnterior.addEventListener('click', () => {
        anterior();
        iniciarAutoplay();
    });
    puntos.forEach((punto) => {
        punto.addEventListener('click', () => {
            mostrarSlide(Number(punto.dataset.indice));
            iniciarAutoplay();
        });

    });
    //Pausa el carrusel al tener el cursosr en el slider
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(intervalo));
        slider.addEventListener('mouseleave', () => iniciarAutoplay());
    }
    //Iniciar el carrusel
    mostrarSlide(0);
    const hash = window.location.hash;
    if (hash) {
        const indiceHash = Array.from(slides).findIndex((slide) => slide.id === hash.slice(1));
        if (indiceHash !== -1) {
            mostrarSlide(indiceHash);
        }
    }
    iniciarAutoplay();
}
//Idioma Inglés / Español
const botonIdioma = document.getElementById('btn-idioma');
const traducibles = document.querySelectorAll('[data-es][data-en]');
let idiomaActual = localStorage.getItem('idioma-japanfood') || 'es';
//Aplica el idioma
const aplicarIdioma = (idioma) => {
    idiomaActual = idioma;
    traducibles.forEach((el) => {
        el.textContent = el.getAttribute(idioma === 'en' ? 'data-en' : 'data-es');
    });
    pintarSaludo(idioma);
    if (botonIdioma) {
        botonIdioma.textContent = idioma === 'en' ? 'EN' : 'ES';
    }
    //Actualiza el lang del html
    document.documentElement.setAttribute('lang', idioma);
    //Guarda el idioma el local
    localStorage.setItem('idioma-japanfood', idioma);
};
//Cambia de español a inglés
if (botonIdioma) {
    botonIdioma.addEventListener('click', () => {
        aplicarIdioma(idiomaActual == 'es' ? 'en' : 'es');
    });
}
//Aplica el idioma en todas las páginas
aplicarIdioma(idiomaActual);
