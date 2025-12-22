
import React, { useEffect, useState, useMemo } from 'react';
import { Product, SupportedRegion } from './types';
import { fetchProducts, getUserRegion, filterProducts } from './services/dataService';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [region, setRegion] = useState<SupportedRegion>('Global');

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const [rawProducts, userRegion] = await Promise.all([
          fetchProducts(),
          Promise.resolve(getUserRegion())
        ]);
        
        setProducts(rawProducts);
        setRegion(userRegion);
        setError(null);
      } catch (err) {
        setError('Unable to load deals at this time. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, region);
  }, [products, region]);

  const regionDisplayNames: Record<SupportedRegion, string> = {
    'UK': 'United Kingdom',
    'USA': 'United States',
    'Spain': 'España',
    'Germany': 'Deutschland',
    'Global': 'Worldwide'
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-zinc-400 font-medium">Fetching the best deals for you...</p>
          </div>
        ) : error ? (
          <div className="bg-zinc-900 border border-red-900/30 rounded-xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500/80 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-bold text-red-400 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-300/70">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <Carousel 
                products={filteredProducts} 
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
