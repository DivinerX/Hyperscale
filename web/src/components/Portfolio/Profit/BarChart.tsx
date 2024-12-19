import { FC } from "react";
import { Bar } from "react-chartjs-2";

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

export const BarChart: FC<{ invest: number; historicalData: [number, number][] }> = ({ invest, historicalData }) => {
  const labels = historicalData.map(data => new Date(data[0]));
  const profit = historicalData.map(data => (data[1] - invest) / invest * 100);

  const data = {
    labels,
    datasets: [
      {
        label: 'profit',
        data: profit,
        borderColor: profit.map(price => price > 0 ? 'rgba(97, 229, 73, 1)' : 'rgba(169, 0, 14, 1)'),
        fill: true,
        borderWidth: 2,
        tension: 1
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          },
          y: {
            border: {
              dash: [4, 4]
            },
            grid: {
              display: true,
              color: 'rgba(86, 86, 86, 0.5)',
              tickBorderDash: [5, 5],
            },
            ticks: {
              callback: (tickValue: string | number) => {
                return `${tickValue}%`;
              }
            },
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
      }}
    />
  );
};