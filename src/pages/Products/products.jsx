import ProductCard from '../../components/ProductCard/product-card';
import products from '../../data/item.json';
import './products.css';

const Products = () => {
  return (
    <div className='products'>
      <h2 className='heading products__heading'>Products</h2>
      <div className='products__container'>
        {products.map((item, id) => (
          <ProductCard key={id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
