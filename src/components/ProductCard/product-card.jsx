import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { currencyFormatter } from '../../utils/currencyFormatter';
import Rating from '@mui/material/Rating';
import Heart from '../../assets/svgs/heart';
import './product-card.css';

const ProductCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className='product-card'>
      <div className='product-card__img--container'>
        <img src={item.productImage} alt='product' loading='lazy' className='product-card__img' />
      </div>
      <button className='product-card__cta'>
        <Heart className='product-card__cta--icon' />
      </button>
      <div className='product-card__details'>
        <Link to={`/productDetail/${item.id}`}>
          <h2 className='product-card__heading'>{item.productName}</h2>
        </Link>
        <p className='product-card__sub'>{currencyFormatter(item.productPrice)}</p>
      </div>
      <div className='product-card__rating'>
        <Rating name='read-only size-small' value={4} readOnly />
        <span className='product-card__rating--number'>(43)</span>
      </div>
      <button className='btn product-card__btn' onClick={() => addToCart(item)}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
