import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Detail = () => {
  const { state } = useLocation();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const { title } = useParams();

  const handleOpenImage = () => {
    setIsImageOpen(true);
  };

  const handleCloseImage = () => {
    setIsImageOpen(false);
  };

  return (
    <div>
      <div className='flex xl:flex-row flex-col p-20 justify-center gap-20 items-center'>
        <div>
          <img
            className={`xl:max-w-sm lg:max-w-xs max-w-sm ${isImageOpen ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            src={state.image}
            alt={state.title}
            onClick={handleOpenImage}
          />
        </div>

        <div className='text-xl max-w-md md:max-w-lg 2xl:max-w-2xl p-4'>

          <h1 className='text-4xl py-5 font-bold'>{state.title}</h1>
          <p >{state.overview}</p>

          {/* for larger screen  */}
          <div className='hidden md:grid grid-cols-2 w-full'>
            <div className='py-1'>
              <p className='font-bold text-xl pb-2'>Product Type : </p>
              <p className='font-bold text-xl'>Description: </p>
            </div>
            <div className='py-1'>
              <p className='capitalize pb-2'>{state.category}</p>
              <p className='overflow-y-scroll line-clamp-6'>{state.description}</p>

            </div>
          </div>

          {/* for smaller screen  */}
          <div className='md:hidden'>
            <div className=''>
              <p className='font-bold text-xl'>Product Type : </p>
              <p className='capitalize pb-7'>{state.category}</p>

            </div>
            <div className='py-1'>
              <p className='font-bold text-xl'>Description: </p>
              <p className=''> {state.description} </p>
            </div>
          </div>
          {/* for all screen  */}

          <div className='grid grid-cols-2 pt-2 w-full'>
            <p className='font-bold text-xl '>Price: </p>
            <p className='text-2xl font-bold'>${state.price}</p>
          </div>
          <div className='flex gap-20 lg:gap-56 items-center'>
            <span className='font-bold text-xl py-1'>Rating: </span>
            <Rating name="read-only" value={state.rating.rate} readOnly />
          </div>
          <div className='grid grid-cols-2 w-full'>
            <span className='font-bold text-xl '>Rated by:</span> <span>{state.rating.count} users</span>

          </div>


          {/* <div className='sm:flex gap-10 items-center'>
            <div className={`sm:inline-block my-4 p-3 text-white text-center ${ratingClass}`}>
              <p className='text-3xl font-bold'>{state.vote_average.toFixed(2)}</p>
              <p className='font-light'>{state.vote_count} votes</p>
            </div>
            <p className='flex items-center gap-2'>
              Grade: <span className='font-bold text-3xl'>{grade}</span>
            </p>
          </div> */}
        </div>

      </div>
      {isImageOpen && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-screen z-40 bg-black bg-opacity-70"
          onClick={handleCloseImage}
        >
          <div>
            <img className='max-h-[70vh] max-w-full' src={state.image} alt={state.title} />
            <p className='text-gray-200 py-2 text-center '>{state.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

