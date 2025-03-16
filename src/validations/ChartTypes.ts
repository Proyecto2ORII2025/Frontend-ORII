export interface ChartData {
    labels: string[];
    datasets: { 
        label?: string; 
        data: number[] 
    }[];
}

export interface ChartProps {
    title: string;
    xLabel?: string;
    yLabel?: string;
    data: ChartData;
}

export enum LoadingState {
    LOADING,
    ERROR,
    NO_DATA,
    SUCCESS,
}