import { Link } from 'react-router-dom';
import checkmark from '../../assets/svgs/checkmark.gif';
import './checkoutConfirm.css';

const CheckoutConfirm = () => {
  return (
    <div className='checkout-confirm'>
      <div className='checkout-confirm__container'>
        <h2 className='heading checkout-confirm__heading'>
          <span>Thank you </span>
          <span>for your order</span>
        </h2>
        <div className='checkout-confirm__icon--container'>
          <img src={checkmark} alt='checkmark icon' className='checkout-confirm__icon' />
        </div>
        <div className='checkout-confirm__box'>
          <h3 className='checkout-confirm__box--heading'>Estimated Delivery</h3>
          <p className='checkout-confirm__box--sub'>January 30, 2023</p>
        </div>
        <p className='checkout-confirm__text'>Your order has been accepted, we'd notify you when your order ships</p>
        <Link to='/' className='btn checkout-confirm__btn'>Back to shop</Link>
      </div>
    </div>
  );
};

export default CheckoutConfirm;
