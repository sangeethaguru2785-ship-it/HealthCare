// ============================================
// Appointment Page JavaScript
// ============================================

const appointmentForm = document.getElementById('appointmentForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Form submission
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        var emailInput = document.getElementById('email');
        var email = emailInput.value.trim();
        var emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            emailInput.focus();
            return;
        }

        const submitBtn = appointmentForm.querySelector('.btn-submit');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Submitting...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            if (successModal) {
                successModal.classList.add('active');
            }
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            appointmentForm.reset();
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
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});
