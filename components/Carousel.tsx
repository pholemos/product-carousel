
import React, { useRef, useEffect, useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface CarouselProps {
  products: Product[];
}

const Carousel: React.FC<CarouselProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      
      let scrollTo: number;
      if (direction === 'left') {
        scrollTo = scrollLeft - clientWidth * 0.8;
        if (scrollTo < 0) scrollTo = scrollWidth - clientWidth; // Wrap to end
      } else {
        scrollTo = scrollLeft + clientWidth * 0.8;
        if (scrollTo + clientWidth >= scrollWidth - 10) scrollTo = 0; // Wrap to start
      }
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  // Auto-rotation logic
  useEffect(() => {
    if (isPaused || products.length <= 1) return;

    const interval = setInterval(() => {
      scroll('right');
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, products.length]);

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-zinc-500">No products found for your region.</p>
      </div>
    );
  }

  return (
    <div 
      className="relative py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative group">
        {/* Side Navigation Buttons - Left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-sm text-zinc-100 shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Side Navigation Buttons - Right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-sm text-zinc-100 shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x px-4 sm:px-0"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product, index) => (
            <div key={`${product.title}-${index}`} className="snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile scroll indicator */}
      <div className="sm:hidden flex justify-center mt-2">
        <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest animate-pulse">
          Auto-rotating • Swipe to explore
        </p>
      </div>
    </div>
  );
};

export default Carousel;
