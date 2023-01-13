import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { currencyFormatter } from '../../utils/currencyFormatter';
import CartCard from '../../components/CartCard/cart-card';
import db from '../../services/db';
import './cart.css';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, cartItem) => total + cartItem.productPrice * cartItem.itemQuantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
    setCartItems(db.deleteAll());
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className='empty-cart'>
          <h1 className='heading empty-cart__heading'>Oops</h1>
          <p className='empty-cart__sub'>Nothing in cart</p>
          <Link to='/' className='btn empty-cart__btn'>
            Go to Products
          </Link>
        </div>
      ) : (
        <div className='cart'>
          <h2 className='heading cart__heading'>Cart</h2>
          <div className='cart__container'>
            {cartItems.map((item) => (
              <CartCard key={item.id} {...item} />
            ))}
          </div>
          <h3 className='cart__total'>
            <span className='cart__total--text'>Subtotal &nbsp;</span>
            <span className='cart__subtotal'>{currencyFormatter(totalPrice)}</span>
          </h3>
          <button className='btn cart__btn' onClick={handleCheckout}>
            Proceed to checkout ({cartItems.length > 1 ? `${cartItems.length} items` : `${cartItems.length} item`} )
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
