// ============================================
// Auth Pages (Login & Sign Up) Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // --- Role Selection ---
    const roleButtons = document.querySelectorAll('.role-btn');
    let selectedRole = 'patient';

    roleButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            roleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedRole = this.dataset.role;
        });
    });

    // --- Toggle Password Visibility ---
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            if (!input) return;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // --- Password Strength Meter ---
    const passwordInput = document.getElementById('password');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.password-strength-text');

    if (passwordInput && strengthBars.length) {
        passwordInput.addEventListener('input', function () {
            const val = this.value;
            const strength = getPasswordStrength(val);

            strengthBars.forEach((bar, i) => {
                bar.className = 'strength-bar';
                if (i < strength.level) {
                    bar.classList.add(strength.level);
                }
            });

            if (strengthText) {
                strengthText.className = 'password-strength-text ' + strength.level;
                strengthText.textContent = val.length ? strength.label : '';
            }
        });
    }

    function getPasswordStrength(password) {
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return { level: 'weak', label: 'Weak password' };
        if (score <= 3) return { level: 'medium', label: 'Medium strength' };
        return { level: 'strong', label: 'Strong password' };
    }

    // --- Validation Helpers ---
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[0-9+\-\s()]{7,}$/.test(phone);
    }

    function deriveNameFromEmail(email) {
        const local = email.split('@')[0];
        return local
            .replace(/[._-]/g, ' ')
            .split(' ')
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }

    function getInitials(name) {
        return name.split(' ').map(w => w.charAt(0)).join('').toUpperCase().slice(0, 2);
    }

    function saveUserData(name, email, role) {
        localStorage.setItem('stacklyUser', JSON.stringify({ name, email, role }));
    }

    function showFieldError(input, message) {
        input.classList.add('error');
        const errorEl = input.closest('.form-group').querySelector('.error-message');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    }

    function clearFieldError(input) {
        input.classList.remove('error');
        const errorEl = input.closest('.form-group').querySelector('.error-message');
        if (errorEl) errorEl.classList.remove('show');
    }

    function clearAllErrors(form) {
        form.querySelectorAll('input.error, select.error').forEach(el => el.classList.remove('error'));
        form.querySelectorAll('.error-message.show').forEach(el => el.classList.remove('show'));
    }

    // --- Login Form ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            clearAllErrors(this);

            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let valid = true;

            if (!email.value.trim()) {
                showFieldError(email, 'Email is required');
                valid = false;
            } else if (!validateEmail(email.value)) {
                showFieldError(email, 'Please enter a valid email');
                valid = false;
            }

            if (!password.value) {
                showFieldError(password, 'Password is required');
                valid = false;
            } else if (password.value.length < 6) {
                showFieldError(password, 'Password must be at least 6 characters');
                valid = false;
            }

            if (!valid) return;

            const userName = deriveNameFromEmail(email.value.trim());
            saveUserData(userName, email.value.trim(), selectedRole);

            showSuccessModal('login', selectedRole);
        });

        // Real-time clearing
        loginForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => clearFieldError(input));
        });
    }

    // --- Sign Up Form ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            clearAllErrors(this);

            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const terms = document.getElementById('terms');
            let valid = true;

            if (!firstName.value.trim()) {
                showFieldError(firstName, 'First name is required');
                valid = false;
            }

            if (!lastName.value.trim()) {
                showFieldError(lastName, 'Last name is required');
                valid = false;
            }

            if (!email.value.trim()) {
                showFieldError(email, 'Email is required');
                valid = false;
            } else if (!validateEmail(email.value)) {
                showFieldError(email, 'Please enter a valid email');
                valid = false;
            }

            if (!phone.value.trim()) {
                showFieldError(phone, 'Phone number is required');
                valid = false;
            } else if (!validatePhone(phone.value)) {
                showFieldError(phone, 'Please enter a valid phone number');
                valid = false;
            }

            if (!password.value) {
                showFieldError(password, 'Password is required');
                valid = false;
            } else if (password.value.length < 6) {
                showFieldError(password, 'Password must be at least 6 characters');
                valid = false;
            }

            if (!confirmPassword.value) {
                showFieldError(confirmPassword, 'Please confirm your password');
                valid = false;
            } else if (confirmPassword.value !== password.value) {
                showFieldError(confirmPassword, 'Passwords do not match');
                valid = false;
            }

            if (terms && !terms.checked) {
                const errorEl = terms.closest('.form-options').querySelector('.error-message');
                if (errorEl) {
                    errorEl.textContent = 'You must agree to the terms';
                    errorEl.classList.add('show');
                }
                valid = false;
            }

            if (!valid) return;

            const signupName = firstName.value.trim() + ' ' + lastName.value.trim();
            saveUserData(signupName, email.value.trim(), selectedRole);

            showSuccessModal('signup', selectedRole);
        });

        // Real-time clearing
        signupForm.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => clearFieldError(input));
            input.addEventListener('change', () => clearFieldError(input));
        });

        // Confirm password live check
        const confirmPw = document.getElementById('confirmPassword');
        const mainPw = document.getElementById('password');
        if (confirmPw && mainPw) {
            confirmPw.addEventListener('input', function () {
                if (this.value && this.value !== mainPw.value) {
                    showFieldError(this, 'Passwords do not match');
                } else {
                    clearFieldError(this);
                }
            });
        }
    }

    // --- Success Modal ---
    function showSuccessModal(type, role) {
        const overlay = document.createElement('div');
        overlay.className = 'auth-success-overlay active';

        const title = type === 'login' ? 'Login Successful!' : 'Account Created!';
        const desc = type === 'login'
            ? 'Welcome back to Stackly Health Center'
            : 'Your account has been created successfully';
        const roleLabel = role === 'admin' ? 'Administrator' : 'Patient';
        const roleIcon = role === 'admin' ? 'fa-user-shield' : 'fa-user';

        const dashboardUrl = role === 'admin' ? 'admin-dashboard.html' : 'patient-dashboard.html';

        overlay.innerHTML = `
            <div class="auth-success-modal">
                <div class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h2>${title}</h2>
                <p>${desc}</p>
                <div class="role-badge">
                    <i class="fas ${roleIcon}"></i>
                    <span>${roleLabel} Dashboard</span>
                </div>
                <a href="${dashboardUrl}" class="btn btn-primary">
                    <span>Continue</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal(overlay);
        });

        const btn = overlay.querySelector('.btn');
        if (btn) btn.addEventListener('click', () => {
            window.location.href = dashboardUrl;
        });
    }

    function closeModal(overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
});
