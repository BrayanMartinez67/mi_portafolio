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
            }

            themeToggle.textContent = "☀️";
            themeToggle.setAttribute("aria-label", "Cambiar a modo oscuro");
        } else {
            try {
                localStorage.setItem("theme", "dark");
            } catch (error) {
            }

            themeToggle.textContent = "🌙";
            themeToggle.setAttribute("aria-label", "Cambiar a modo claro");
        }
    });
}

const translations = {
    es: {
        "nav.home": "Inicio",
        "nav.about": "Sobre mí",
        "nav.skills": "Habilidades",
        "nav.projects": "Proyectos",
        "nav.contact": "Contacto",
        "hero.tag": "PORTAFOLIO PERSONAL",
        "hero.greeting": "Hola, soy",
        "hero.subtitle": "Estudiante de Ingeniería de Software",
        "hero.description": "Soy estudiante de Ingeniería de Software apasionado por el desarrollo de aplicaciones web, la inteligencia artificial y la gestión de bases de datos. Me interesa crear soluciones tecnológicas funcionales, modernas y fáciles de utilizar.",
        "hero.meta.one": "Disponible para proyectos",
        "hero.meta.two": "Frontend · Backend · IA",
        "hero.button.primary": "Ver proyectos",
        "hero.button.secondary": "Contactarme"
    },
    en: {
        "nav.home": "Home",
        "nav.about": "About me",
        "nav.skills": "Skills",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "hero.tag": "PERSONAL PORTFOLIO",
        "hero.greeting": "Hi, I am",
        "hero.subtitle": "Software Engineering Student",
        "hero.description": "I am a Software Engineering student passionate about web application development, artificial intelligence, and database management. I am interested in creating functional, modern, and easy-to-use technological solutions.",
        "hero.meta.one": "Available for projects",
        "hero.meta.two": "Frontend · Backend · AI",
        "hero.button.primary": "View projects",
        "hero.button.secondary": "Contact me"
    }
};

const langButtons = document.querySelectorAll(".lang-btn");
const i18nNodes = document.querySelectorAll("[data-i18n]");

let currentLanguage = "es";

const applyLanguage = (language) => {
    currentLanguage = language;
    document.documentElement.lang = language;

    i18nNodes.forEach((node) => {
        const key = node.dataset.i18n;
        const translation = translations[language]?.[key];

        if (translation) {
            node.textContent = translation;
        }
    });

    langButtons.forEach((button) => {
        const isActive = button.dataset.lang === language;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    try {
        localStorage.setItem("lang", language);
    } catch (error) {
    }
};

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyLanguage(button.dataset.lang);
    });
});

let savedLanguage = "es";

try {
    savedLanguage = localStorage.getItem("lang") || "es";
} catch (error) {
    savedLanguage = "es";
}

applyLanguage(savedLanguage);


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


const revealItems = document.querySelectorAll(
    ".section-header, .about-grid, .highlight-item, .skill-category, .project-card, .contact-grid, .contact-info, .contact-form-wrapper"
);

if (revealItems.length > 0 && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: "0px 0px -30px 0px"
    });

    revealItems.forEach((item) => {
        item.classList.add("reveal");
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach((item) => item.classList.add("visible"));
}


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

/* =====================================================
   DESIGN SYSTEM FLOATING PANEL
===================================================== */

const designSystemToggle = document.getElementById("design-system-toggle");
const designSystemPanel = document.getElementById("design-system-panel");
const designSystemClose = document.getElementById("design-system-close");

if (designSystemToggle && designSystemPanel) {
    const openDesignSystem = () => {
        designSystemPanel.classList.add("active");
        designSystemPanel.setAttribute("aria-hidden", "false");
        designSystemToggle.setAttribute("aria-expanded", "true");
    };

    const closeDesignSystem = () => {
        designSystemPanel.classList.remove("active");
        designSystemPanel.setAttribute("aria-hidden", "true");
        designSystemToggle.setAttribute("aria-expanded", "false");
    };

    designSystemToggle.addEventListener("click", () => {
        const isOpen = designSystemPanel.classList.contains("active");
        if (isOpen) {
            closeDesignSystem();
        } else {
            openDesignSystem();
        }
    });

    if (designSystemClose) {
        designSystemClose.addEventListener("click", closeDesignSystem);
    }

    designSystemPanel.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.close === "true") {
            closeDesignSystem();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && designSystemPanel.classList.contains("active")) {
            closeDesignSystem();
        }
    });
}