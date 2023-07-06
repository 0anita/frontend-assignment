// src/components/ViewProducts.js

import React, { useContext, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { SearchContext } from '../contexts/SearchContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCarts } from '../Features/cartSlice';

const ViewProducts = ({ isLoading, isError, error, data, sdata }) => {
  const nav = useNavigate();
  const location = useLocation();
  const { categoryData } = useContext(SearchContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [quantity, setQuantity] = useState(1);

  const productsData = categoryData
    ? (sdata || data)?.filter((item) => item.category === categoryData)
    : sdata || data;

  const handleAddToCart = (item) => {
    dispatch(addToCarts({ item, quantity }));
    setQuantity(1);
  };


  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className='xl:flex'>
      <Sidebar data={data} />

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-10 gap-5'>
        {productsData &&
          productsData.map((itemNumber) => (
            <div
              key={itemNumber.id}
              className='border border-gray-300 hover:shadow-lg hover:scale-105 duration-150 cursor-pointer p-5'
            >
              <Link
                to={`/product/detail/${encodeURIComponent(itemNumber.title)}`}
                state={itemNumber}
                onClick={(e) => {
                  e.preventDefault();
                  nav(`/product/detail/${encodeURIComponent(itemNumber.title)}`, { state: itemNumber });
                }}
              >
                <div className='grid grid-row-3'>
                  <div className='flex justify-center'>
                    <img src={itemNumber.image} alt='' className='h-28 w-auto object-contain' />
                  </div>
                  <div className='h-16 py-4'>
                    <p className='line-clamp-2'>{itemNumber.title}</p>
                  </div>
                  <div className='py-3'>
                    <p className='text-xl text-cyan-900'>${itemNumber.price}</p>
                    <p className='text-sm text-gray-500'>
                      Rating: {itemNumber.rating.rate}({itemNumber.rating.count})
                    </p>
                  </div>
                </div>
              </Link>
              <div className='flex 2xl:flex-row flex-col gap-3 scale-75 justify-between items-center mt-2'>
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
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      min={1}
                      className='w-12 text-center border border-gray-300 rounded'
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
                  className='bg-red-500  text-white px-4 py-2  rounded'
                  onClick={() => handleAddToCart(itemNumber)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewProducts;