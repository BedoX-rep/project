import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
  const { t } = useLanguage();
  
  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="product-image"
        />
        <div className="product-overlay" />
        <div className="product-details">
          <h3 className="font-serif text-lg mb-1">{name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm opacity-75">{category}</span>
            <span className="font-medium">
              ${price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;