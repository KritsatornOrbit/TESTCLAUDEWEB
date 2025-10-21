# 集中 Pomodoro Timer

A beautiful web-based Pomodoro timer with a serene Japanese green theme, inspired by traditional Japanese aesthetics and nature.

![Japanese Green Theme](https://img.shields.io/badge/Theme-Japanese%20Green-4a7c2c)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Features

### Core Functionality
- **Classic Pomodoro Technique**: 25-minute work sessions with short and long breaks
- **Three Timer Modes**:
  - 作業 (Work) - Default 25 minutes
  - 小休憩 (Short Break) - Default 5 minutes
  - 長休憩 (Long Break) - Default 15 minutes
- **Session Tracking**: Automatically counts completed Pomodoro sessions
- **Auto-Start**: Optional automatic transition between work and break sessions
- **Browser Notifications**: Desktop notifications when timer completes
- **Audio Alerts**: Gentle sound notification on completion
- **Keyboard Shortcut**: Press spacebar to start/pause timer

### Design Elements
- **Japanese Green Palette**: Matcha, jade, bamboo, and forest green colors
- **Traditional Aesthetics**:
  - Japanese kanji characters (集中 = concentration, 作業 = work, etc.)
  - Bamboo-inspired decorative elements
  - Falling leaves animation
  - Clean, minimalist design
- **Circular Progress Indicator**: Visual representation of time remaining
- **Responsive Design**: Works beautifully on desktop and mobile devices

### Customization
- Adjustable work session duration (1-60 minutes)
- Adjustable short break duration (1-30 minutes)
- Adjustable long break duration (1-60 minutes)
- Auto-start toggle for seamless workflow
- Settings persist across sessions using localStorage

## Usage

### Getting Started
1. Open `index.html` in your web browser
2. Click "開始 Start" to begin a Pomodoro session
3. Work until the timer completes
4. Take a break when prompted
5. Repeat!

### Keyboard Shortcuts
- **Space**: Start/Pause the timer

### Timer Modes
- **Work Mode (作業)**: Focus on your task
- **Short Break (小休憩)**: 5-minute break after each work session
- **Long Break (長休憩)**: 15-minute break after 4 work sessions

### Settings
Click the ⚙️ Settings button to customize:
- Work duration
- Short break duration
- Long break duration
- Auto-start behavior

## Technical Details

### File Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Japanese green theme styling
├── script.js           # Pomodoro timer logic
└── README.md           # Documentation
```

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Advanced animations and gradients
- **JavaScript (ES6+)**: Modern class-based architecture
- **Web APIs**:
  - Notification API for desktop alerts
  - Web Audio API for sound notifications
  - LocalStorage for persistent settings

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

**Note**: Desktop notifications require user permission.

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Matcha Green | `#4a7c2c` | Primary color, buttons |
| Forest Green | `#2d5016` | Dark accents, text |
| Jade Green | `#5fa777` | Highlights, gradients |
| Bamboo Green | `#6ba368` | Secondary accents |
| Light Green | `#d4e8d4` | Backgrounds |
| Cream | `#f5f5dc` | Card backgrounds |
| Gold | `#d4af37` | Special accents |

## Design Philosophy

This Pomodoro timer combines the productivity-enhancing Pomodoro Technique with the calming aesthetics of Japanese design. The green color palette is inspired by:

- 🎋 **Bamboo forests** - Symbolizing growth and flexibility
- 🍵 **Matcha tea** - Representing focus and tranquility
- 🌿 **Japanese gardens** - Evoking peace and natural beauty
- 🍃 **Fresh leaves** - Signifying renewal and energy

The use of Japanese characters (kanji) adds cultural authenticity while maintaining accessibility with English translations.

## Features Breakdown

### Visual Feedback
- Circular progress ring shows time remaining
- Color-coded mode buttons
- Smooth animations and transitions
- Celebration animation on session completion

### Audio & Notifications
- Gentle beep sound on completion
- Desktop notifications with custom messages in both English and Japanese
- Browser tab title updates with remaining time

### Persistence
- Settings saved to localStorage
- Session count tracked across browser sessions
- Preferences remembered between uses

## Customization Guide

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --matcha-green: #4a7c2c;
    --forest-green: #2d5016;
    /* ... modify as needed */
}
```

### Adjusting Default Times
Modify the settings object in `script.js`:
```javascript
this.settings = {
    pomodoro: 25,      // minutes
    shortBreak: 5,     // minutes
    longBreak: 15      // minutes
};
```

## License

MIT License - Feel free to use and modify for your own projects!

## Credits

Designed and developed with care, combining productivity science with Japanese aesthetic principles.

---

**集中して、リラックスして、成功しましょう！**

*Focus, relax, and succeed!*
