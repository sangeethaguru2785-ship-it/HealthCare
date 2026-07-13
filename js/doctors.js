// ============================================
// Doctors Page JavaScript
// ============================================

// Department Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const doctorCards = document.querySelectorAll('.doctor-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        doctorCards.forEach(card => {
            const department = card.getAttribute('data-department');
            
            if (filter === 'all' || department === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
