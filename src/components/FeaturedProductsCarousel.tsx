"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category: Category;
}

export default function FeaturedProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch featured products
  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch("/api/products/featured");
        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }
        const data = await response.json();
        setProducts(data);
        setShowControls(data.length > 4); // Only show controls if more than 4 products
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  // Calculate how many products to show per view based on screen size
  const getProductsPerView = () => {
    if (typeof window === "undefined") return 4; // Default for SSR
    
    const width = window.innerWidth;
    if (width < 640) return 1; // Mobile
    if (width < 1024) return 2; // Tablet
    return 4; // Desktop
  };

  const productsPerView = getProductsPerView();
  const maxIndex = Math.max(0, products.length - productsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 h-64"></div>
            <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-gray-500">No featured products available.</div>;
  }

  return (
    <div className="relative">
      {showControls && (
        <>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 -ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            aria-label="Previous products"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 -mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ${
              currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            aria-label="Next products"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      <div 
        ref={containerRef}
        className="overflow-hidden"
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / productsPerView)}%)` }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0"
              style={{ width: `${100 / productsPerView}%`, padding: '0 0.75rem' }}
            >
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                  <div className="h-64 w-full bg-gray-200 relative">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-500">
                        No image available
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/products/${product.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                  </div>
                  {product.price && (
                    <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${
                currentIndex === index ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
