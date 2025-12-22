
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex-none w-64 md:w-72 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1">
      <div className="aspect-[4/3] w-full overflow-hidden bg-white/5 flex items-center justify-center relative group">
        <img 
          src={product.imgLink} 
          alt={product.title} 
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>
      <div className="p-4 flex flex-col h-32 justify-between">
        <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
            product.shop.toLowerCase().includes('amazon') 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {product.shop}
          </span>
          <span className="text-[10px] text-zinc-500 font-medium italic">
            {product.country}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
