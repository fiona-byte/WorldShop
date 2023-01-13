import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './navigation.css';

const Navigation = () => {
  const { cartItemCount } = useContext(CartContext);

  return (
    <div className='navigation'>
      <Link to='/' className='navigation__logo'>
        WorldShop
      </Link>
      <ul className='navigation__item'>
        <li className='navigation__list'>
          <Link to='/' className='navigation__link'>
            Products
          </Link>
        </li>
        <li className='navigation__list'>
          <Link to='/cart' className='navigation__link'>
            Cart({cartItemCount})
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
