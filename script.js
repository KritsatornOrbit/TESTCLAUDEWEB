// Pomodoro Timer - Japanese Green Theme

class PomodoroTimer {
    constructor() {
        // Timer settings
        this.settings = {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15,
            autoStart: false
        };

        // Timer state
        this.currentMode = 'pomodoro';
        this.timeLeft = this.settings.pomodoro * 60;
        this.isRunning = false;
        this.timerInterval = null;
        this.sessionCount = 0;

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.sessionCountDisplay = document.getElementById('sessionCount');
        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeModal = document.querySelector('.close');
        this.saveSettingsBtn = document.getElementById('saveSettings');
        this.progressCircle = document.querySelector('.progress-ring-circle');

        // Circle properties
        this.circleRadius = 140;
        this.circleCircumference = 2 * Math.PI * this.circleRadius;

        this.init();
    }

    init() {
        // Load settings from localStorage
        this.loadSettings();

        // Set up progress circle
        this.progressCircle.style.strokeDasharray = this.circleCircumference;
        this.progressCircle.style.strokeDashoffset = 0;

        // Event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.switchMode(mode);
            });
        });

        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeModal.addEventListener('click', () => this.closeSettings());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });

        // Update display
        this.updateDisplay();
        this.updateProgress();

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    start() {
        this.isRunning = true;
        this.startBtn.style.display = 'none';
        this.pauseBtn.style.display = 'flex';

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            this.updateProgress();

            if (this.timeLeft === 0) {
                this.complete();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        this.startBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
        clearInterval(this.timerInterval);
    }

    reset() {
        this.pause();
        this.timeLeft = this.settings[this.currentMode] * 60;
        this.updateDisplay();
        this.updateProgress();
    }

    complete() {
        clearInterval(this.timerInterval);
        this.isRunning = false;

        // Play sound (optional - using browser beep)
        this.playNotificationSound();

        // Show notification
        this.showNotification();

        // Update session count if completing a pomodoro
        if (this.currentMode === 'pomodoro') {
            this.sessionCount++;
            this.sessionCountDisplay.textContent = this.sessionCount;
            localStorage.setItem('sessionCount', this.sessionCount);

            // Add celebration animation
            document.querySelector('.timer-circle').classList.add('completed');
            setTimeout(() => {
                document.querySelector('.timer-circle').classList.remove('completed');
            }, 1500);

            // Auto-switch to break
            if (this.settings.autoStart) {
                const nextMode = this.sessionCount % 4 === 0 ? 'longBreak' : 'shortBreak';
                setTimeout(() => {
                    this.switchMode(nextMode);
                    this.start();
                }, 2000);
            }
        } else {
            // Auto-switch to pomodoro after break
            if (this.settings.autoStart) {
                setTimeout(() => {
                    this.switchMode('pomodoro');
                    this.start();
                }, 2000);
            }
        }

        this.startBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
    }

    switchMode(mode) {
        this.pause();
        this.currentMode = mode;
        this.timeLeft = this.settings[mode] * 60;

        // Update active button
        this.modeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });

        this.updateDisplay();
        this.updateProgress();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;

        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');

        // Update document title
        document.title = `${minutes}:${seconds.toString().padStart(2, '0')} - Pomodoro Timer`;
    }

    updateProgress() {
        const totalTime = this.settings[this.currentMode] * 60;
        const progress = (totalTime - this.timeLeft) / totalTime;
        const offset = this.circleCircumference * (1 - progress);
        this.progressCircle.style.strokeDashoffset = offset;
    }

    playNotificationSound() {
        // Create a simple beep using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            let title, body;

            if (this.currentMode === 'pomodoro') {
                title = '集中時間完了！ Work Session Complete!';
                body = 'Great job! Time for a break. 休憩しましょう！';
            } else {
                title = '休憩終了！ Break Complete!';
                body = 'Ready to focus again? 次の作業を始めましょう！';
            }

            const notification = new Notification(title, {
                body: body,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%234a7c2c"/></svg>',
                requireInteraction: false
            });

            setTimeout(() => notification.close(), 5000);
        }
    }

    openSettings() {
        // Populate current settings
        document.getElementById('pomodoroTime').value = this.settings.pomodoro;
        document.getElementById('shortBreakTime').value = this.settings.shortBreak;
        document.getElementById('longBreakTime').value = this.settings.longBreak;
        document.getElementById('autoStart').checked = this.settings.autoStart;

        this.settingsModal.style.display = 'block';
    }

    closeSettings() {
        this.settingsModal.style.display = 'none';
    }

    saveSettings() {
        this.settings.pomodoro = parseInt(document.getElementById('pomodoroTime').value);
        this.settings.shortBreak = parseInt(document.getElementById('shortBreakTime').value);
        this.settings.longBreak = parseInt(document.getElementById('longBreakTime').value);
        this.settings.autoStart = document.getElementById('autoStart').checked;

        // Save to localStorage
        localStorage.setItem('pomodoroSettings', JSON.stringify(this.settings));

        // Update current timer if not running
        if (!this.isRunning) {
            this.timeLeft = this.settings[this.currentMode] * 60;
            this.updateDisplay();
            this.updateProgress();
        }

        this.closeSettings();
    }

    loadSettings() {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('pomodoroSettings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
        }

        // Load session count
        const savedSessionCount = localStorage.getItem('sessionCount');
        if (savedSessionCount) {
            this.sessionCount = parseInt(savedSessionCount);
            this.sessionCountDisplay.textContent = this.sessionCount;
        }

        // Set initial time
        this.timeLeft = this.settings.pomodoro * 60;
    }
}

// Initialize the timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');

        if (startBtn.style.display !== 'none') {
            startBtn.click();
        } else {
            pauseBtn.click();
        }
    }
});
