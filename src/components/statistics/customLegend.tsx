import React from "react";

interface CustomLegendProps {
    labels: string[];
    backgroundColors: string[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ labels, backgroundColors }) => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
        {labels.map((label, i) => (
            <div key={i} className="flex items-center space-x-2">
                <span
                    className="w-4 h-4 rounded-sm inline-block"
                    style={{ backgroundColor: backgroundColors[i % backgroundColors.length] }}
                ></span>
                <span className="text-sm">{label}</span>
            </div>
        ))}
    </div>
);

export default CustomLegend;

