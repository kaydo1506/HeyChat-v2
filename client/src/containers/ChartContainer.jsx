import React from 'react';
import LineChart from '../components/task/LineChart';
import ScatterChart from '../components/task/ScatterChart';
import { Back } from '../utilities/icons';
import { Link } from 'react-router-dom';

const ChartContainer = () => {
 
  return (
    <div className=' bg-gray-900 text-white h-screen flex justify-center p-2 md:p-14'>
      <Link to='/chat'>
        <Back />
      </Link>
      <div className='flex flex-col  items-center gap-12 lg:w-1/2 w-11/12 mx-auto'>
        <ScatterChart />
        <LineChart />
      </div>
    </div>
  );
};

export default ChartContainer;
