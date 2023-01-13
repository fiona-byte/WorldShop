import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useMobile } from '../../hooks/useMobile';
import { currencyFormatter } from '../../utils/currencyFormatter';
import products from '../../data/item.json';
import Minus from '../../assets/svgs/minus';
import Plus from '../../assets/svgs/plus';
import Trash from '../../assets/svgs/trash';
import '../../pages/Cart/cart.css';

const CartCard = ({ id, itemQuantity }) => {
  const isMobile = useMobile();

  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useContext(CartContext);

  const item = products.find((product) => product.id === id);

  return (
    <div className='cart__card'>
      <div className='cart__box'>
        <div className='cart__image--container'>
          <img src={item.productImage} alt='product' className='cart__image' />
        </div>
        <div className='cart__box--container'>
          <div className='cart__box--details'>
            <h2 className='cart__box--heading'>{item.productName}</h2>
            <p className='cart__box--total-price'>{currencyFormatter(item.productPrice * itemQuantity)}</p>
          </div>
          {!isMobile && <p className='cart__box--price'>{currencyFormatter(item.productPrice)}</p>}
          <p className='cart__box--availability'>In stock</p>
          <div className='cart__flex'>
            <button className='cart__box--btn' onClick={() => removeFromCart(item.id)}>
              {isMobile ? <Trash className='cart__box--icon' /> : 'Delete'}
            </button>
            <div className='cart__switch'>
              <button className='cart__switch--btn' onClick={() => decreaseCartQuantity(item.id)}>
                <Minus className='cart__switch--btn-icon' />
              </button>
              <p className='cart__item-count'>{itemQuantity}</p>
              <button className='cart__switch--btn' onClick={() => increaseCartQuantity(item)}>
                <Plus className='cart__switch--btn-icon' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
