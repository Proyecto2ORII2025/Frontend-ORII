import React from "react";
import SkeletonBarChart from "@/components/ui/charts/skeletonBarChart";
import SkeletonPieChart from "@/components/ui/charts/skeletonPieChart";
import SkeletonLineChart from "@/components/ui/charts/skeletonLineChart";
import ChartError from "@/components/ui/charts/chartError";
import ChartNoFound from "@/components/ui/charts/chartNoFound";
import { LoadingState } from "@/types/ChartTypes";

interface ChartWrapperProps {
  state: LoadingState;
  chartType: "bar" | "pie" | "line";
  children: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ state, chartType, children }) => {
  const getSkeletonComponent = () => {
    switch (chartType) {
      case "bar":
        return <SkeletonBarChart />;
      case "pie":
        return <SkeletonPieChart />;
      case "line":
        return <SkeletonLineChart />;
      default:
        return null;
    }
  };

  let content;
  switch (state) {
    case LoadingState.LOADING:
      content = getSkeletonComponent();
      break;
    case LoadingState.ERROR:
      content = <ChartError />;
      break;
    case LoadingState.NO_DATA:
      content = <ChartNoFound />;
      break;
    case LoadingState.SUCCESS:
      content = children;
      break;
    default:
      content = null;
  }

  return (
    <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
      <div className="mt-5 h-full">
        {content}
      </div>
    </div>
  );
};

export default ChartWrapper;