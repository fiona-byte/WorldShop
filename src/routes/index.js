import Products from '../pages/Products/products';
import ProductDetails from '../pages/ProductDetails/product-details';
import CheckoutConfirm from '../pages/CheckoutConfirm/checkoutConfirm';
import Cart from '../pages/Cart/cart';

export const routes = [
  {
    path: '/',
    element: <Products />,
  },
  {
    path: '/productDetail/:id',
    element: <ProductDetails />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/checkout',
    element: <CheckoutConfirm />,
  },
];
