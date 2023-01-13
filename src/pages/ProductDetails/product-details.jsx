import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useMobile } from '../../hooks/useMobile';
import { currencyFormatter } from '../../utils/currencyFormatter';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import products from '../../data/item.json';
import Rating from '@mui/material/Rating';
import Heart from '../../assets/svgs/heart';
import Plus from '../../assets/svgs/plus';
import Minus from '../../assets/svgs/minus';
import './product-details.css';

const ProductDetails = () => {
  const isMobile = useMobile();
  const { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity } = useContext(CartContext);
  const [value, setValue] = useState(4);
  const [product, setProduct] = useState({});
  const [productItem, setProductItem] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const product = products?.find((data) => data.id === Number(id));
    if (product) setProduct(product);

    const cartItem = cartItems?.find((item) => item.id === Number(id));
    if (cartItem) setProductItem(cartItem);
  }, [id, cartItems]);

  return (
    <>
      <div className='product-details'>
        {!Object.keys(product).length ? (
          <Skeleton variant='rectangular' width={isMobile ? '100%' : '45%'} height={'30rem'} />
        ) : (
          <div className='product-details__image--container'>
            <div className='product-details__image--box'>
              <img src={product?.productImage} loading='lazy' alt='product' className='product-details__main--image' />
            </div>
            <div className='product-details__sub-img--wrapper'>
              <div className='product-details__sub-img--box active'>
                <img src={product?.productImage} loading='lazy' alt='product' className='product-details__sub--image' />
              </div>
              <div className='product-details__sub-img--box'>
                <img src={product?.productImage} loading='lazy' alt='product' className='product-details__sub--image' />
              </div>
              <div className='product-details__sub-img--box'>
                <img src={product?.productImage} loading='lazy' alt='product' className='product-details__sub--image' />
              </div>
            </div>
          </div>
        )}
        <div className='product-details__container'>
          {!Object.keys(product).length ? (
            <>
              <Skeleton width={isMobile ? '80%' : '40%'} height={isMobile ? 30 : 50} />
              <Skeleton width={isMobile ? '70%' : '30%'} height={isMobile ? 20 : 30} />
            </>
          ) : (
            <>
              <div className='product-details__flex'>
                <h2 className='product-details__name'>{product?.productName}</h2>
                <button className='product-details__cta'>
                  <Heart className='product-details__cta--icon' />
                </button>
              </div>
              <div className='product-details__rating'>
                <Rating name='simple-controlled' value={value} onChange={(e, newValue) => setValue(newValue)} />
                <span className='product-details__rating--number'>(43)</span>
              </div>
              <h1 className='product-details__price'>{currencyFormatter(product?.productPrice)}</h1>
            </>
          )}
          {!Object.keys(product).length ? (
            <>
              {!isMobile && (
                <Box sx={{ pt: 7, width: '100%', height: '100%' }}>
                  <Skeleton animation='wave' height={20} width='100%' />
                  <Skeleton animation='wave' height={20} width='60%' />
                  <Skeleton animation='wave' height={20} width='40%' />
                </Box>
              )}
            </>
          ) : (
            <>
              <p className='product-details__description'>{product?.productDescription}</p>
              {Object.keys(productItem).length > 0 && (
                <div className='product-details__switch'>
                  <button
                    className='product-details__switch--btn'
                    onClick={() => decreaseCartQuantity(product.id)}
                    disabled={productItem.itemQuantity === 1}
                  >
                    <Minus className='product-details__switch--btn-icon' />
                  </button>
                  <p className='product-details__item-count'>{productItem.itemQuantity}</p>
                  <button className='product-details__switch--btn' onClick={() => increaseCartQuantity(product)}>
                    <Plus className='product-details__switch--btn-icon' />
                  </button>
                </div>
              )}
              <button className='btn product-details__btn' onClick={() => addToCart(product)}>
                Add to cart
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
