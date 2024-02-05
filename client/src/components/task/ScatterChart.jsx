import React from 'react';
import { useChat } from '../../utilities/context/ChatContext';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
ChartJS.register(...registerables);

const ScatterChart = () => {
  const { processDataForScatterChart, messages } = useChat();
  const data = processDataForScatterChart(messages);

  return (
    <div className='flex-grow border rounded-md p-4 w-11/12'>
      <Scatter
        data={{
          datasets: [
            {
              label: 'Message Order vs. Length',
              data: data,
              backgroundColor: 'rgb(255, 99, 132)',
            },
          ],
        }}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Message Order (index)',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Message Length (characters)',
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Analysis of Message Length Over Sequential Order',
            },
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        }}
      />
    </div>
  );
};

export default ScatterChart;
