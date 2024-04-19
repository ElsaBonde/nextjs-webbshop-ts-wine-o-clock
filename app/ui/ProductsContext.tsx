// ProductsContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, products } from '@/data';

// Skapa en context för produkter
const ProductsContext = createContext<Product[]>([]);

// Använd en hook för att använda produkter från contexten
export const useProducts = () => useContext(ProductsContext);

// En komponent som tillhandahåller produkter via contexten
export const ProductsProvider: React.FC = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [productsData, setProductsData] = useState<Product[]>([]);

  // Hämta produkter från local storage när sidan laddas
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProductsData(JSON.parse(savedProducts));
      setLoaded(true);
    } else {
      setProductsData(products);
      setLoaded(true);
    }
  }, []);

  // Uppdatera local storage när produkterna ändras
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('products', JSON.stringify(productsData));
    }
  }, [productsData, loaded]);

  return (
    <ProductsContext.Provider value={productsData}>
      {children}
    </ProductsContext.Provider>
  );
};
