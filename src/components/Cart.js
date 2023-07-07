import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../Features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

// Import Material-UI components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [updatedItems, setUpdatedItems] = useState([...cartItems]);
  const [open, setOpen] = useState(false); // State variable for dialog open/close
  const [selectedItemId, setSelectedItemId] = useState(null); // State variable to store the selected item ID

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = updatedItems.map((item) => {
      if (item.item && item.item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setUpdatedItems(updatedCartItems);
    dispatch(updateItem(updatedCartItems));
  };

  const navigate = useNavigate();

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = updatedItems.map((item) => {
      if (item.item && item.item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setUpdatedItems(updatedCartItems);
    dispatch(updateItem(updatedCartItems));
  };

  const handleRemoveItem = (itemId) => {
    handleClickOpen(itemId);
    // Open the confirmation dialog
  };



  const handleClickOpen = (itemId) => {
    setSelectedItemId(itemId);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItemId(null);
    setOpen(false);
  };

  // Calculate the grand total
  const grandTotal = updatedItems.reduce(
    (total, item) => total + item.item.price * item.quantity,
    0
  );

  // ConfirmationDialog component
  const ConfirmationDialog = ({ open, onClose }) => {
    const handleConfirm = () => {
      // Perform the actual removal of the item
      const updatedCartItems = updatedItems.filter((item) => item.item.id !== selectedItemId);
      setUpdatedItems(updatedCartItems);
      dispatch(updateItem(updatedCartItems));
      onClose();
    };

    const handleCancel = () => {
      onClose();
    };

    return (
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" component="div">
            Are you sure you want to remove this item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="secondary">
            Yes
          </Button>
          <Button onClick={handleCancel} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="p-7">
      <div className="flex justify-center">
        <ul className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-12 ">
          {updatedItems.map((item) => (
            <li
              className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 grid grid-cols-1"
              key={item.item?.id}
            >
              <Link to={`/product/detail/${encodeURIComponent(item.item.title)}`}
                state={item.item}>
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => navigate(`/product/detail/${encodeURIComponent(item.item.title)}`)}
                >
                  <img src={item.item.image} className="p-1 object-contain h-40" alt="" />
                </div>
              </Link>

              <p className="font-bold">{item.item?.title}</p>
              <div className="flex justify-between">
                <span className="">Price: </span>
                <span>${item.item.price.toFixed(2)} </span>
              </div>
              <div className="flex justify-between">
                <span>Quantity: </span>
                <div>
                  <button
                    className="bg-color-primary text-white px-1 duration-200 hover:bg-black"
                    onClick={() => handleDecreaseQuantity(item.item?.id)}
                  >
                    -
                  </button>
                  <span className="px-2"> {item.quantity}</span>
                  <button
                    className="bg-color-primary text-white px-1 duration-200 hover:bg-black"
                    onClick={() => handleIncreaseQuantity(item.item?.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="">Total Price: </p>
                ${(item.item.price * item.quantity).toFixed(2)}
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-color-primary hover:bg-white hover:text-red-600 hover:shadow-md duration-200 text-white p-1 w-1/2 h-9 my-1"
                  onClick={() => handleRemoveItem(item.item?.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center py-6">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex justify-center font-bold items-center gap-2">
            <div className=''>Grand Total: </div>
            <div className="">${grandTotal.toFixed(2)}</div>
          </div>
          <div className="flex justify-center font-bold items-center cursor-pointer bg-custom-black rounded p-1 text-white w-[200px] gap-2">
            <button>Order Now</button>
          </div>

        </div>
      </div>
      {/* Render ConfirmationDialog */}
      <ConfirmationDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default Cart;

