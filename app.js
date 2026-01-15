/**
 * Calm Companion - Multi-page Application
 * Handles navigation, tools, and interactivity
 */

// Navigation active state
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    setupToolInteractions();
});

function updateNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if ((currentPage === '' || currentPage === '/') && href === 'index.html') {
            link.classList.add('active');
        } else if (currentPage === href) {
            link.classList.add('active');
        }
    });
}

/**
 * Tool Interactions - 4-6 Breathing, 5-4-3-2-1 Grounding, Kinder Thought
 */
function setupToolInteractions() {
    setupBreathingTool();
    setupGroundingTool();
    setupKinderThoughtTool();
}

/**
 * 4-6 Breathing Exercise
 */
function setupBreathingTool() {
    const btn = document.getElementById('breathing-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const output = btn.closest('.tool-card').querySelector('.tool-output');
        if (output.classList.contains('active')) {
            output.classList.remove('active');
            btn.textContent = 'Try Now';
        } else {
            startBreathingExercise(output, btn);
        }
    });
}

function startBreathingExercise(output, btn) {
    btn.disabled = true;
    btn.textContent = 'In progress...';
    
    output.innerHTML = '<div style="text-align: center;"><p style="margin-bottom: 15px;">Find a comfortable position...</p></div>';
    output.classList.add('active');
    
    const steps = [
        { text: 'Breathe IN slowly... (4 seconds)', duration: 4000 },
        { text: 'Hold your breath... (6 seconds)', duration: 6000 },
        { text: 'Breathe OUT slowly... (4 seconds)', duration: 4000 },
        { text: 'Take a moment... (2 seconds)', duration: 2000 }
    ];
    
    let round = 1;
    let stepIndex = 0;
    
    function runStep() {
        if (round > 3) {
            output.innerHTML += '<p style="margin-top: 20px; font-weight: bold; color: #667eea;">✨ Well done! Notice how you feel.</p>';
            btn.disabled = false;
            btn.textContent = 'Try Again';
            return;
        }
        
        if (stepIndex >= steps.length) {
            stepIndex = 0;
            round++;
            output.innerHTML += `<p style="margin: 15px 0;">Round ${round - 1} complete...</p>`;
            setTimeout(runStep, 1000);
            return;
        }
        
        const step = steps[stepIndex];
        output.innerHTML += `<p style="margin: 10px 0;">${step.text}</p>`;
        
        setTimeout(() => {
            stepIndex++;
            runStep();
        }, step.duration);
    }
    
    setTimeout(runStep, 1000);
}

/**
 * 5-4-3-2-1 Grounding Exercise
 */
function setupGroundingTool() {
    const btn = document.getElementById('grounding-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const output = btn.closest('.tool-card').querySelector('.tool-output');
        if (output.classList.contains('active')) {
            output.classList.remove('active');
            btn.textContent = 'Try Now';
        } else {
            startGroundingExercise(output, btn);
        }
    });
}

function startGroundingExercise(output, btn) {
    btn.disabled = true;
    
    const steps = [
        { sense: 'See', count: 5, prompt: 'Look around. Name 5 things you can see.' },
        { sense: 'Touch', count: 4, prompt: 'Name 4 things you can physically touch.' },
        { sense: 'Hear', count: 3, prompt: 'Name 3 things you can hear.' },
        { sense: 'Smell', count: 2, prompt: 'Name 2 things you can smell.' },
        { sense: 'Taste', count: 1, prompt: 'Name 1 thing you can taste or remember tasting.' }
    ];
    
    output.classList.add('active');
    output.innerHTML = '';
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            output.innerHTML += `<p><strong>${step.sense}:</strong> ${step.prompt}</p>`;
        }, index * 1500);
    });
    
    setTimeout(() => {
        output.innerHTML += '<p style="margin-top: 20px; font-weight: bold; color: #667eea;">✨ You\'re grounded in the present moment.</p>';
        btn.disabled = false;
        btn.textContent = 'Try Again';
    }, steps.length * 1500 + 500);
}

/**
 * Kinder Thought Reframing
 */
function setupKinderThoughtTool() {
    const btn = document.getElementById('kinderthought-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const output = btn.closest('.tool-card').querySelector('.tool-output');
        if (output.classList.contains('active')) {
            output.classList.remove('active');
            btn.textContent = 'Try Now';
        } else {
            showKinderThoughtExercise(output, btn);
        }
    });
}

function showKinderThoughtExercise(output, btn) {
    btn.disabled = true;
    output.classList.add('active');
    
    const thoughtInput = document.createElement('div');
    thoughtInput.innerHTML = `
        <p style="margin-bottom: 15px;">What negative thought are you having?</p>
        <textarea id="thought-input" placeholder="e.g., I'm a failure..." style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-family: inherit; resize: vertical; min-height: 80px;"></textarea>
        <button id="reframe-btn" style="margin-top: 10px; background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">Reframe This Thought</button>
    `;
    
    output.innerHTML = '';
    output.appendChild(thoughtInput);
    
    const reframeBtn = document.getElementById('reframe-btn');
    reframeBtn.addEventListener('click', () => {
        const thought = document.getElementById('thought-input').value;
        if (thought.trim()) {
            showReframedThought(output, thought);
            btn.textContent = 'Try Again';
        }
    });
}

function showReframedThought(output, originalThought) {
    const reframings = [
        'This is a moment of difficulty, not a permanent state.',
        'I\'m doing my best with what I know right now.',
        'What would I say to a friend in this situation?',
        'This feeling will pass. I can handle this.',
        'I\'m worthy even when struggling.',
        'Every challenge is an opportunity to learn.',
        'I deserve kindness and compassion, especially from myself.'
    ];
    
    const randomReframing = reframings[Math.floor(Math.random() * reframings.length)];
    
    output.innerHTML = `
        <p style="margin-bottom: 15px;"><strong>Your thought:</strong><br>"${originalThought}"</p>
        <p style="margin-bottom: 15px; padding: 15px; background: rgba(102, 126, 234, 0.1); border-left: 4px solid #667eea; border-radius: 4px;">
            <strong>A kinder perspective:</strong><br>"${randomReframing}"
        </p>
        <p style="font-style: italic; color: #6b7280; font-size: 0.9rem;">Notice how the second thought feels different. That's the power of perspective.</p>
    `;
}

/**
 * Accessibility: Keyboard support
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused.classList.contains('btn-primary') || focused.classList.contains('btn-secondary')) {
            focused.click();
        }
    }
});
