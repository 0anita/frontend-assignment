import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../Features/cartSlice';

const ProductDetails = () => {
  const { state } = useLocation();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const { title } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.items);

  const getItemQuantityInCart = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };


  const handleOpenImage = () => {
    setIsImageOpen(true);
  };

  const handleCloseImage = () => {
    setIsImageOpen(false);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };




  const handleAddToCart = (item) => {
    dispatch(addItem({ item, quantity }));
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
          <p>{state.overview}</p>

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
            <p className='font-bold text-xl'>Price: </p>
            <p className='text-2xl font-bold'>${state.price}</p>
          </div>
          <div className='flex gap-20 lg:gap-56 items-center'>
            <span className='font-bold text-xl py-1'>Rating: </span>
            <Rating name="read-only" value={state.rating.rate} readOnly />
          </div>
          <div className='grid grid-cols-2 w-full'>
            <span className='font-bold text-xl mb-4'>Rated by:</span> <span>{state.rating.count} users</span>
          </div>
          <div className='flex flex-col gap-3 scale-75 items-center xl:items-end mt-2'>
            <div className=''>
              <div className='flex'>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded'
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <input
                  type='number'
                  value={quantity}
                  min={1}
                  className='text-center border border-gray-300  rounded'
                  readOnly
                />
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded'
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className='bg-red-500  text-white px-4 py-2 rounded'
              onClick={() => handleAddToCart(state)}
            >
              Add to Cart
            </button>
          </div>
          <div className='p-5 flex justify-center xl:justify-end'>
            <p className='text-gray-500 text-[17px]'>Quantity in Cart: <span className='px-2'>{getItemQuantityInCart(state.id)}</span></p>
          </div>




        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

