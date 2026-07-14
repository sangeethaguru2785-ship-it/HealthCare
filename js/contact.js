// ============================================
// Contact Page JavaScript
// ============================================

const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !subject || !message) {
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            var emailGroup = document.getElementById('contactEmail').parentElement;
            var errorSpan = emailGroup.querySelector('.error-message');
            if (!errorSpan) {
                errorSpan = document.createElement('span');
                errorSpan.className = 'error-message';
                errorSpan.textContent = 'Please enter a valid email address (e.g., abc@gmail.com)';
                emailGroup.appendChild(errorSpan);
            }
            emailGroup.classList.add('error');
            document.getElementById('contactEmail').focus();
            return;
        }

        var allGroups = contactForm.querySelectorAll('.form-group');
        allGroups.forEach(function (g) { g.classList.remove('error'); });

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            if (successModal) {
                successModal.classList.add('active');
            }
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 1500);
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}

if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}

// Form input focus effects
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        this.parentElement.classList.remove('focused');
    });
});
