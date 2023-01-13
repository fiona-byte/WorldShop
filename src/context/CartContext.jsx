import { createContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import db from '../services/db';

export const CartContext = createContext({});

const cartFromLocalStorage = db.findAll();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: '',
  });
  const { vertical, horizontal, open, message } = snackbarState;
  db.insert(cartItems);

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  // Total number of items in the cart
  const cartItemCount = cartItems?.reduce((itemQuantity, item) => item.itemQuantity + itemQuantity, 0);

  // Add products to cart
  const addToCart = (product) => {
    const existingCartItems = cartItems.find((value) => value.id === product.id);
    if (existingCartItems) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...existingCartItems, itemQuantity: existingCartItems.itemQuantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, itemQuantity: 1 }]);
    }
    setSnackbarState({ ...snackbarState, open: true, message: 'Item added to cart' });
  };

  // Increase the number of an item in the cart
  const increaseCartQuantity = (product) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === product.id) == null) {
        const newValue = [...currentItems, { ...product, itemQuantity: 1 }];
        return db.update(product.id, newValue);
      } else {
        return currentItems.map((item) => {
          if (item.id === product.id) {
            const newValue = { ...item, itemQuantity: item.itemQuantity + 1 };
            return db.update(product.id, newValue);
          } else {
            return item;
          }
        });
      }
    });
  };

  // Decrease number of an item in the cart
  const decreaseCartQuantity = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.itemQuantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            const newValue = { ...item, itemQuantity: item.itemQuantity - 1 };
            return db.update(id, newValue);
          } else {
            return item;
          }
        });
      }
    });
  };

  // Remove items from the cart
  const removeFromCart = (id) => {
    setCartItems(db.delete(id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartItemCount,
        addToCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {children}
      <Snackbar
        className='snackbar'
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        message={message}
        key={vertical + horizontal}
      />
    </CartContext.Provider>
  );
};

export default CartProvider;
