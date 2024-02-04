import React from 'react';
import { Line } from 'react-chartjs-2';
import { useChat } from '../../utilities/context/ChatContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components required by Chart.js to render the Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// ChartJS.register(...registerables);
const LineChart = () => {
   const { processDataForLineChart, formatTime, messages } = useChat();
   const data = processDataForLineChart(messages);
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Minute of the Hour',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Messages',
        },
        beginAtZero: true, // Ensures the scale starts from zero
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Message Frequency Analysis (${formatTime()})`,
      },
      
      tooltip: {
        enabled: true, // Enable tooltips
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest', // Tooltip and hover interactions will target the nearest item
      intersect: false,
      axis: 'x',
    },
  };

  return (
    <div className='flex-grow border rounded-md p-4 w-11/12 '>
      <Line
        data={{
          labels: Array.from({ length: 60 }, (_, i) => i.toString()), // 0-59 minutes
          datasets: [
            {
              label: `Messages per Minute`,
              data: data,
              fill: false,
              borderColor: 'rgb(255, 159, 64)',
              tension: 0.4,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};



export default LineChart;
