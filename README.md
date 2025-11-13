# Modular Intro Sequence

Intro experiments to build the MeshStudios website!



## 📁 File Structure

```
modularization/
├── index.html           # Main HTML with module imports
├── src/
│   ├── main.js          # Timeline coordinator
│   ├── phases/
│   │   ├── phase1.js    # 404 glitch sequence (LOCKED)
│   │   ├── phase2.js    # Code rain + boot sequence
│   │   ├── phase3.js    # Reality revelation
│   │   └── ui-overlay.js # UI overlay system (optional)
│   └── utils/
│       ├── glitch.js    # Shared glitch functions
│       └── audio.js     # Audio helper functions
└── README.md           # This file
```

## 🚀 Usage

### Basic Usage
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
</head>
<body>
  <!-- Your HTML structure -->
  <script type="module" src="src/main.js"></script>
</body>
</html>
```


### Phase 1 (LOCKED) - `phase1.js`
- **Status**: 🔒 LOCKED - DO NOT MODIFY
- **Function**: 404 glitch sequence
- **Dependencies**: `glitch.js`, `audio.js`

### Phase 2 - `phase2.js`
- **Function**: Code rain, boot sequence, water effects
- **Features**: Typing animation, code flood, canvas water ripples
- **Dependencies**: UI overlay callback (optional)

### Phase 3 - `phase3.js` 
- **Function**: Reality revelation sequence
- **Features**: Handles both CTA and skip button flows
- **Effects**: Text typing, glitch animations, wave effects

### UI Overlay - `ui-overlay.js`
- **Status**: 🔄 Optional module
- **Function**: Animated UI panels during Phase 2
- **Safety**: Can be completely disabled without breaking phases
- **Features**: System panels, progress bars, animated canvases

### Utilities
- **`glitch.js`**: Shared glitch animations and text effects
- **`audio.js`**: Audio playback helpers with error handling


## 🛡️ Safety Features

### Isolation
- Each phase is completely isolated in its own module
- Shared dependencies are cleanly injected via configuration
- UI overlay can be disabled without affecting core phases

### Error Handling  
- UI overlay gracefully handles missing DOM elements
- Audio playback fails silently if elements are missing
- Canvas operations include safety checks

### Clean Transitions
- Phase 2 effects are properly cleaned up before Phase 3
- Animation frames are cancelled to prevent memory leaks
- Event listeners are removed during cleanup



