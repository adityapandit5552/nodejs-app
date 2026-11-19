
// ==========================================
// CHROMIFY - ADVANCED COLOR STUDIO
// ==========================================

const paletteGrid = document.getElementById('paletteGrid');
const generateBtn = document.getElementById('generateBtn');
const randomizeBtn = document.getElementById('randomizeBtn');
const copyPaletteBtn = document.getElementById('copyPaletteBtn');
const savePaletteBtn = document.getElementById('savePaletteBtn');
const paletteStatus = document.getElementById('paletteStatus');
const toast = document.getElementById('toast');

let colors = [];
let lockedColors = [false, false, false, false, false];

// ==========================================
// COLOR PALETTE GENERATOR
// ==========================================

function randomHex() {
    return '#' + Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase();
}

function generatePalette() {
    colors = Array.from({ length: 5 }, (_, index) =>
        lockedColors[index] && colors[index]
            ? colors[index]
            : randomHex()
    );

    renderPalette();
    paletteStatus.textContent = 'Fresh colors generated successfully!';
}

function renderPalette() {
    paletteGrid.innerHTML = '';

    colors.forEach((color, index) => {
        const card = document.createElement('div');
        card.className = 'color-card';

        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        swatch.style.backgroundColor = color;

        const hex = document.createElement('span');
        hex.className = 'swatch-hex';
        hex.textContent = color;

        const lock = document.createElement('button');
        lock.className = 'lock-btn';
        lock.textContent = lockedColors[index] ? '🔒' : '🔓';
        lock.setAttribute('aria-label', `Toggle lock for ${color}`);

        lock.addEventListener('click', () => {
            lockedColors[index] = !lockedColors[index];
            renderPalette();
        });

        swatch.appendChild(hex);
        swatch.appendChild(lock);

        const copy = document.createElement('button');
        copy.className = 'copy-color';
        copy.textContent = 'Copy HEX ↗';

        copy.addEventListener('click', () => {
            copyText(color);
        });

        card.appendChild(swatch);
        card.appendChild(copy);

        paletteGrid.appendChild(card);
    });
}

// ==========================================
// CLIPBOARD FUNCTIONS
// ==========================================

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied successfully: ' + text);
    } catch (error) {
        showToast('Clipboard access unavailable. Use HTTPS or localhost.');
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ==========================================
// PALETTE BUTTON EVENTS
// ==========================================

generateBtn.addEventListener('click', generatePalette);
randomizeBtn.addEventListener('click', generatePalette);

copyPaletteBtn.addEventListener('click', () => {
    if (colors.length === 0) {
        showToast('Generate a palette first.');
        return;
    }

    copyText(colors.join(', '));
});

// ==========================================
// SAVE FAVORITE PALETTE
// ==========================================

function savePalette() {
    if (colors.length === 0) {
        showToast('Generate a palette first.');
        return;
    }

    try {
        const saved = JSON.parse(
            localStorage.getItem('chromify-palettes') || '[]'
        );

        saved.push({
            id: Date.now(),
            colors: [...colors],
            createdAt: new Date().toISOString()
        });

        localStorage.setItem(
            'chromify-palettes',
            JSON.stringify(saved)
        );

        showToast('Palette saved successfully!');
        paletteStatus.textContent = 'Your favorite palette has been saved.';
    } catch (error) {
        showToast('Unable to save palette.');
    }
}

savePaletteBtn.addEventListener('click', savePalette);

// ==========================================
// GRADIENT STUDIO
// ==========================================

const gradientColor1 = document.getElementById('gradientColor1');
const gradientColor2 = document.getElementById('gradientColor2');
const gradientDirection = document.getElementById('gradientDirection');
const gradientPreview = document.getElementById('gradientPreview');
const cssOutput = document.getElementById('cssOutput');
const copyCssBtn = document.getElementById('copyCssBtn');

function updateGradient() {
    const css = `linear-gradient(${gradientDirection.value}, ${gradientColor1.value}, ${gradientColor2.value})`;

    gradientPreview.style.background = css;
    cssOutput.textContent = `background: ${css};`;
}

[gradientColor1, gradientColor2, gradientDirection].forEach(control => {
    control.addEventListener('input', updateGradient);
});

copyCssBtn.addEventListener('click', () => {
    copyText(cssOutput.textContent);
});

// ==========================================
// COLOR CONVERTER
// ==========================================

const colorPicker = document.getElementById('colorPicker');
const selectedColor = document.getElementById('selectedColor');
const hexValue = document.getElementById('hexValue');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');

function hexToRgb(hex) {
    const value = hex.replace('#', '');

    return {
        r: parseInt(value.substring(0, 2), 16),
        g: parseInt(value.substring(2, 4), 16),
        b: parseInt(value.substring(4, 6), 16)
    };
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

            case g:
                h = (b - r) / d + 2;
                break;

            default:
                h = (r - g) / d + 4;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function updateConverter() {
    const hex = colorPicker.value.toUpperCase();
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    selectedColor.style.background = hex;

    hexValue.textContent = hex;
    rgbValue.textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    hslValue.textContent = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

colorPicker.addEventListener('input', updateConverter);

document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.copy);
        copyText(target.textContent);
    });
});

// ==========================================
// INITIALIZE APPLICATION
// ==========================================

generatePalette();
updateGradient();
updateConverter();

console.log('Chromify Color Studio initialized successfully!');
