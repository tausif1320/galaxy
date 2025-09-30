// 🌟 SMOOTH COSMIC CUTENESS - Performance Optimized JavaScript 🌟

// Performance variables
let isAnimating = false;
let lastTime = 0;
const FPS_LIMIT = 60;
const FRAME_TIME = 1000 / FPS_LIMIT;

// DOM Elements
const cosmicCharacter = document.getElementById('cosmicCharacter');
const spaceSpeech = document.getElementById('spaceSpeech');
const galaxyBtn = document.getElementById('galaxyBtn');
const starRainBtn = document.getElementById('starRainBtn');
const cosmicHugBtn = document.getElementById('cosmicHugBtn');
const magicBtn = document.getElementById('magicBtn');
const spaceArea = document.getElementById('spaceArea');
const toastContainer = document.getElementById('toastContainer');
const leftPupil = document.getElementById('leftPupil');
const rightPupil = document.getElementById('rightPupil');
const cosmicMouth = document.getElementById('cosmicMouth');

// Effect containers
const effectsContainer = document.getElementById('effectsContainer');
const starfield = document.getElementById('starfield');
const planetsContainer = document.getElementById('planetsContainer');

// Performance pools for object reuse
const effectPool = [];
const MAX_EFFECTS = 20;
const MAX_STARS = 50; // Reduced from 150
const MAX_PLANETS = 3; // Reduced from 5

// Cute space messages
const spaceMessages = [
    "You're my shining star! ⭐💖",
    "Beautiful like a nebula! 🌌✨",
    "You light up my universe! 🌟💕",
    "Cosmic cuteness overload! 🪐😍",
    "My favorite galaxy! 🌌💖",
    "Stellar and amazing! ⭐🥰",
    "Out of this world! 🚀💕"
];

const cosmicEmojis = {
    stars: ['⭐', '🌟', '✨', '💫'],
    planets: ['🪐', '🌍', '🌙'],
    love: ['💖', '💕', '💗', '💘']
};

// Throttled eye tracking for performance
let eyeUpdateTimer = null;
function throttledEyeUpdate(x, y) {
    if (eyeUpdateTimer) return;

    eyeUpdateTimer = setTimeout(() => {
        updateCosmicEyes(x, y);
        eyeUpdateTimer = null;
    }, 50); // Update eyes max 20 times per second
}

// Optimized eye tracking
function updateCosmicEyes(x, y) {
    const pupils = [leftPupil, rightPupil];

    pupils.forEach(pupil => {
        if (!pupil) return;

        const eye = pupil.parentElement;
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(y - eyeCenterY, x - eyeCenterX);
        const distance = Math.min(6, Math.sqrt(Math.pow(x - eyeCenterX, 2) + Math.pow(y - eyeCenterY, 2)) / 10);

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
}

// Initialize optimized cosmic background
function initializeCosmicBackground() {
    createOptimizedStarField();
    createOptimizedPlanets();
}

// Create optimized starfield with fewer stars
function createOptimizedStarField() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_STARS; i++) {
        const star = document.createElement('div');
        star.className = 'twinkling-star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 1 + 2) + 's';

        fragment.appendChild(star);
    }

    starfield.appendChild(fragment);
}

// Create optimized floating planets
function createOptimizedPlanets() {
    const planetEmojis = ['🪐', '🌍', '🌙'];
    const fragment = document.createDocumentFragment();

    planetEmojis.forEach((emoji, index) => {
        const planet = document.createElement('div');
        planet.className = 'floating-planet';
        planet.innerHTML = emoji;
        planet.style.left = (20 + index * 30) + '%';
        planet.style.top = (20 + index * 25) + '%';
        planet.style.fontSize = (Math.random() * 15 + 30) + 'px';
        planet.style.animationDelay = index * 2 + 's';
        planet.style.animationDuration = (Math.random() * 2 + 6) + 's';

        fragment.appendChild(planet);
    });

    planetsContainer.appendChild(fragment);
}

// Optimized toast notification system
function showCosmicToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'cosmic-toast';
    toast.innerHTML = message;

    toastContainer.appendChild(toast);

    // Haptic feedback (throttled)
    if (navigator.vibrate && !isAnimating) {
        navigator.vibrate(50);
    }

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.5s ease-out forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }, duration);
}

// Update character expression
function updateCharacterExpression(expression) {
    const character = document.querySelector('.cosmic-character');
    if (character) {
        character.className = 'cosmic-character ' + expression;
    }

    if (expression === 'happy' && cosmicMouth) {
        cosmicMouth.style.borderColor = '#ff69b4';
        cosmicMouth.style.boxShadow = '0 0 10px rgba(255, 105, 180, 0.6)';
    } else if (expression === 'excited' && cosmicMouth) {
        cosmicMouth.style.borderRadius = '0 0 60px 60px';
        cosmicMouth.style.borderColor = '#ffd700';
        cosmicMouth.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.8)';
    }
}

// Update speech bubble
function updateSpeech(message) {
    if (!spaceSpeech) return;

    const speechText = spaceSpeech.querySelector('.speech-text');
    if (speechText) {
        speechText.innerHTML = message;

        // Add speech animation
        spaceSpeech.style.transform = 'scale(1.05)';
        setTimeout(() => {
            spaceSpeech.style.transform = 'scale(1)';
        }, 200);
    }
}

// Object pool for effects to reduce garbage collection
function getEffectFromPool() {
    if (effectPool.length > 0) {
        return effectPool.pop();
    }
    return document.createElement('div');
}

function returnEffectToPool(effect) {
    if (effectPool.length < MAX_EFFECTS) {
        effect.className = '';
        effect.style.cssText = '';
        effect.innerHTML = '';
        effectPool.push(effect);
    }
}

// OPTIMIZED GALAXY MAGIC EFFECT (reduced count)
function createGalaxyMagic() {
    if (isAnimating) return;
    isAnimating = true;

    const galaxyCount = 15; // Reduced from 30

    for (let i = 0; i < galaxyCount; i++) {
        setTimeout(() => {
            const galaxy = getEffectFromPool();
            galaxy.className = 'galaxy-explosion';
            galaxy.innerHTML = '🌌';
            galaxy.style.position = 'absolute';
            galaxy.style.left = Math.random() * window.innerWidth + 'px';
            galaxy.style.top = Math.random() * window.innerHeight + 'px';
            galaxy.style.fontSize = (Math.random() * 15 + 20) + 'px';
            galaxy.style.zIndex = '20';

            effectsContainer.appendChild(galaxy);

            setTimeout(() => {
                if (galaxy.parentNode) {
                    galaxy.parentNode.removeChild(galaxy);
                    returnEffectToPool(galaxy);
                }
            }, 1800);
        }, i * 80);
    }

    setTimeout(() => {
        isAnimating = false;
    }, 2000);
}

// OPTIMIZED STAR RAIN EFFECT
function createStarRain() {
    if (isAnimating) return;
    isAnimating = true;

    const starCount = 40; // Reduced from 80

    for (let i = 0; i < starCount; i++) {
        setTimeout(() => {
            const star = getEffectFromPool();
            star.className = 'star-shower';
            star.innerHTML = cosmicEmojis.stars[Math.floor(Math.random() * cosmicEmojis.stars.length)];
            star.style.position = 'absolute';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = '-30px';
            star.style.fontSize = (Math.random() * 10 + 15) + 'px';
            star.style.zIndex = '20';

            effectsContainer.appendChild(star);

            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                    returnEffectToPool(star);
                }
            }, 2500);
        }, i * 40);
    }

    setTimeout(() => {
        isAnimating = false;
    }, 2000);
}

// OPTIMIZED COSMIC HUG EFFECT
function createCosmicHug(x, y) {
    if (isAnimating) return;

    const hugEmojis = ['🤗', '💖', '💕', '💗', '🥰'];
    const hugCount = 12; // Reduced from 25

    for (let i = 0; i < hugCount; i++) {
        const hug = getEffectFromPool();
        hug.className = 'cosmic-burst';
        hug.innerHTML = hugEmojis[Math.floor(Math.random() * hugEmojis.length)];
        hug.style.position = 'absolute';
        hug.style.left = (x + (Math.random() - 0.5) * 200) + 'px';
        hug.style.top = (y + (Math.random() - 0.5) * 200) + 'px';
        hug.style.fontSize = (Math.random() * 10 + 18) + 'px';
        hug.style.zIndex = '20';

        effectsContainer.appendChild(hug);

        setTimeout(() => {
            if (hug.parentNode) {
                hug.parentNode.removeChild(hug);
                returnEffectToPool(hug);
            }
        }, 1200);
    }
}

// OPTIMIZED MAGIC EFFECT
function createMagicSparkles(x, y, count = 8) { // Reduced default count
    const magicEmojis = ['✨', '⭐', '🌟', '💫'];

    for (let i = 0; i < count; i++) {
        const magic = getEffectFromPool();
        magic.className = 'cosmic-burst';
        magic.innerHTML = magicEmojis[Math.floor(Math.random() * magicEmojis.length)];
        magic.style.position = 'absolute';
        magic.style.left = (x + (Math.random() - 0.5) * 120) + 'px';
        magic.style.top = (y + (Math.random() - 0.5) * 120) + 'px';
        magic.style.fontSize = (Math.random() * 8 + 15) + 'px';
        magic.style.zIndex = '20';

        effectsContainer.appendChild(magic);

        setTimeout(() => {
            if (magic.parentNode) {
                magic.parentNode.removeChild(magic);
                returnEffectToPool(magic);
            }
        }, 1200);
    }
}

// Throttled interaction handlers for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Event Listeners with performance optimizations
if (cosmicCharacter) {
    cosmicCharacter.addEventListener('click', function() {
        updateCharacterExpression('excited');
        updateSpeech(spaceMessages[Math.floor(Math.random() * spaceMessages.length)]);
        createMagicSparkles(
            this.offsetLeft + this.offsetWidth / 2,
            this.offsetTop + this.offsetHeight / 2,
            6
        );

        setTimeout(() => {
            updateCharacterExpression('happy');
        }, 1500);
    });
}

// Optimized Button Event Listeners
if (galaxyBtn) {
    galaxyBtn.addEventListener('click', throttle(function() {
        createGalaxyMagic();
        updateSpeech("Galaxy magic just for you! 🌌✨");
        showCosmicToast("🌌 Galaxy Magic Activated! 🌌");
        updateCharacterExpression('excited');
    }, 2000));
}

if (starRainBtn) {
    starRainBtn.addEventListener('click', throttle(function() {
        createStarRain();
        updateSpeech("Stars are falling like wishes! ⭐💫");
        showCosmicToast("⭐ Star Rain Summoned! ⭐");
        updateCharacterExpression('happy');
    }, 2000));
}

if (cosmicHugBtn) {
    cosmicHugBtn.addEventListener('click', throttle(function(e) {
        const rect = this.getBoundingClientRect();
        createCosmicHug(rect.left + rect.width / 2, rect.top + rect.height / 2);
        updateSpeech("Sending cosmic hugs! 🤗💖");
        showCosmicToast("🤗 Cosmic Hug Delivered! 🤗");
        updateCharacterExpression('happy');
    }, 1500));
}

if (magicBtn) {
    magicBtn.addEventListener('click', throttle(function() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        createMagicSparkles(centerX, centerY, 12);
        updateSpeech("Magic sparkles for you! ✨💖");
        showCosmicToast("✨ Magic Activated! ✨");
        updateCharacterExpression('excited');
    }, 1500));
}

// Optimized space area interactions
if (spaceArea) {
    let longPressTimer;

    spaceArea.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        createMagicSparkles(x, y, 4);

        longPressTimer = setTimeout(() => {
            if (!isAnimating) {
                createStarRain();
                showCosmicToast("✨ Long Press Magic! ✨");
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
            }
        }, 1000);
    }, { passive: true });

    spaceArea.addEventListener('touchend', function() {
        clearTimeout(longPressTimer);
    }, { passive: true });

    spaceArea.addEventListener('click', function(e) {
        createMagicSparkles(e.clientX, e.clientY, 5);
        showCosmicToast("✨ Cosmic Magic! ✨");
    });
}

// Optimized eye tracking with throttling
document.addEventListener('mousemove', throttle(function(e) {
    throttledEyeUpdate(e.clientX, e.clientY);
}, 50));

document.addEventListener('touchmove', throttle(function(e) {
    if (e.touches[0]) {
        throttledEyeUpdate(e.touches[0].clientX, e.touches[0].clientY);
    }
}, 50));

// Optimized space card interactions
document.querySelectorAll('.space-card').forEach(card => {
    card.addEventListener('click', function() {
        const rect = this.getBoundingClientRect();
        createMagicSparkles(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            4
        );

        const messages = [
            "You truly are amazing! ✨💖",
            "Special beyond words! 🌟💕",
            "Beautiful inside and out! 🪐💗",
            "Wonderful in every way! 💫💖"
        ];

        const index = Array.from(this.parentNode.children).indexOf(this);
        showCosmicToast(messages[index] || "You're incredible! 💖");

        this.style.transform = 'translateY(-10px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key.toLowerCase()) {
        case 'g':
            if (galaxyBtn) galaxyBtn.click();
            break;
        case 's':
            if (starRainBtn) starRainBtn.click();
            break;
        case 'h':
            if (cosmicHugBtn) cosmicHugBtn.click();
            break;
        case 'm':
            if (magicBtn) magicBtn.click();
            break;
    }
});

// Optimized initialization
window.addEventListener('load', function() {
    setTimeout(() => {
        initializeCosmicBackground();
        showCosmicToast("🌟 Welcome to your cosmic space! 🌟", 3000);
        updateSpeech("Hello beautiful! 🌟");
        updateCharacterExpression('happy');
    }, 500);
});

// Visibility API to pause animations when tab is not active
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause intensive animations when tab is hidden
        isAnimating = true;
    } else {
        // Resume when tab is visible
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }
});

// Add performance monitoring
let frameCount = 0;
let lastFPSTime = performance.now();

function monitorPerformance() {
    frameCount++;
    const now = performance.now();

    if (now - lastFPSTime >= 5000) { // Check every 5 seconds
        const fps = Math.round(frameCount * 1000 / (now - lastFPSTime));

        // If FPS is too low, reduce effects
        if (fps < 30) {
            MAX_EFFECTS = Math.max(5, MAX_EFFECTS - 2);
            console.log('Performance mode: Reduced effects for better FPS');
        }

        frameCount = 0;
        lastFPSTime = now;
    }

    requestAnimationFrame(monitorPerformance);
}

// Start performance monitoring
requestAnimationFrame(monitorPerformance);

// Add toast slide out animation
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes toastSlideOut {
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyle);

console.log("🌟 SMOOTH COSMIC CUTENESS LOADED! 🌟");
console.log("✨ Optimized for mobile performance!");
console.log("🎮 Keyboard shortcuts: G=Galaxy, S=Stars, H=Hug, M=Magic");