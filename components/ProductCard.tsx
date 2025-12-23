
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Use affiliateLink if available, otherwise just a placeholder or no link
  const LinkWrapper = product.affiliateLink ? 'a' : 'div';
  const linkProps = product.affiliateLink 
    ? { href: product.affiliateLink, target: "_blank", rel: "noopener noreferrer" } 
    : {};

  return (
    <LinkWrapper 
      {...linkProps}
      className="flex-none w-[75vw] sm:w-64 md:w-72 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-700 active:scale-[0.98] sm:hover:-translate-y-1 block touch-manipulation"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-white/5 flex items-center justify-center relative group">
        <img 
          src={product.imgLink} 
          alt={product.title} 
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-500 sm:group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 sm:group-hover:bg-transparent transition-colors duration-300"></div>
        {product.affiliateLink && (
           <div className="absolute top-2 right-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-indigo-600 text-white p-1.5 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </div>
           </div>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col h-28 sm:h-32 justify-between">
        <h3 className="text-xs sm:text-sm font-semibold text-zinc-100 line-clamp-2 leading-tight sm:leading-snug">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md uppercase tracking-wider ${
            product.shop.toLowerCase().includes('amazon') 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {product.shop}
          </span>
          <span className="text-[9px] sm:text-[10px] text-zinc-500 font-medium italic">
            {product.country}
          </span>
        </div>
      </div>
    </LinkWrapper>
  );
};

export default ProductCard;
