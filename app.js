/**
 * Calm Companion - Modal Chat Handler
 * Manages the modal popup for the Botpress chatbot
 */

// DOM Elements
const openChatBtn = document.getElementById('openChatBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const chatModal = document.getElementById('chatModal');
const modalBackdrop = document.getElementById('modalBackdrop');

/**
 * Open the chat modal
 */
function openModal() {
    chatModal.classList.add('active');
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    chatModal.setAttribute('aria-hidden', 'false');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    closeModalBtn.focus(); // Focus on close button for accessibility
}

/**
 * Close the chat modal
 */
function closeModal() {
    chatModal.classList.remove('active');
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    chatModal.setAttribute('aria-hidden', 'true');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    openChatBtn.focus(); // Return focus to the open button
}

/**
 * Event: Open chat button clicked
 */
openChatBtn.addEventListener('click', openModal);

/**
 * Event: Close modal button clicked
 */
closeModalBtn.addEventListener('click', closeModal);

/**
 * Event: Clicking outside modal (on backdrop) closes it
 */
modalBackdrop.addEventListener('click', closeModal);

/**
 * Event: Prevent closing when clicking inside modal content
 */
chatModal.addEventListener('click', (e) => {
    e.stopPropagation();
});

/**
 * Event: ESC key closes the modal
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatModal.classList.contains('active')) {
        closeModal();
    }
});

/**
 * Event: Enter key on the main button opens the modal
 */
openChatBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        openModal();
    }
});

/**
 * Accessibility: Trap focus within modal when open
 */
chatModal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = chatModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});
