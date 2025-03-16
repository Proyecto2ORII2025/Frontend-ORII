export const COLORS: string[] = [
    "#4C19AF", "#04B2B5", "#002A9E",
    "#16A8E1", "#0051C6", "#249337",
    "#EC6C1F", "#8CBB22", "#E52724",
    "#F8AE15"
];

export const getDistinctColors = (numColors: number): string[] => {
    const colors = [...COLORS];

    while (colors.length < numColors) {
        const baseColor = COLORS[colors.length % COLORS.length];
        const variation = Math.floor(colors.length / COLORS.length) * 20;
        const newColor = varyColor(baseColor, variation);
        colors.push(newColor);
    }

    return colors.slice(0, numColors);
};

const varyColor = (color: string, variation: number): string => {
    let [h, s, l] = rgbToHsl(color);
    h = (h + variation) % 360;
    s = Math.min(100, s + variation / 2);
    l = Math.min(100, l + variation / 2);
    return hslToHex(h, s, l);
};

const rgbToHsl = (color: string): [number, number, number] => {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return [h, s * 100, l * 100];
};

const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const r = Math.round(f(0) * 255);
    const g = Math.round(f(8) * 255);
    const b = Math.round(f(4) * 255);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};