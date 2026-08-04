document.addEventListener('DOMContentLoaded', () => {
    // Available Quantum Colors
    const COLORS = ['red', 'cyan', 'green', 'yellow', 'purple', 'orange'];
    const MAX_ATTEMPTS = 8;
    const CODE_LENGTH = 4;

    let secretCode = [];
    let currentAttempt = 1;
    let selectedColor = 'red';
    let currentGuess = [null, null, null, null];
    let gameOver = false;

    // DOM Elements
    const colorPickers = document.querySelectorAll('.color-picker');
    const currentSlots = document.querySelectorAll('.current-slot');
    const submitBtn = document.getElementById('submitGuessBtn');
    const resetBtn = document.getElementById('resetGameBtn');
    const historyContainer = document.getElementById('attemptsHistory');
    const attemptsLeftSpan = document.getElementById('attemptsLeft');
    const statusBanner = document.getElementById('gameStatusBanner');
    const secretCodeDisplay = document.getElementById('secretCodeDisplay');

    function initGame() {
        // Generate Random Secret Code
        secretCode = [];
        for (let i = 0; i < CODE_LENGTH; i++) {
            const randomIndex = Math.floor(Math.random() * COLORS.length);
            secretCode.push(COLORS[randomIndex]);
        }

        currentAttempt = 1;
        selectedColor = 'red';
        currentGuess = [null, null, null, null];
        gameOver = false;

        // Reset UI Elements
        attemptsLeftSpan.textContent = MAX_ATTEMPTS;
        historyContainer.innerHTML = '';
        statusBanner.className = 'hidden p-4 rounded-xl text-center font-bold text-sm mb-6';
        secretCodeDisplay.classList.add('hidden');

        // Reset Current Active Input Slots
        currentSlots.forEach((slot) => {
            slot.className = 'current-slot w-12 h-12 rounded-full border-2 border-slate-700 bg-slate-900/80 cursor-pointer flex items-center justify-center peg-slot';
            slot.innerHTML = '<span class="text-xs text-slate-600 font-mono">?</span>';
        });

        // Highlight Default Color Selector
        selectColor('red');
    }

    function selectColor(color) {
        selectedColor = color;
        colorPickers.forEach(picker => {
            if (picker.dataset.color === color) {
                picker.classList.add('ring-4', 'ring-indigo-400', 'scale-110');
            } else {
                picker.classList.remove('ring-4', 'ring-indigo-400', 'scale-110');
            }
        });
    }

    colorPickers.forEach(picker => {
        picker.addEventListener('click', () => {
            if (!gameOver) selectColor(picker.dataset.color);
        });
    });

    currentSlots.forEach((slot, index) => {
        slot.addEventListener('click', () => {
            if (gameOver) return;
            currentGuess[index] = selectedColor;

            const colorClasses = {
                'red': 'bg-red-500 border-red-400 shadow-lg shadow-red-500/40',
                'cyan': 'bg-cyan-400 border-cyan-300 shadow-lg shadow-cyan-400/40',
                'green': 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/40',
                'yellow': 'bg-amber-400 border-amber-300 shadow-lg shadow-amber-400/40',
                'purple': 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/40',
                'orange': 'bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/40'
            };

            slot.className = `current-slot w-12 h-12 rounded-full border-2 ${colorClasses[selectedColor]} cursor-pointer flex items-center justify-center peg-slot`;
            slot.innerHTML = '';
        });
    });

    /**
     * Professional Direct Positional Feedback Logic (1:1 Slot Mapping)
     * Evaluates status for each specific slot: 'EXACT', 'PARTIAL', or 'MISS'
     */
    function calculatePositionalFeedback(guess, secret) {
        const feedback = ['MISS', 'MISS', 'MISS', 'MISS'];
        const secretMatched = [false, false, false, false];

        // Pass 1: Check Exact Matches for each slot
        for (let i = 0; i < CODE_LENGTH; i++) {
            if (guess[i] === secret[i]) {
                feedback[i] = 'EXACT';
                secretMatched[i] = true;
            }
        }

        // Pass 2: Check Partial Matches for remaining non-exact slots
        for (let i = 0; i < CODE_LENGTH; i++) {
            if (feedback[i] !== 'EXACT') {
                for (let j = 0; j < CODE_LENGTH; j++) {
                    if (!secretMatched[j] && guess[i] === secret[j]) {
                        feedback[i] = 'PARTIAL';
                        secretMatched[j] = true;
                        break;
                    }
                }
            }
        }

        return feedback;
    }

    submitBtn.addEventListener('click', () => {
        if (gameOver) return;

        if (currentGuess.includes(null)) {
            alert('Please select a color for all 4 slots before executing the hack!');
            return;
        }

        // Calculate direct positional feedback array
        const feedbackArray = calculatePositionalFeedback(currentGuess, secretCode);

        // Check if all slots are EXACT hits
        const isWin = feedbackArray.every(status => status === 'EXACT');

        // Render attempt log row with slot-by-slot indicators directly beneath
        renderHistoryRow(currentAttempt, currentGuess, feedbackArray);

        // Check Win/Loss conditions
        if (isWin) {
            endGame(true, '🎉 SECURITY BREACH SUCCESSFUL! Mainframe Unlocked.');
        } else if (currentAttempt >= MAX_ATTEMPTS) {
            endGame(false, '💀 FIREWALL LOCKOUT! You ran out of attempts.');
        } else {
            currentAttempt++;
            attemptsLeftSpan.textContent = MAX_ATTEMPTS - currentAttempt + 1;
            currentGuess = [null, null, null, null];
            currentSlots.forEach(slot => {
                slot.className = 'current-slot w-12 h-12 rounded-full border-2 border-slate-700 bg-slate-900/80 cursor-pointer flex items-center justify-center peg-slot';
                slot.innerHTML = '<span class="text-xs text-slate-600 font-mono">?</span>';
            });
        }
    });

    /**
     * Renders Attempt Row with Feedback Icons directly UNDER each color slot
     */
    function renderHistoryRow(attemptNum, guess, feedbackArray) {
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between bg-slate-900/90 border border-slate-800/80 p-3 rounded-xl mb-2.5 text-xs font-mono shadow-md hover:border-slate-700 transition';

        const colorMap = {
            'red': 'bg-red-500 shadow-sm shadow-red-500/40',
            'cyan': 'bg-cyan-400 shadow-sm shadow-cyan-400/40',
            'green': 'bg-emerald-500 shadow-sm shadow-emerald-500/40',
            'yellow': 'bg-amber-400 shadow-sm shadow-amber-400/40',
            'purple': 'bg-purple-500 shadow-sm shadow-purple-500/40',
            'orange': 'bg-orange-500 shadow-sm shadow-orange-500/40'
        };

        // Badge styles for indicators directly beneath each peg
        const beaconBadges = {
            'EXACT': '<div class="flex items-center justify-center w-6 h-5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 text-[11px] font-bold shadow-[0_0_8px_rgba(52,211,153,0.4)]" title="Exact Match">✓</div>',
            'PARTIAL': '<div class="flex items-center justify-center w-6 h-5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/50 text-[11px] font-bold shadow-[0_0_8px_rgba(251,191,36,0.4)]" title="Wrong Position">⇄</div>',
            'MISS': '<div class="flex items-center justify-center w-6 h-5 rounded bg-slate-800/80 text-slate-500 border border-slate-700 text-[11px] font-bold" title="Color Not Included">✕</div>'
        };

        // Render 4 Columns (Top: Color Peg, Bottom: Position Indicator)
        let columnsHTML = '<div class="flex items-center gap-3">';
        guess.forEach((color, idx) => {
            const status = feedbackArray[idx];
            columnsHTML += `
                <div class="flex flex-col items-center gap-1.5">
                    <div class="w-6 h-6 rounded-full ${colorMap[color]}"></div>
                    ${beaconBadges[status]}
                </div>
            `;
        });
        columnsHTML += '</div>';

        row.innerHTML = `
            <span class="text-indigo-400 font-bold min-w-[24px]">#${attemptNum}</span>
            ${columnsHTML}
        `;

        historyContainer.prepend(row);
    }

    function endGame(isWin, message) {
        gameOver = true;
        statusBanner.textContent = message;
        statusBanner.classList.remove('hidden');

        if (isWin) {
            statusBanner.className = 'p-4 rounded-xl text-center font-bold text-sm mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10';
        } else {
            statusBanner.className = 'p-4 rounded-xl text-center font-bold text-sm mb-6 bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-500/10';
        }

        // Reveal Secret Code
        secretCodeDisplay.classList.remove('hidden');
        const secretSlots = document.querySelectorAll('.secret-slot');
        const colorMap = {
            'red': 'bg-red-500 shadow-md shadow-red-500/50',
            'cyan': 'bg-cyan-400 shadow-md shadow-cyan-400/50',
            'green': 'bg-emerald-500 shadow-md shadow-emerald-500/50',
            'yellow': 'bg-amber-400 shadow-md shadow-amber-400/50',
            'purple': 'bg-purple-500 shadow-md shadow-purple-500/50',
            'orange': 'bg-orange-500 shadow-md shadow-orange-500/50'
        };

        secretCode.forEach((color, idx) => {
            secretSlots[idx].className = `secret-slot w-10 h-10 rounded-full ${colorMap[color]}`;
        });
    }

    resetBtn.addEventListener('click', initGame);

    // Initialize Game on First Load
    initGame();
});