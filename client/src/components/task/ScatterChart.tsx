import React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
ChartJS.register(...registerables);


const ScatterChart = () => {
  


  return (
    <div className='flex-grow border rounded-md p-4  w-11/12'>
      <Scatter
        data={{
          datasets: [
            {
              label: 'Scatter Dataset',
              data: [
                {
                  x: -10,
                  y: 0,
                },
                {
                  x: 0,
                  y: 10,
                },
                {
                  x: 10,
                  y: 5,
                },
                {
                  x: 0.5,
                  y: 5.5,
                },
              ],
              backgroundColor: 'rgb(255, 99, 132)',
            },
          ],
        }}
      />
    </div>
  );
}

export default ScatterChart