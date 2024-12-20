import { BarChart } from "./BarChart";
import { FC } from "react";

import 'chartjs-adapter-date-fns';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, TimeScale);

export const Profit: FC<{ historicalData: [number, number][]; invest: number; timePeriod: '1 Year' | '1 Month' | '1 Week' | '1 Day' }> = ({ historicalData, invest, timePeriod }) => {
  return (
    <div className="w-1/2 h-[450px] flex flex-col border border-white/10">
      <div className="flex flex-row border-b border-white/10">
        <span className="text-sm text-white uppercase px-6 py-1 border-r cursor-pointer border-white/10">profit and loss</span>
      </div>
      <div className="w-full h-full pl-2 flex items-center justify-center">
        <BarChart 
          invest={invest}
          historicalData={historicalData}
          timePeriod={timePeriod}
        />
      </div>
    </div>
  );
};