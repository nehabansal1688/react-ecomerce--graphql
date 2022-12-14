import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import './category.style.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap, loading } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <React.Fragment>
      {loading ? (
        <span> data is not yet loaded </span>
      ) : (
        <React.Fragment>
          <h2 className="category-title">{category.toUpperCase()}</h2>
          <div className="category-wrapper">
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Category;
