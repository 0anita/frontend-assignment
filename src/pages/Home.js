import React, { useContext } from 'react';
import ViewProducts from '../components/ViewProducts';

const Home = ({ isLoading, isError, error, data }) => {

  return (
    <div className='md:flex'>

      <ViewProducts
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

    </div>
  );
};

export default Home;
