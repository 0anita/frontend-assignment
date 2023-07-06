import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFormCart, updateCart } from '../Features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);

  const [updatedItems, setUpdatedItems] = useState(cartItems.map(item => ({ ...item, quantity: 0 })));


  const handleQuantityChange = (itemId, quantity) => {
    const updatedCartItems = updatedItems.map((item) => {
      if (item.item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });

    setUpdatedItems(updatedCartItems);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = updatedItems.map((item) => {
      if (item.item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setUpdatedItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = updatedItems.map((item) => {
      if (item.item.id === itemId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setUpdatedItems(updatedCartItems);
  };

  const handleUpdateCart = () => {
    dispatch(updateCart(updatedItems.map((item) => ({ ...item.item, quantity: item.quantity }))));
  };


  return (
    <div className='p-6 flex flex-col justify-center items-center'>
      {updatedItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className='flex flex-col gap-10'>
          {updatedItems.map((item) => (
            <li className='' key={item.item.id}>
              {item.item.title}
              <div className='flex '>
                <span className='pr-5'>Quantity:</span>
                <button onClick={() => handleDecreaseQuantity(item.item.id)}>-</button>
                <input
                  className='w-14 text-center'
                  type='number'
                  min='0'
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.item.id, parseInt(e.target.value))}
                />
                <button onClick={() => handleIncreaseQuantity(item.item.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleUpdateCart}>Update</button>
    </div>
  );
};

export default Cart;
