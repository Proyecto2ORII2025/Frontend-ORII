export const COLORS: string[] = [
    "#4C19AF", "#002A9E", "#0051C6",
    "#16A8E1", "#04B2B5", "#249337",
    "#8CBB22", "#E52724", "#EC6C1F",
    "#F8AE15",
];

/**
 * Calcula la diferencia entre dos colores en HSL
 */
const colorDistance = (hsl1: [number, number, number], hsl2: [number, number, number]): number => {
    const [h1, s1, l1] = hsl1;
    const [h2, s2, l2] = hsl2;
    return Math.sqrt((h1 - h2) ** 2 + (s1 - s2) ** 2 + (l1 - l2) ** 2);
};

/**
 * Convierte un color HEX a HSL
 */
const hexToHSL = (hex: string): [number, number, number] => {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};

/**
 * Obtiene colores aleatorios asegurando que no sean muy similares
 */
export const getDistinctColors = (numColors: number): string[] => {
    let selectedColors: string[] = [];
    
    // Mezclamos los colores originales
    let shuffledColors = [...COLORS].sort(() => 0.5 - Math.random());

    for (let color of shuffledColors) {
        if (selectedColors.length >= numColors) break;

        let colorHSL = hexToHSL(color);
        
        // Verifica que no sea similar a los ya seleccionados
        let isTooSimilar = selectedColors.some(selected => 
            colorDistance(hexToHSL(selected), colorHSL) < 40 // Umbral de diferencia
        );

        if (!isTooSimilar) {
            selectedColors.push(color);
        }
    }

    return selectedColors;
};
