import React from 'react';
import { Line } from 'react-chartjs-2';
import { renderUnitedPrice } from '@/services/renderNumber';

import 'chartjs-adapter-date-fns';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Filler, Tooltip, Legend, TimeScale);

export const LineChart: React.FC<{ timePeriod: "1 Year" | "1 Month" | "1 Week" | "1 Day"; historicalData: [number, number][] }> = ({ timePeriod, historicalData }) => {
  const labels = historicalData.map(data => new Date(data[0]));
  const prices = historicalData.map(data => data[1]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: 'rgba(88, 119, 215, 1)',
        backgroundColor: 'rgba(88, 119, 215, 0.2)',
        fill: true,
        borderWidth: 2,
        tension: 1,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointHitRadius: 1,
        pointBorderWidth: 0,
        pointBorderColor: 'rgba(88, 119, 215, 1)',
        pointBackgroundColor: 'rgba(88, 119, 215, 1)',
      },
    ],
  };

  return (
    <Line
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
                hour: 'HH:mm'
              }
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
                return `$${renderUnitedPrice(tickValue)}`;
              }
            },
            min: 0
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
      }}
    />
  );
};
