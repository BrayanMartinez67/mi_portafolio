/* =====================================================
   MENÚ RESPONSIVE
===================================================== */

const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {

        navList.classList.toggle("active");

        const menuOpen = navList.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", String(menuOpen));

        if (menuOpen) {
            menuToggle.setAttribute("aria-label", "Cerrar menú");
            menuToggle.textContent = "✕";
        } else {
            menuToggle.setAttribute("aria-label", "Abrir menú");
            menuToggle.textContent = "☰";
        }

    });

    const navLinks = document.querySelectorAll(".nav-list a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navList.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
            menuToggle.textContent = "☰";
        });
    });
}


/* =====================================================
   MODO CLARO / OSCURO
===================================================== */

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("theme");
    } catch (error) {
        savedTheme = null;
    }

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Cambiar a modo oscuro");
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Cambiar a modo claro");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const lightMode = document.body.classList.contains("light-theme");

        if (lightMode) {
            try {
                localStorage.setItem("theme", "light");
            } catch (error) {
                // Ignorar si el almacenamiento no está disponible.
            }

            themeToggle.textContent = "☀️";
            themeToggle.setAttribute("aria-label", "Cambiar a modo oscuro");
        } else {
            try {
                localStorage.setItem("theme", "dark");
            } catch (error) {
                // Ignorar si el almacenamiento no está disponible.
            }

            themeToggle.textContent = "🌙";
            themeToggle.setAttribute("aria-label", "Cambiar a modo claro");
        }
    });
}


/* =====================================================
   FILTRO DE PROYECTOS
===================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach((card) => {
                const categories = card.dataset.category || "";

                if (selectedFilter === "all" || categories.includes(selectedFilter)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}


/* =====================================================
   VALIDACIÓN DEL FORMULARIO
===================================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const mensajeInput = document.getElementById("mensaje");
    const nombreError = document.getElementById("nombre-error");
    const emailError = document.getElementById("email-error");
    const mensajeError = document.getElementById("mensaje-error");
    const formMessage = document.getElementById("form-message");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        nombreError.textContent = "";
        emailError.textContent = "";
        mensajeError.textContent = "";
        formMessage.textContent = "";

        let formValid = true;

        const nombre = nombreInput.value.trim();

        if (nombre === "") {
            nombreError.textContent = "Ingrese su nombre.";
            formValid = false;
        } else if (nombre.length < 3) {
            nombreError.textContent = "El nombre debe tener al menos 3 caracteres.";
            formValid = false;
        }

        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.textContent = "Ingrese su correo electrónico.";
            formValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = "Ingrese un correo electrónico válido.";
            formValid = false;
        }

        const mensaje = mensajeInput.value.trim();

        if (mensaje === "") {
            mensajeError.textContent = "Ingrese un mensaje.";
            formValid = false;
        } else if (mensaje.length < 10) {
            mensajeError.textContent = "El mensaje debe tener al menos 10 caracteres.";
            formValid = false;
        }

        if (formValid) {
            formMessage.textContent = "✓ Formulario validado correctamente.";
            formMessage.style.color = "var(--color-success)";
            contactForm.reset();
        }
    });
}


/* =====================================================
   BOTÓN VOLVER ARRIBA
===================================================== */

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}