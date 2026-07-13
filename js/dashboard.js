/* ============================================
   Dashboard JS (Admin & Patient)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // --- Sidebar Toggle ---
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
        });
    }

    // --- Sidebar Navigation ---
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
    const contentSections = document.querySelectorAll('.section-panel');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.dataset.section;

            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            contentSections.forEach(s => s.classList.remove('active'));
            const panel = document.getElementById(target);
            if (panel) panel.classList.add('active');

            // Close mobile sidebar
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('open');
                if (sidebarOverlay) sidebarOverlay.classList.remove('show');
            }
        });
    });

    // --- Notification Dropdown ---
    const notifBtn = document.querySelector('.notif-btn');
    const notifDropdown = document.querySelector('.notification-dropdown');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            notifDropdown.classList.toggle('show');
        });
        document.addEventListener('click', function () {
            notifDropdown.classList.remove('show');
        });
    }

    // --- Table Search ---
    document.querySelectorAll('.table-search input').forEach(input => {
        input.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            const table = this.closest('.table-card').querySelector('.data-table');
            if (!table) return;
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    });

    // --- Chart Filter Buttons ---
    document.querySelectorAll('.chart-filters').forEach(group => {
        group.querySelectorAll('.chart-filter').forEach(btn => {
            btn.addEventListener('click', function () {
                group.querySelectorAll('.chart-filter').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });

    // --- Animate Stats ---
    function animateValue(el, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * (end - start) + start);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        animateValue(el, 0, target, 1200);
    });

    // --- Calendar ---
    initCalendar();

    // --- Initialize Charts ---
    if (typeof initAdminCharts === 'function') initAdminCharts();
    if (typeof initPatientCharts === 'function') initPatientCharts();
});

// ============================================
// Calendar Widget
// ============================================
function initCalendar() {
    const calGrid = document.querySelector('.calendar-grid');
    if (!calGrid) return;

    const monthLabel = document.querySelector('.calendar-month-label');
    const prevBtn = document.querySelector('.cal-prev');
    const nextBtn = document.querySelector('.cal-next');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dayLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    function render() {
        calGrid.innerHTML = '';
        dayLabels.forEach(d => {
            const el = document.createElement('div');
            el.className = 'calendar-day-label';
            el.textContent = d;
            calGrid.appendChild(el);
        });

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const prevDays = new Date(currentYear, currentMonth, 0).getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            const el = document.createElement('div');
            el.className = 'calendar-day other-month';
            el.textContent = prevDays - i;
            calGrid.appendChild(el);
        }

        const eventDays = [3, 7, 12, 18, 22, 28];

        for (let d = 1; d <= daysInMonth; d++) {
            const el = document.createElement('div');
            el.className = 'calendar-day';
            if (d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                el.classList.add('today');
            }
            if (eventDays.includes(d)) el.classList.add('has-event');
            el.textContent = d;
            calGrid.appendChild(el);
        }

        const totalCells = firstDay + daysInMonth;
        const remaining = (7 - (totalCells % 7)) % 7;
        for (let i = 1; i <= remaining; i++) {
            const el = document.createElement('div');
            el.className = 'calendar-day other-month';
            el.textContent = i;
            calGrid.appendChild(el);
        }

        if (monthLabel) monthLabel.textContent = monthNames[currentMonth] + ' ' + currentYear;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; } render(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; } render(); });

    render();
}
