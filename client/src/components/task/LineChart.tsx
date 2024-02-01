import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(...registerables);

const LineChart = () => {
  return (
    <div className='flex-grow border rounded-md p-4  w-11/12'>
      <Line
        data={{
          labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          datasets: [
            {
              label: 'Revenue',
              data: [65, 59, 80, 81, 70, 75, 40],
              fill: false,
              borderColor: 'orange',
              tension: 0.2,
            },
            {
              label: 'Test',
              data: [50, 40, 50, 70, 56, 55, 40],
              fill: false,
              borderColor: 'pink',
              tension: 0.2,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
