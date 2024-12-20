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

export const BarChart: FC<{ invest: number; historicalData: [number, number][]; timePeriod: '1 Year' | '1 Month' | '1 Week' | '1 Day' }> = ({ invest, historicalData, timePeriod }) => {
  const labels = historicalData.map(data => new Date(data[0]));
  const profit = historicalData.map(data => (data[1] - invest) / invest * 100);

  const data = {
    labels,
    datasets: [
      {
        label: 'profit',
        data: profit,
        borderColor: profit.map(price => price > 0 ? 'rgba(97, 229, 73, 1)' : 'rgba(169, 0, 14, 1)'),
        backgroundColor: profit.map(price => price > 0 ? 'rgba(97, 229, 73, 0.5)' : 'rgba(169, 0, 14, 0.5)'),
        fill: true,
        borderWidth: 1,
        tension: 2,
        barThickness: 1
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
              unit: timePeriod === '1 Year' ? 'month' : timePeriod === '1 Month' ? 'week' : timePeriod === '1 Week' ? 'day' : 'hour',
              displayFormats: {
                month: 'MMM',
                week: 'MMM dd',
                day: 'MMM dd',
                hour: 'HH'
              }
            },
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
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
      }}
    />
  );
};