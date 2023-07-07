import React, { useContext, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { SearchContext } from '../contexts/SearchContext';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../Features/cartSlice';

const ViewProducts = ({ isLoading, isError, error, data, sdata }) => {
  const nav = useNavigate();
  const location = useLocation();
  const { categoryData } = useContext(SearchContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [quantity, setQuantity] = useState({});

  const productsData = categoryData
    ? (sdata || data)?.filter((item) => item.category === categoryData)
    : sdata || data;

  const handleAddToCart = (item) => {
    const selectedQuantity = quantity[item.id] || 1;
    dispatch(addItem({ item, quantity: selectedQuantity }));
    setQuantity((prevQuantity) => ({ ...prevQuantity, [item.id]: selectedQuantity }));
  };

  const handleIncreaseQuantity = (itemId) => {
    setQuantity((prevQuantity) => {
      const updatedQuantity = { ...prevQuantity };
      updatedQuantity[itemId] = (updatedQuantity[itemId] || 1) + 1; // Set the default quantity to 1
      return updatedQuantity;
    });
  };

  const handleDecreaseQuantity = (itemId) => {
    setQuantity((prevQuantity) => {
      if (prevQuantity[itemId] > 1) {
        const updatedQuantity = { ...prevQuantity };
        updatedQuantity[itemId] = prevQuantity[itemId] - 1;
        return updatedQuantity;
      }
      return prevQuantity;
    });
  };

  return (
    <div className='mb-10'>
      <p className='text-center pt-16 text-custom-black text-2xl'>Shop at </p>
      <p className='text-center text-color-primary font-bold text-4xl'>Online Store</p>
      <div className='xl:flex'>

        <Sidebar className='w-1/7' data={data} />

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-10 gap-5 w-6/7'>

          {productsData &&
            productsData.map((itemNumber) => (
              <div
                key={itemNumber.id}
                className='border text-black border-gray-300 hover:shadow-lg hover:scale-105 duration-150 cursor-pointer py-6 p-5'
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
                      <p className=' line-clamp-2'>{itemNumber.title}</p>
                    </div>
                    <div className='py-3'>
                      <p className='text-xl text-color-secondary'>${itemNumber.price}</p>
                      <p className='text-sm text-custom-black'>
                        Rating: {itemNumber.rating.rate}({itemNumber.rating.count})
                      </p>
                    </div>
                  </div>
                </Link>
                <div className='flex 2xl:flex-row sm:flex-col gap-3 scale-75 justify-between items-center mt-2'>
                  <div className=''>
                    <div className='flex'>
                      <button
                        className='bg-color-primary text-color-tertiary px-2 py-1 rounded'
                        onClick={() => handleDecreaseQuantity(itemNumber.id)}
                      >
                        -
                      </button>
                      <input
                        type='number'
                        value={quantity[itemNumber.id] !== undefined ? quantity[itemNumber.id] : '1'}
                        onChange={(e) => {
                          const value = e.target.value;
                          setQuantity((prevQuantity) => ({
                            ...prevQuantity,
                            [itemNumber.id]: value !== '' ? parseInt(value) : 1,
                          }));
                        }}
                        min={1}
                        className='w-12 text-center border border-gray-300 rounded'
                      />

                      <button
                        className='bg-color-primary text-color-tertiary px-2 py-1 rounded'
                        onClick={() => handleIncreaseQuantity(itemNumber.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className='bg-color-primary  text-color-tertiary px-4 py-2 rounded'
                    onClick={() => handleAddToCart(itemNumber)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;