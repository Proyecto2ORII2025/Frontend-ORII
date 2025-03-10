export interface ChartData {
    labels: string[];
    datasets: { 
        label?: string; 
        data: number[] 
    }[];
}

export interface ChartProps {
    xLabel?: string;
    yLabel?: string;
    data: ChartData;
}