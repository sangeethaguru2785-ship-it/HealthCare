// ============================================
// Services Page JavaScript
// ============================================

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Toggle clicked item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
