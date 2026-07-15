// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// Back to Top Button
// ============================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// AOS (Animate On Scroll) Implementation
// ============================================
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

initAOS();

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// ============================================
// Emergency Button → 404 Page
// ============================================
document.querySelectorAll('.btn-emergency').forEach(btn => {
    btn.addEventListener('click', () => {
        const inPages = window.location.pathname.includes('/pages/');
        window.location.href = inPages ? '../404.html' : '404.html';
    });
});

// ============================================
// Console Easter Egg
// ============================================
console.log('%c🏥 Stackly Health Center', 'color: #0077b6; font-size: 24px; font-weight: bold;');
console.log('%cYour Health, Our Priority', 'color: #48cae4; font-size: 14px;');

// ============================================
// Input Filtering (all pages)
// ============================================
document.addEventListener('keydown', function (e) {
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        var el = e.target;
        // Email: allow letters, digits, @ . + - _
        if (el.type === 'email' && !/^[a-zA-Z0-9@.+\-_]$/.test(e.key)) {
            e.preventDefault();
        }
        // Name fields: allow letters and spaces only
        if (/name/i.test(el.id) && el.type === 'text' && !/^[a-zA-Z ]$/.test(e.key)) {
            e.preventDefault();
        }
        // Phone fields: allow digits only
        if (el.type === 'tel' && !/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    }
});

// ============================================
// Newsletter Form Handler (all pages)
// ============================================
document.querySelectorAll('#newsletterForm').forEach(function (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var input = form.querySelector('input[type="email"]');
        var emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(input.value.trim())) {
            input.focus();
            return;
        }

        var inputGroup = form.querySelector('.newsletter-input-group');
        var disclaimer = form.querySelector('.newsletter-disclaimer');

        inputGroup.style.display = 'none';
        if (disclaimer) disclaimer.style.display = 'none';

        var successMsg = document.createElement('div');
        successMsg.className = 'newsletter-success';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Successfully Subscribed!';
        form.appendChild(successMsg);

        setTimeout(function () {
            successMsg.remove();
            inputGroup.style.display = '';
            if (disclaimer) disclaimer.style.display = '';
            form.reset();
        }, 3000);
    });
});
