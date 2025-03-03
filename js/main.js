function loadHTML(id, file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${file}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = data;
                if (callback) callback(); // <-- Run any extra code after footer loads
            } else {
                console.error(`No element with ID "${id}" found in the document.`);
            }
        })
        .catch(error => console.error(`Failed to load ${file}:`, error));
}

// This runs after 'navbar.html' is injected (in attachNavHandlers, for example)
function enableHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (!hamburgerBtn || !navLinks) {
        console.error("Hamburger or navLinks not found!");
        return;
    }

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// ------------------------------------------------------
// 2. loading navbar and footer document dynamically
// ------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    loadHTML('navbar-placeholder', '/html/navbar.html', () => {
        attachNavHandlers();
    });

    loadHTML('footer-placeholder', '/html/footer.html', () => {
        attachFooterHandlers();
    });
});

// ------------------------------------------------------
// 2. NAVBAR: Called after 'navbar.html' is inserted
// ------------------------------------------------------
function attachNavHandlers() {
    console.log('Navbar loaded. Setting up theme toggle...');

    const themeToggle = document.querySelector('.theme-toggle input');
    const themeIcon = document.getElementById('toggleIcon');
    const htmlElement = document.documentElement;

    // Function to update the theme
    const updateTheme = (theme) => {
        if (theme === 'system') {
            htmlElement.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        } else {
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }

        if (themeIcon) {
            themeIcon.src = (theme === 'dark')
                ? '/assets/icons/moon.svg'
                : '/assets/icons/sun.svg';
        }
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'system';
    updateTheme(savedTheme);

    if (themeToggle) {
        themeToggle.checked = (savedTheme === 'dark');
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            updateTheme(newTheme);
        });
    }

    // Navigation link highlighting
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkFile = link.getAttribute('href').split('/').pop();
        if (linkFile === currentFile) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    enableHamburgerMenu();

    document.addEventListener('click', (e) => {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navLinks = document.getElementById('navLinks');
        if (!hamburgerBtn || !navLinks) return;

        if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });
}


/** Called *after* the footer is injected */
function attachFooterHandlers() {
    // Now the footer exists in the DOM, so these elements can be safely selected

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);
            alert('Thank you for your message! I will get back to you soon.');
            e.target.reset();
        });
    }

    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightEl = document.querySelector('.copyright p');
    if (copyrightEl) {
        copyrightEl.textContent = `© ${currentYear} Yashar Abbasalizadeh Rezaei. All rights reserved.`;
    }

    // Smooth scroll for navigation links in the footer
    document.querySelectorAll('.footer-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}